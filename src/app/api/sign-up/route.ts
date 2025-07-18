import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { success } from "zod/v4";

export async function POST(request: Request) {
    await dbConnect()

    try {
        const {username, email, password} = await request.json()
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, {status: 400})
        }

        const existingUserVerifiedByEmail = await UserModel.findOne({email})

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        if(existingUserVerifiedByEmail) {
            if(existingUserVerifiedByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User already exists with this email"
                }, {status: 400})
            }
            else {
                const hasedPassword = await bcrypt.hash(password, 10)
                existingUserVerifiedByEmail.password = hasedPassword;
                existingUserVerifiedByEmail.verifyCode = verifyCode;
                existingUserVerifiedByEmail.verifyCodeExpiry = new Date(Date.now()+ 3600000)
                await existingUserVerifiedByEmail.save()
            }

        } else {
            const hasedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

        const newUser = new UserModel({
            username,
            email,
            password: hasedPassword,
            verifyCode,
            verifyCodeExpiry: expiryDate,
            isVerified: false,
            isAcceptingMessage: true,
            messages: []
            })

            await newUser.save()
        }

        // send verification email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        )

        if(!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, {status: 500})
        }

        return Response.json({
            success: true,
            message: "User registered successfully. please verify your email"
        }, {status: 201})

    } catch (error) {
        console.error('Error registering user', error)
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            {
                status: 500
            }
        )
    }
}
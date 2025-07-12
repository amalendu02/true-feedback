import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VeficaitionEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email:string,
    username: string,
    verifyCode: string,

): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystry message | Verification code',
            react: VerificationEmail({username,otp:verifyCode}),
        });
        return {success: true, message: 'Verification email send successfully'}
    } catch (emailError) {
        console.error("Error sending verification email",emailError)
        return {success: false, message: 'Faield to send verification email'}

    }
}
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// export {default} from "next-auth/middleware"
// import {getToken} from "next-auth/jwt"
// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//     const token = await getToken({req: request})
//     const url = request.nextUrl

//     if(token && 
//         (
//             url.pathname.startsWith('/sign-in') ||
//             url.pathname.startsWith('/sign-up') ||
//             url.pathname.startsWith('/verify') ||
//             url.pathname.startsWith('/') 
//         )
//      ) {
//         return NextResponse.redirect(new URL('/dashboard', request.url))
//      }


//   return NextResponse.redirect(new URL('/home', request.url))
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     '/sign-in',
//     '/sign-up',
//     '/',
//     '/dashboard/:path*',
//     '/verify/:path*'
//   ]
// }



import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
export { default } from 'next-auth/middleware'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const url = request.nextUrl
  const isAuthPage = ['/sign-in', '/sign-up', '/verify', '/'].some(path =>
    url.pathname.startsWith(path)
  )
  const isProtected = url.pathname.startsWith('/dashboard')

  // ✅ Case 1: User is authenticated and trying to access login/register → redirect to /dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // ✅ Case 2: User is not authenticated and trying to access protected routes → redirect to /sign-in
  if (!token && isProtected) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  // ✅ Case 3: Let everything else pass through
  return NextResponse.next()
}

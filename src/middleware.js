// export { default } from "next-auth/middleware"
// export const config = { matcher: ["/", "/create", "/details/:id", "/reservations", "/catalog"] }

import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export default async function middleware(req) {
    const token = await getToken({ req })
    const pathname = req.nextUrl.pathname
    const urlOrigin = "http://localhost:3000/"

    console.log(pathname)

    if (pathname.includes('/create') && !token?.isAdmin) {
        return NextResponse.redirect(urlOrigin)
    }

    if ((!pathname.includes('/login') && !pathname.includes('/register')) && !token) {
        return NextResponse.redirect(urlOrigin + 'login')
    }

    if ((pathname.includes('/login') || pathname.includes('/register')) && token) {
        return NextResponse.redirect(urlOrigin)
    } else {
        return NextResponse.next()
    }
}

export const config = { matcher: ["/create", "/details/((?!general).*)", "/reservations", "/catalog", "/", "/login", "/register"] }
import { NextResponse } from "next/server"

export async function middleware(request) {
    const { pathname } = request.nextUrl
    
    const PUBLIC = ["/login", "/register", "/verify", "/"]
    const isPUBLIC = PUBLIC.includes(pathname)

    if (!isPUBLIC) return NextResponse.redirect(new URL("/login", request.url))
    
    return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico|css|js|map)).*)",
  ],
}
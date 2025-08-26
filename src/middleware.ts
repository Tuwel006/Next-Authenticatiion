import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = await request.cookies.get("token")?.value || "";
    const pathname = request.nextUrl.pathname; 
    if(!token) {
        if(pathname.startsWith("/profile")) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    } else {
        if(pathname.startsWith("/login") || pathname.startsWith("/signup")) {
            return NextResponse.redirect(new URL("/profile", request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/","/profile", "/login", "/signup"],
}
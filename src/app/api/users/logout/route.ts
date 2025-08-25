import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await NextResponse.json({message: "User logged out successfully"}, {status: 200});
        response.cookies.set("token", "", {httpOnly: true, secure: true, sameSite: "strict", maxAge: 0, path: "/", expires: new Date(0)});
        return response;
    } catch (error: any) {
        return NextResponse.json({message: error.message, status: 500});
    }
}
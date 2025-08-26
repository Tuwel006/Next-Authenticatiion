import connectDB from "@/config/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectDB();

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value || "";
        if (!token) {
            return NextResponse.json({ error: "Access denied" }, { status: 401 });
        }

        const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        const user = await User.findById(decoded.id).select('-password -forgotPasswordToken -verifyToken');
        
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value || "";
        if (!token) {
            return NextResponse.json({ error: "Access denied" }, { status: 401 });
        }

        const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        const reqBody = await req.json();

        const updatedUser = await User.findByIdAndUpdate(
            decoded.id,
            reqBody,
            { new: true }
        ).select('-password -forgotPasswordToken -verifyToken');

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ 
            message: "Profile updated successfully", 
            user: updatedUser 
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
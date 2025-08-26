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

        const users = await User.find({ isActive: true })
            .select('-password -forgotPasswordToken -verifyToken')
            .sort({ createdAt: -1 });

        return NextResponse.json({ users }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
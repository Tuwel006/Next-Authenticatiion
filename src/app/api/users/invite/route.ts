import connectDB from "@/config/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value || "";
        if (!token) {
            return NextResponse.json({ error: "Access denied" }, { status: 401 });
        }

        const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        const currentUser = await User.findById(decoded.id);
        
        if (!currentUser || currentUser.role !== 'admin') {
            return NextResponse.json({ error: "Admin access required" }, { status: 403 });
        }

        const reqBody = await req.json();
        const { email } = reqBody;

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ 
                message: "User already exists in the system",
                userExists: true,
                user: {
                    id: existingUser._id,
                    firstName: existingUser.firstName,
                    lastName: existingUser.lastName,
                    email: existingUser.email,
                    role: existingUser.role
                }
            }, { status: 200 });
        }

        const inviteToken = jwt.sign(
            { email, invitedBy: decoded.id },
            process.env.TOKEN_SECRET!,
            { expiresIn: '7d' }
        );

        const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/invite/${inviteToken}`;

        return NextResponse.json({
            message: "Invitation sent successfully",
            inviteLink,
            userExists: false
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
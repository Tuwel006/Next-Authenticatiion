import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const {email, password} = reqBody;
        if(!email || !password) {
            return NextResponse.json({error: "Please add all fields"}, {status: 400});
        }

        const user = await User.findOne({email});
        if(!user) {
            return NextResponse.json({error: "User not found"}, {status: 404});
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            return NextResponse.json({error: "Invalid credentials"}, {status: 400});
        }

        const tokenData = {
            id: user._id,
            email: user.email,
            userName: user.userName,
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET as string, {expiresIn: '1d'});

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        console.log(response);
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }

}
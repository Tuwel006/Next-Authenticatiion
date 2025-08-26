import connectDB from "@/config/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        console.log("Login request body:", reqBody);
        const { email, password } = reqBody;

        if (!email || !password) {
            return NextResponse.json({ error: "Please provide email and password" }, { status: 400 });
        }

        console.log("Looking for user with email:", email);
        const user = await User.findOne({ email });
        console.log("User found:", user ? "Yes" : "No");
        
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        console.log("Comparing passwords...");
        const validPassword = await bcrypt.compare(password, user.password);
        console.log("Password valid:", validPassword);
        
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        const tokenData = {
            id: user._id,
            userName: user.userName,
            email: user.email,
            role: user.role
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Login successful",
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            }
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
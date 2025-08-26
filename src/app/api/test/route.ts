import connectDB from "@/config/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest) {
    try {
        const userCount = await User.countDocuments();
        const users = await User.find().select('email firstName lastName role');
        
        return NextResponse.json({ 
            message: "Database test successful",
            userCount,
            users 
        }, { status: 200 });
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
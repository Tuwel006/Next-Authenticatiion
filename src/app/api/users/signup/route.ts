import connectDB from "@/config/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        console.log("Post Request runninng....",reqBody)
        const {userName, email, password, confirm_password} = reqBody;
        console.log(userName, email, password, confirm_password);
        if(!userName || !email || !password || !confirm_password) {
            console.log('Invalid creadentials');
            return NextResponse.json({error: "Please add all fields"}, {status: 400});
        }
        
        if(confirm_password !== password) {
            console.log('pasword not match');
            return NextResponse.json({error: "Password do not match"}, {status: 400});
        }

        const userAvailable = await User.findOne({email});
        if(userAvailable) {
            return NextResponse.json({error: "User already Exist"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
        })
        console.log("New User: ", newUser);
        const savedUser = await newUser.save();
        return NextResponse.json({message: "User created successfully", user: savedUser}, {status: 201});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
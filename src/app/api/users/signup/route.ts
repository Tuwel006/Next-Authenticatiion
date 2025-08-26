import connectDB from "@/config/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        console.log("Post Request runninng....",reqBody)
        const {userName, email, password, confirm_password, firstName, lastName, role} = reqBody;
        console.log(userName, email, password, confirm_password, firstName, lastName);
        if(!userName || !email || !password || !confirm_password || !firstName || !lastName) {
            console.log('Invalid credentials');
            return NextResponse.json({error: "Please add all required fields"}, {status: 400});
        }
        
        if(confirm_password !== password) {
            console.log('pasword not match');
            return NextResponse.json({error: "Password do not match"}, {status: 400});
        }

        const userAvailable = await User.findOne({email});
        if(userAvailable) {
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role: role || 'user'
        })
        console.log("New User: ", newUser);
        const savedUser = await newUser.save();
        const userResponse = {
            id: savedUser._id,
            userName: savedUser.userName,
            email: savedUser.email,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            role: savedUser.role
        };
        return NextResponse.json({message: "User created successfully", user: userResponse}, {status: 201});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
import { getUserFromToken } from "@/helper/getUserFromToken";
import { NextRequest, NextResponse } from "next/server";
import { UserPayload } from "../login/route";
import { JwtPayload } from "jsonwebtoken";
import User from "@/models/user.model";

export async function GET(request: NextRequest) {
    try {
        const userPayload : UserPayload | JwtPayload | null | string = await getUserFromToken(request);
        if(!userPayload || typeof userPayload === "string" ) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        const user = await User.findOne({_id: (userPayload as UserPayload).id});
        if(!user) {
            return NextResponse.json({error: "User not found"}, {status: 404});
        }
        return NextResponse.json({
            user: {
                id: user._id,
                email: user.email,
                userName: user.userName,
            }
        }, {status: 200});
    } catch (error) {
        
    }
}
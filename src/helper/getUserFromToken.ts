import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function getUserFromToken(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || "";
        if(!token || !token.length) {
            return null;
        }
        const decoded  =  jwt.verify(token, process.env.JWT_SECRET as string);
        return decoded;
    } catch (error) {
        return null;
    }
}
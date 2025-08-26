import connectDB from "@/config/db";
import Project from "@/models/project.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectDB();

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value || "";
        if (!token) {
            return NextResponse.json({ error: "Access denied" }, { status: 401 });
        }

        const projects = await Project.find()
            .populate('manager', 'firstName lastName email')
            .populate('team', 'firstName lastName email')
            .sort({ createdAt: -1 });

        return NextResponse.json({ projects }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value || "";
        if (!token) {
            return NextResponse.json({ error: "Access denied" }, { status: 401 });
        }

        const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        const reqBody = await req.json();
        
        const { name, description, startDate, endDate, priority, budget, team, tags, color } = reqBody;

        if (!name || !description || !startDate || !endDate) {
            return NextResponse.json({ error: "Please provide all required fields" }, { status: 400 });
        }

        const newProject = new Project({
            name,
            description,
            startDate,
            endDate,
            priority: priority || 'medium',
            budget: budget || 0,
            manager: decoded.id,
            team: team || [],
            tags: tags || [],
            color: color || '#3B82F6'
        });

        const savedProject = await newProject.save();
        await savedProject.populate('manager', 'firstName lastName email');
        
        return NextResponse.json({ 
            message: "Project created successfully", 
            project: savedProject 
        }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
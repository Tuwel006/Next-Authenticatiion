import connectDB from "@/config/db";
import Task from "@/models/task.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectDB();

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value || "";
        if (!token) {
            return NextResponse.json({ error: "Access denied" }, { status: 401 });
        }

        const tasks = await Task.find()
            .populate('project', 'name')
            .populate('assignedTo', 'firstName lastName email')
            .populate('createdBy', 'firstName lastName email')
            .sort({ createdAt: -1 });

        return NextResponse.json({ tasks }, { status: 200 });
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
        
        const { title, description, project, assignedTo, dueDate, priority, estimatedHours, tags } = reqBody;

        if (!title || !project) {
            return NextResponse.json({ error: "Please provide title and project" }, { status: 400 });
        }

        const newTask = new Task({
            title,
            description: description || '',
            project,
            assignedTo,
            createdBy: decoded.id,
            dueDate,
            priority: priority || 'medium',
            estimatedHours: estimatedHours || 0,
            tags: tags || []
        });

        const savedTask = await newTask.save();
        await savedTask.populate([
            { path: 'project', select: 'name' },
            { path: 'assignedTo', select: 'firstName lastName email' },
            { path: 'createdBy', select: 'firstName lastName email' }
        ]);
        
        return NextResponse.json({ 
            message: "Task created successfully", 
            task: savedTask 
        }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
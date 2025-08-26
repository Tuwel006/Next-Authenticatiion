import connectDB from "@/config/db";
import Task from "@/models/task.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const token = req.cookies.get("token")?.value || "";
        if (!token) {
            return NextResponse.json({ error: "Access denied" }, { status: 401 });
        }

        const reqBody = await req.json();
        const taskId = params.id;

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            reqBody,
            { new: true }
        ).populate([
            { path: 'project', select: 'name' },
            { path: 'assignedTo', select: 'firstName lastName email' },
            { path: 'createdBy', select: 'firstName lastName email' }
        ]);

        if (!updatedTask) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        return NextResponse.json({ 
            message: "Task updated successfully", 
            task: updatedTask 
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const token = req.cookies.get("token")?.value || "";
        if (!token) {
            return NextResponse.json({ error: "Access denied" }, { status: 401 });
        }

        const taskId = params.id;
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        return NextResponse.json({ 
            message: "Task deleted successfully" 
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
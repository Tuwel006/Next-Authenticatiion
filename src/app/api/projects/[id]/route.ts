import connectDB from "@/config/db";
import Project from "@/models/project.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const token = req.cookies.get("token")?.value || "";
        if (!token) {
            return NextResponse.json({ error: "Access denied" }, { status: 401 });
        }

        const reqBody = await req.json();
        const projectId = params.id;

        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            reqBody,
            { new: true }
        ).populate('manager', 'firstName lastName email');

        if (!updatedProject) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ 
            message: "Project updated successfully", 
            project: updatedProject 
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

        const projectId = params.id;
        const deletedProject = await Project.findByIdAndDelete(projectId);

        if (!deletedProject) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ 
            message: "Project deleted successfully" 
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
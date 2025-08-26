import connectDB from "@/config/db";
import Project from "@/models/project.model";
import Task from "@/models/task.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectDB();

async function seedData() {
    try {
        const existingProjects = await Project.countDocuments();
        if (existingProjects > 0) {
            return { message: "Data already exists" };
        }

        const users = await User.find().limit(3);
        if (users.length === 0) {
            return { error: "No users found. Please create users first." };
        }

        const sampleProjects = [
            {
                name: "E-commerce Platform",
                description: "Building a modern e-commerce platform with React and Node.js",
                status: "active",
                priority: "high",
                startDate: new Date("2024-01-01"),
                endDate: new Date("2024-06-30"),
                budget: 50000,
                progress: 65,
                manager: users[0]._id,
                team: [users[0]._id, users[1]._id],
                tags: ["web", "react", "nodejs"],
                color: "#3B82F6"
            },
            {
                name: "Mobile App Development",
                description: "Cross-platform mobile app using React Native",
                status: "planning",
                priority: "medium",
                startDate: new Date("2024-02-01"),
                endDate: new Date("2024-08-31"),
                budget: 35000,
                progress: 25,
                manager: users[1]._id,
                team: [users[1]._id, users[2]._id],
                tags: ["mobile", "react-native"],
                color: "#10B981"
            }
        ];

        const createdProjects = await Project.insertMany(sampleProjects);

        const sampleTasks = [
            {
                title: "Setup project structure",
                description: "Initialize the project with proper folder structure",
                status: "completed",
                priority: "high",
                project: createdProjects[0]._id,
                assignedTo: users[0]._id,
                createdBy: users[0]._id,
                dueDate: new Date("2024-01-15"),
                estimatedHours: 8,
                actualHours: 6,
                tags: ["setup"]
            },
            {
                title: "Design user interface",
                description: "Create wireframes and mockups",
                status: "in-progress",
                priority: "medium",
                project: createdProjects[0]._id,
                assignedTo: users[1]._id,
                createdBy: users[0]._id,
                dueDate: new Date("2024-02-01"),
                estimatedHours: 16,
                actualHours: 8,
                tags: ["design"]
            }
        ];

        await Task.insertMany(sampleTasks);
        return { message: "Sample data created successfully" };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value || "";
        if (!token) {
            return NextResponse.json({ error: "Access denied" }, { status: 401 });
        }

        const result = await seedData();
        
        if (result.error) {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }

        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
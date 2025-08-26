import connectDB from "@/config/db";
import Project from "@/models/project.model";
import Task from "@/models/task.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value || "";
        if (!token) {
            return NextResponse.json({ error: "Access denied" }, { status: 401 });
        }

        const currentDate = new Date();
        
        // Get dashboard statistics
        const [
            totalProjects,
            activeProjects,
            totalTasks,
            completedTasks,
            totalUsers,
            overdueTasks,
            projectsOnTrack,
            recentProjects,
            recentTasks
        ] = await Promise.all([
            Project.countDocuments(),
            Project.countDocuments({ status: 'active' }),
            Task.countDocuments(),
            Task.countDocuments({ status: 'completed' }),
            User.countDocuments({ isActive: true }),
            Task.countDocuments({ 
                dueDate: { $lt: currentDate },
                status: { $nin: ['completed'] }
            }),
            Project.countDocuments({ 
                status: 'active',
                endDate: { $gte: currentDate }
            }),
            Project.find()
                .populate('manager', 'firstName lastName')
                .sort({ createdAt: -1 })
                .limit(5),
            Task.find()
                .populate('project', 'name')
                .populate('assignedTo', 'firstName lastName')
                .sort({ createdAt: -1 })
                .limit(5)
        ]);

        const stats = {
            totalProjects,
            activeProjects,
            totalTasks,
            completedTasks,
            totalUsers,
            overdueTasks,
            projectsOnTrack,
            taskCompletionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
        };

        return NextResponse.json({ 
            stats, 
            recentProjects,
            recentTasks
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
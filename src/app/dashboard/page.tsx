'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import RecentProjects from '@/components/dashboard/RecentProjects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  FolderIcon, 
  CheckCircleIcon, 
  UsersIcon, 
  ChartBarIcon,
  PlusIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';
import { formatDate, getStatusColor, getPriorityColor } from '@/lib/utils';

interface DashboardData {
  stats: {
    totalProjects: number;
    activeProjects: number;
    totalTasks: number;
    completedTasks: number;
    totalUsers: number;
    taskCompletionRate: number;
    overdueTasks: number;
    projectsOnTrack: number;
  };
  recentProjects: any[];
  recentTasks: any[];
  upcomingDeadlines: any[];
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchDashboardData();
    fetchUserData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/dashboard');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/users/me');
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout user={user}>
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout user={user}>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.firstName || 'User'}! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                Here's what's happening with your projects today.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard/projects">
                <Button variant="secondary" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Projects"
            value={data?.stats.totalProjects || 0}
            icon={<FolderIcon className="h-6 w-6" />}
            change={{ value: 12, type: 'increase' }}
          />
          <StatsCard
            title="Active Projects"
            value={data?.stats.activeProjects || 0}
            icon={<ArrowTrendingUpIcon className="h-6 w-6" />}
            change={{ value: 8, type: 'increase' }}
          />
          <StatsCard
            title="Completed Tasks"
            value={data?.stats.completedTasks || 0}
            icon={<CheckCircleIcon className="h-6 w-6" />}
            change={{ value: 15, type: 'increase' }}
          />
          <StatsCard
            title="Team Members"
            value={data?.stats.totalUsers || 0}
            icon={<UsersIcon className="h-6 w-6" />}
            change={{ value: 5, type: 'increase' }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <RecentProjects projects={data?.recentProjects || []} />
          </div>
          
          {/* Quick Stats & Actions */}
          <div className="space-y-6">
            {/* Task Completion */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChartBarIcon className="h-5 w-5" />
                  Task Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {data?.stats.taskCompletionRate || 0}%
                  </div>
                  <div className="text-gray-500 mb-4">Overall Completion</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${data?.stats.taskCompletionRate || 0}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Overdue Tasks Alert */}
            {(data?.stats.overdueTasks || 0) > 0 && (
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <ExclamationTriangleIcon className="h-8 w-8 text-orange-600" />
                    <div>
                      <div className="font-semibold text-orange-900">
                        {data?.stats.overdueTasks} Overdue Tasks
                      </div>
                      <div className="text-sm text-orange-700">
                        Need immediate attention
                      </div>
                    </div>
                  </div>
                  <Link href="/dashboard/tasks">
                    <Button variant="outline" size="sm" className="mt-3 w-full border-orange-300 text-orange-700 hover:bg-orange-100">
                      View Tasks
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/dashboard/projects">
                  <Button variant="outline" className="w-full justify-start">
                    <FolderIcon className="h-4 w-4 mr-2" />
                    View All Projects
                  </Button>
                </Link>
                <Link href="/dashboard/tasks">
                  <Button variant="outline" className="w-full justify-start">
                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                    Manage Tasks
                  </Button>
                </Link>
                <Link href="/dashboard/team">
                  <Button variant="outline" className="w-full justify-start">
                    <UsersIcon className="h-4 w-4 mr-2" />
                    Team Overview
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
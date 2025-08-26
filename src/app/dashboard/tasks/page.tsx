'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import CreateTaskModal from '@/components/ui/CreateTaskModal';
import ViewTaskModal from '@/components/ui/ViewTaskModal';
import { getStatusColor, getPriorityColor, formatDate } from '@/lib/utils';
import { PlusIcon, ClockIcon, TrashIcon, EyeIcon, PencilIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate?: string;
  project: {
    name: string;
  };
  assignedTo?: {
    firstName: string;
    lastName: string;
  };
  estimatedHours: number;
  actualHours: number;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [user, setUser] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  useEffect(() => {
    fetchTasks();
    fetchUser();
    fetchProjects();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/users/me');
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      toast.success('Task deleted successfully');
      fetchTasks();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to delete task');
    }
  };

  const handleUpdateStatus = async (taskId: string, newStatus: string) => {
    try {
      await axios.patch(`/api/tasks/${taskId}`, { status: newStatus });
      toast.success('Task status updated');
      fetchTasks();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to update status');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  if (loading) {
    return (
      <DashboardLayout user={user}>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
            <p className="text-gray-600">Manage and track your tasks</p>
          </div>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setShowCreateModal(true)}
          >
            <PlusIcon className="h-4 w-4" />
            New Task
          </Button>
        </div>

        <div className="flex gap-2">
          {['all', 'todo', 'in-progress', 'review', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filter === status
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <Card key={task._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                        {task.status.replace('-', ' ')}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    
                    {task.description && (
                      <p className="text-gray-600 mb-3">{task.description}</p>
                    )}
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span>Project: <span className="font-medium">{task.project.name}</span></span>
                      
                      {task.assignedTo && (
                        <span>Assigned to: <span className="font-medium">
                          {task.assignedTo.firstName} {task.assignedTo.lastName}
                        </span></span>
                      )}
                      
                      {task.dueDate && (
                        <span className="flex items-center gap-1">
                          <ClockIcon className="h-4 w-4" />
                          Due: {formatDate(task.dueDate)}
                        </span>
                      )}
                    </div>
                    
                    {(task.estimatedHours > 0 || task.actualHours > 0) && (
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        {task.estimatedHours > 0 && (
                          <span>Estimated: {task.estimatedHours}h</span>
                        )}
                        {task.actualHours > 0 && (
                          <span>Actual: {task.actualHours}h</span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setSelectedTask(task);
                        setShowViewModal(true);
                      }}
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <select
                      value={task.status}
                      onChange={(e) => handleUpdateStatus(task._id, e.target.value)}
                      className="px-2 py-1 text-xs border border-gray-300 rounded"
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="review">Review</option>
                      <option value="completed">Completed</option>
                    </select>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteTask(task._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <ClockIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-500">Get started by creating your first task.</p>
          </div>
        )}
        <CreateTaskModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={fetchTasks}
          projects={projects}
          users={users}
        />
        
        <ViewTaskModal
          isOpen={showViewModal}
          onClose={() => setShowViewModal(false)}
          task={selectedTask}
        />
      </div>
    </DashboardLayout>
  );
}
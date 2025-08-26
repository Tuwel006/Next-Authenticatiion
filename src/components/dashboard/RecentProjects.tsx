import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { getStatusColor, formatDate } from '@/lib/utils';

interface Project {
  _id: string;
  name: string;
  status: string;
  progress: number;
  endDate: string;
  manager: {
    firstName: string;
    lastName: string;
  };
}

interface RecentProjectsProps {
  projects: Project[];
}

export default function RecentProjects({ projects }: RecentProjectsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project._id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{project.name}</h4>
                <p className="text-sm text-gray-500">
                  Manager: {project.manager.firstName} {project.manager.lastName}
                </p>
                <p className="text-xs text-gray-400">Due: {formatDate(project.endDate)}</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium">{project.progress}%</div>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
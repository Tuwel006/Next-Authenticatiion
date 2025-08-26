'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import InviteMemberModal from '@/components/ui/InviteMemberModal';
import ViewMemberModal from '@/components/ui/ViewMemberModal';
import EditMemberModal from '@/components/ui/EditMemberModal';
import { getInitials } from '@/lib/utils';
import { UserPlusIcon, EnvelopeIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import toast from 'react-hot-toast';

interface TeamMember {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
  isActive: boolean;
  lastLogin: string;
}

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const handleViewMember = (member: TeamMember) => {
    setSelectedMember(member);
    setShowViewModal(true);
  };

  const handleEditMember = (member: TeamMember) => {
    setSelectedMember(member);
    setShowEditModal(true);
  };

  const handleDeleteMember = async (memberId: string, memberName: string) => {
    if (!confirm(`Are you sure you want to delete ${memberName}? This action cannot be undone.`)) return;
    
    try {
      await axios.delete(`/api/users/${memberId}`);
      toast.success('Member deleted successfully');
      fetchTeamMembers();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to delete member');
    }
  };

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchTeamMembers();
    fetchUser();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get('/api/users');
      setTeamMembers(response.data.users);
    } catch (error) {
      console.error('Error fetching team members:', error);
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

  const getRoleColor = (role: string) => {
    const colors = {
      'admin': 'bg-red-100 text-red-800',
      'manager': 'bg-blue-100 text-blue-800',
      'user': 'bg-green-100 text-green-800'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <DashboardLayout user={user}>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Team</h1>
            <p className="text-gray-600">Manage your team members and their roles</p>
          </div>
          {isAdmin && (
            <Button 
              className="flex items-center gap-2"
              onClick={() => setShowInviteModal(true)}
            >
              <UserPlusIcon className="h-4 w-4" />
              Invite Member
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-900">{teamMembers.length}</div>
              <div className="text-sm text-gray-600">Total Members</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-900">
                {teamMembers.filter(m => m.isActive).length}
              </div>
              <div className="text-sm text-gray-600">Active Members</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-900">
                {teamMembers.filter(m => m.role === 'admin').length}
              </div>
              <div className="text-sm text-gray-600">Administrators</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-900">
                {teamMembers.filter(m => m.role === 'manager').length}
              </div>
              <div className="text-sm text-gray-600">Managers</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Card key={member._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  {member.avatar ? (
                    <img 
                      className="h-12 w-12 rounded-full" 
                      src={member.avatar} 
                      alt={`${member.firstName} ${member.lastName}`} 
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                      {getInitials(`${member.firstName} ${member.lastName}`)}
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {member.firstName} {member.lastName}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(member.role)}`}>
                        {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                      </span>
                      {member.isActive ? (
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      ) : (
                        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <EnvelopeIcon className="h-4 w-4 mr-2" />
                    {member.email}
                  </div>
                  
                  {member.department && (
                    <div className="text-sm text-gray-600">
                      Department: {member.department}
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500">
                    Last active: {new Date(member.lastLogin).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewMember(member)}
                  >
                    <EyeIcon className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  {isAdmin && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditMember(member)}
                      >
                        <PencilIcon className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteMember(member._id, `${member.firstName} ${member.lastName}`)}
                        className="text-red-600 hover:text-red-800 border-red-300 hover:border-red-400"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {teamMembers.length === 0 && (
          <div className="text-center py-12">
            <UserPlusIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No team members</h3>
            <p className="text-gray-500">Start by inviting your first team member.</p>
          </div>
        )}
        {isAdmin && (
          <InviteMemberModal
            isOpen={showInviteModal}
            onClose={() => setShowInviteModal(false)}
            onSuccess={fetchTeamMembers}
          />
        )}
        
        <ViewMemberModal
          isOpen={showViewModal}
          onClose={() => setShowViewModal(false)}
          member={selectedMember}
        />
        
        <EditMemberModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSuccess={fetchTeamMembers}
          member={selectedMember}
        />
      </div>
    </DashboardLayout>
  );
}
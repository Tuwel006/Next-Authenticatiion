'use client';

import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { getInitials } from '@/lib/utils';
import axios from 'axios';

interface ViewMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: any;
}

export default function ViewMemberModal({ isOpen, onClose, member }: ViewMemberModalProps) {
  if (!member) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all">
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title className="text-2xl font-bold text-gray-900">
                    Team Member Details
                  </Dialog.Title>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Avatar and Name */}
                  <div className="text-center">
                    {member.avatar ? (
                      <img 
                        className="h-20 w-20 rounded-full mx-auto mb-4" 
                        src={member.avatar} 
                        alt={`${member.firstName} ${member.lastName}`} 
                      />
                    ) : (
                      <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                        {getInitials(`${member.firstName} ${member.lastName}`)}
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-gray-900">
                      {member.firstName} {member.lastName}
                    </h3>
                    <p className="text-gray-500">@{member.userName}</p>
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-gray-900">{member.email}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500">Role</label>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ml-2 ${
                        member.role === 'admin' ? 'bg-red-100 text-red-800' :
                        member.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                      </span>
                    </div>
                    
                    {member.department && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Department</label>
                        <p className="text-gray-900">{member.department}</p>
                      </div>
                    )}
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500">Status</label>
                      <div className="flex items-center mt-1">
                        <span className={`w-2 h-2 rounded-full mr-2 ${
                          member.isActive ? 'bg-green-400' : 'bg-gray-400'
                        }`}></span>
                        <span className="text-gray-900">
                          {member.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500">Last Login</label>
                      <p className="text-gray-900">
                        {new Date(member.lastLogin).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500">Member Since</label>
                      <p className="text-gray-900">
                        {new Date(member.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" onClick={onClose} className="flex-1">
                      Close
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
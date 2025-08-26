'use client';

import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { getInitials } from '@/lib/utils';

interface ViewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
}

export default function ViewProjectModal({ isOpen, onClose, project }: ViewProjectModalProps) {
  if (!project) return null;

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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all">
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title className="text-2xl font-bold text-gray-900">
                    {project.name}
                  </Dialog.Title>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                    <p className="text-gray-900">{project.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                        {project.status}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Priority</h3>
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-orange-100 text-orange-800">
                        {project.priority}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Progress</h3>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-3 mr-3">
                        <div 
                          className="bg-blue-600 h-3 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Start Date</h3>
                      <p className="text-gray-900">{new Date(project.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">End Date</h3>
                      <p className="text-gray-900">{new Date(project.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Manager</h3>
                    <p className="text-gray-900">{project.manager?.firstName} {project.manager?.lastName}</p>
                  </div>

                  {project.budget > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Budget</h3>
                      <p className="text-gray-900">${project.budget.toLocaleString()}</p>
                    </div>
                  )}

                  {project.team && project.team.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Team Members</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.team.map((member: any) => (
                          <div key={member._id} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs mr-2">
                              {getInitials(`${member.firstName} ${member.lastName}`)}
                            </div>
                            <span className="text-sm">{member.firstName} {member.lastName}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button onClick={onClose} className="flex-1">
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
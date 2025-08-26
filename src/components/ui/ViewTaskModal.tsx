'use client';

import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

interface ViewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: any;
}

export default function ViewTaskModal({ isOpen, onClose, task }: ViewTaskModalProps) {
  if (!task) return null;

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
                    {task.title}
                  </Dialog.Title>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {task.description && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                      <p className="text-gray-900">{task.description}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                        {task.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Priority</h3>
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-orange-100 text-orange-800">
                        {task.priority}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Project</h3>
                    <p className="text-gray-900">{task.project?.name}</p>
                  </div>

                  {task.assignedTo && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Assigned To</h3>
                      <p className="text-gray-900">{task.assignedTo.firstName} {task.assignedTo.lastName}</p>
                    </div>
                  )}

                  {task.dueDate && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Due Date</h3>
                      <p className="text-gray-900">{new Date(task.dueDate).toLocaleDateString()}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-6">
                    {task.estimatedHours > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Estimated Hours</h3>
                        <p className="text-gray-900">{task.estimatedHours}h</p>
                      </div>
                    )}
                    {task.actualHours > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Actual Hours</h3>
                        <p className="text-gray-900">{task.actualHours}h</p>
                      </div>
                    )}
                  </div>

                  {task.tags && task.tags.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {task.tags.map((tag: string, index: number) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                            {tag}
                          </span>
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
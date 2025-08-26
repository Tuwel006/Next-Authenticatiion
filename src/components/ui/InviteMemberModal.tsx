'use client';

import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import axios from 'axios';
import toast from 'react-hot-toast';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function InviteMemberModal({ isOpen, onClose, onSuccess }: InviteMemberModalProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [inviteResult, setInviteResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('/api/users/invite', { email });
      setInviteResult(response.data);
      setStep(2);
      
      if (response.data.userExists) {
        toast.success('User already exists!');
        onSuccess();
      } else {
        toast.success('Invitation link generated!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to process invitation');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setInviteResult(null);
    setEmail('');
    onClose();
  };

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
                    {step === 1 ? 'Invite Team Member' : 'Invitation Result'}
                  </Dialog.Title>
                  <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {step === 1 ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter email address"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        We'll check if this user exists or send them an invitation link.
                      </p>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                        Cancel
                      </Button>
                      <Button type="submit" disabled={loading} className="flex-1">
                        {loading ? 'Checking...' : 'Check & Invite'}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    {inviteResult?.userExists ? (
                      <div className="text-center p-6 bg-green-50 rounded-lg">
                        <div className="text-green-600 text-lg font-semibold mb-2">
                          ✅ User Already Exists!
                        </div>
                        <p className="text-gray-600 mb-4">
                          {inviteResult.user.firstName} {inviteResult.user.lastName} is already a member of your team.
                        </p>
                        <div className="text-sm text-gray-500">
                          Role: {inviteResult.user.role} • Email: {inviteResult.user.email}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-6 bg-blue-50 rounded-lg">
                        <div className="text-blue-600 text-lg font-semibold mb-2">
                          📧 Invitation Ready!
                        </div>
                        <p className="text-gray-600 mb-4">
                          Copy this invitation link and send it to the user:
                        </p>
                        <div className="bg-white p-3 rounded border text-sm break-all">
                          {inviteResult?.inviteLink}
                        </div>
                        <Button 
                          className="mt-3" 
                          onClick={() => {
                            navigator.clipboard.writeText(inviteResult?.inviteLink);
                            toast.success('Link copied to clipboard!');
                          }}
                        >
                          Copy Link
                        </Button>
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                        Back
                      </Button>
                      <Button type="button" onClick={handleClose} className="flex-1">
                        Done
                      </Button>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
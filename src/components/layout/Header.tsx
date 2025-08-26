'use client';

import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { getInitials } from '@/lib/utils';

interface HeaderProps {
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
}

export default function Header({ user }: HeaderProps) {
  const userNavigation = [
    { name: 'Your Profile', href: '/profile' },
    { name: 'Settings', href: '/settings' },
    { name: 'Sign out', href: '/api/users/logout' },
  ];

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-900 lg:ml-64">
              Welcome back, {user?.firstName || 'User'}!
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500">
              <BellIcon className="h-6 w-6" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  {user?.avatar ? (
                    <img className="h-8 w-8 rounded-full" src={user.avatar} alt="" />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                      {user ? getInitials(`${user.firstName} ${user.lastName}`) : 'U'}
                    </div>
                  )}
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <a
                          href={item.href}
                          className={`block px-4 py-2 text-sm text-gray-700 ${
                            active ? 'bg-gray-100' : ''
                          }`}
                        >
                          {item.name}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}
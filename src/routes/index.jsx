import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import EventsList from '../pages/EventsList';
import EmptyState from '../components/EmptyState';
import { Construction } from 'lucide-react';

const Placeholder = ({ title }) => (
  <div className="mt-8">
    <EmptyState 
      icon={Construction} 
      title={`${title} Coming Soon`} 
      description="This module is currently under development." 
    />
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'events',
        element: <EventsList />,
      },
      {
        path: 'participants',
        element: <Placeholder title="Participants Management" />,
      },
      {
        path: 'leaderboard',
        element: <Placeholder title="Leaderboard" />,
      },
      {
        path: 'settings',
        element: <Placeholder title="Settings" />,
      },
    ],
  },
  {
    path: '*',
    element: (
      <div className="flex h-screen w-full items-center justify-center bg-background p-4">
        <EmptyState title="404 - Page Not Found" description="The page you are looking for does not exist." />
      </div>
    ),
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

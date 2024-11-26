import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, RequireAuth } from './lib/auth';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import Bookings from './pages/Bookings';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ResetPassword from './pages/auth/ResetPassword';
import ErrorDashboard from './pages/admin/ErrorDashboard';
import Unauthorized from './pages/Unauthorized';
import PerformanceMonitor from './components/PerformanceMonitor';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error instanceof Error && error.message.includes('Authentication')) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><Layout /></RequireAuth>,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { 
        path: 'dashboard', 
        element: <PerformanceMonitor id="dashboard"><Dashboard /></PerformanceMonitor> 
      },
      { 
        path: 'rooms', 
        element: (
          <RequireAuth allowedRoles={['super_admin', 'hotel_admin', 'staff']}>
            <PerformanceMonitor id="rooms"><Rooms /></PerformanceMonitor>
          </RequireAuth>
        )
      },
      { 
        path: 'bookings', 
        element: <PerformanceMonitor id="bookings"><Bookings /></PerformanceMonitor> 
      },
      { 
        path: 'analytics', 
        element: (
          <RequireAuth allowedRoles={['super_admin', 'hotel_admin']}>
            <PerformanceMonitor id="analytics"><Analytics /></PerformanceMonitor>
          </RequireAuth>
        )
      },
      { 
        path: 'settings', 
        element: <PerformanceMonitor id="settings"><Settings /></PerformanceMonitor> 
      },
      { 
        path: 'admin/errors', 
        element: (
          <RequireAuth allowedRoles={['super_admin']}>
            <PerformanceMonitor id="error-dashboard"><ErrorDashboard /></PerformanceMonitor>
          </RequireAuth>
        )
      },
    ],
  },
  { 
    path: 'login', 
    element: <PerformanceMonitor id="login"><Login /></PerformanceMonitor> 
  },
  { 
    path: 'register', 
    element: <PerformanceMonitor id="register"><Register /></PerformanceMonitor> 
  },
  { 
    path: 'reset-password', 
    element: <PerformanceMonitor id="reset-password"><ResetPassword /></PerformanceMonitor> 
  },
  { 
    path: 'unauthorized', 
    element: <PerformanceMonitor id="unauthorized"><Unauthorized /></PerformanceMonitor> 
  },
  { path: '*', element: <Navigate to="/dashboard" replace /> },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { usePerformanceMonitoring } from '../hooks/usePerformanceMonitoring';

export default function Layout() {
  usePerformanceMonitoring();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}
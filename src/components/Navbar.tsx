import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Hotel, Building2, Calendar, BarChart3, Settings, LogOut, AlertTriangle } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { usePermissions } from '../hooks/usePermissions';
import toast from 'react-hot-toast';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const permissions = usePermissions();
  
  const navItems = [
    { icon: Hotel, label: 'Dashboard', path: '/dashboard' },
    { icon: Building2, label: 'Rooms', path: '/rooms', show: permissions.canManageRooms },
    { icon: Calendar, label: 'Bookings', path: '/bookings' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics', show: permissions.canViewReports },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: AlertTriangle, label: 'Error Dashboard', path: '/admin/errors', show: permissions.isSuperAdmin }
  ].filter(item => item.show !== false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <nav className="bg-white h-screen w-64 border-r border-gray-200 fixed left-0 top-0 flex flex-col">
      <div className="p-6">
        <Link to="/dashboard" className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
          <Hotel className="w-8 h-8" />
          HotelHub
        </Link>
      </div>
      
      <div className="flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="p-6 border-t border-gray-200">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-2 w-full text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </nav>
  );
}
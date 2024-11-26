import { useAuth } from '../lib/auth';

export function usePermissions() {
  const { profile, permissions } = useAuth();

  const isSuperAdmin = profile?.role === 'super_admin';
  const isHotelAdmin = profile?.role === 'hotel_admin';
  const isStaff = profile?.role === 'staff';
  const isGuest = profile?.role === 'guest';
  const isSupport = profile?.role === 'support';

  return {
    isSuperAdmin,
    isHotelAdmin,
    isStaff,
    isGuest,
    isSupport,
    canManageRooms: isSuperAdmin || isHotelAdmin || (isStaff && permissions?.can_manage_rooms),
    canManageBookings: isSuperAdmin || isHotelAdmin || (isStaff && permissions?.can_manage_bookings),
    canViewReports: isSuperAdmin || isHotelAdmin || (isStaff && permissions?.can_view_reports),
    canManageStaff: isSuperAdmin || isHotelAdmin || (isStaff && permissions?.can_manage_staff),
  };
}
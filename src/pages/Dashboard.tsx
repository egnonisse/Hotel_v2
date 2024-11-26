import React from 'react';
import DashboardStats from '../components/DashboardStats';
import { Calendar, Clock, Users } from 'lucide-react';

export default function Dashboard() {
  const upcomingBookings = [
    {
      id: 1,
      guest: 'Sarah Johnson',
      room: 'Deluxe Ocean View',
      checkIn: '2024-03-20',
      nights: 3
    },
    {
      id: 2,
      guest: 'Michael Chen',
      room: 'Executive Suite',
      checkIn: '2024-03-21',
      nights: 2
    },
    {
      id: 3,
      guest: 'Emma Davis',
      room: 'Premium King',
      checkIn: '2024-03-22',
      nights: 4
    }
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          New Booking
        </button>
      </div>

      <DashboardStats />

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Bookings</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {upcomingBookings.map((booking, index) => (
            <div
              key={booking.id}
              className={`p-4 flex items-center justify-between ${
                index !== upcomingBookings.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="bg-indigo-50 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{booking.guest}</h3>
                  <p className="text-sm text-gray-500">{booking.room}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {booking.checkIn}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  {booking.nights} nights
                </div>
                <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
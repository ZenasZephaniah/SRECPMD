'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminHeader() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 1. Kill the cookie on the server
      await fetch('/api/auth/logout', { method: 'POST' });
      // 2. Force browser to reload at the login page
      window.location.href = '/login'; 
    } catch (error) {
      window.location.href = '/login';
    }
  };

  return (
    <header className="bg-white shadow-sm py-4 px-8 flex justify-between items-center mb-8 rounded-lg">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Dashboard</h1>
        <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mt-1">Store Overview</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Simple, Professional "Add Admin" Button */}
        <button 
          onClick={() => router.push('/onboard')}
          className="bg-indigo-50 text-indigo-700 px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-indigo-100 transition shadow-sm border border-indigo-100"
        >
          Add Admin
        </button>

        {/* Clean Logout Button */}
        <button 
          onClick={() => setShowLogoutConfirm(true)}
          className="bg-red-50 text-red-600 px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-red-100 transition border border-red-100 shadow-sm"
        >
          Logout
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-96 shadow-2xl">
            <h3 className="text-xl font-bold mb-2 text-gray-900">Sign Out?</h3>
            <p className="text-gray-500 mb-8">You will need to log in again to access the dashboard.</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout}
                className="px-5 py-2.5 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 shadow-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
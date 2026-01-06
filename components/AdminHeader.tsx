'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminHeader() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login'; 
    } catch (error) {
      window.location.href = '/login';
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
      
      {/* LEFT SIDE: Title + Uppercase Subtitle */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Product Management Dashboard
        </h1>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1 ml-1">
          INVENTORY OVERVIEW
        </p>
      </div>

      {/* RIGHT SIDE: Control Bar (Buttons ONLY - No text) */}
      <div className="bg-white shadow-sm border border-gray-100 py-2 px-4 rounded-xl flex items-center gap-3">
        
        <button 
          onClick={() => router.push('/onboard')}
          className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-indigo-100 transition"
        >
          Add Admin
        </button>

        {/* Divider Line */}
        <div className="h-6 w-px bg-gray-200"></div>

        <button 
          onClick={() => setShowLogoutConfirm(true)}
          className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-100 transition"
        >
          Logout
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-96 shadow-2xl transform transition-all scale-100">
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
    </div>
  );
}
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminHeader() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
     
      await fetch('/api/auth/logout', { method: 'POST' });
      
      
      router.push('/login');
      router.refresh(); 
    } catch (error) {
      console.error('Logout failed', error);
      
      router.push('/login');
    }
  };

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Product Management Dashboard</h1>
        <p className="text-gray-500 text-sm">Overview of your store's performance</p>
      </div>

      <div className="flex items-center gap-3">
        {/* Onboard Admin Button */}
        <button 
          onClick={() => router.push('/onboard')}
          className="bg-purple-100 text-purple-700 px-4 py-2 rounded-md font-medium text-sm hover:bg-purple-200 transition"
        >
          Add New Admin
        </button>

        {/* Logout Button */}
        <button 
          onClick={() => setShowLogoutConfirm(true)}
          className="bg-red-50 text-red-600 px-4 py-2 rounded-md font-medium text-sm hover:bg-red-100 transition border border-red-200"
        >
          Logout
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h3 className="text-lg font-bold mb-2">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to exit the dashboard?</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
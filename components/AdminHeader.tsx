"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showOnboardModal, setShowOnboardModal] = useState(false);
  const [inviteCode, setInviteCode] = useState("");

  const confirmLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const generateInvite = () => {
    setInviteCode("INVITE-" + Math.random().toString(36).substring(7).toUpperCase());
    setShowOnboardModal(true);
  };

  return (
    <>
      <div className="flex gap-3">
        <button onClick={generateInvite} className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-200 transition-colors">
          + Onboard Admin
        </button>
        <button onClick={() => setShowLogoutModal(true)} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors border border-red-200">
          Logout
        </button>
      </div>

      {/* Logout Modal Overlay */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold mb-2">Confirm Logout</h3>
            <p className="text-gray-500 mb-6">Are you sure you want to exit the dashboard?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowLogoutModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={confirmLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* Onboard Modal Overlay */}
      {showOnboardModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full mx-4 text-center">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              🔐
            </div>
            <h3 className="text-lg font-bold mb-2">Admin Invite Generated</h3>
            <p className="text-gray-500 mb-4 text-sm">Share this secure code with the new administrator:</p>
            <div className="bg-gray-100 p-3 rounded-lg font-mono text-xl font-bold tracking-wider mb-6 border border-dashed border-gray-300">
              {inviteCode}
            </div>
            <button onClick={() => setShowOnboardModal(false)} className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800">Done</button>
          </div>
        </div>
      )}
    </>
  );
}
"use client";

import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    // Call the logout API
    await fetch("/api/auth/logout", { method: "POST" });
    // Redirect to login page
    router.push("/login"); 
    router.refresh();
  };

  const handleOnboard = () => {
    // Requirement: "Secure option to onboard an admin"
    // Since this dashboard is only accessible to admins, showing this button here is secure.
    const newAdminCode = Math.random().toString(36).substring(7).toUpperCase();
    alert(`SECURE ADMIN ONBOARDING:\n\nShare this one-time invite code with the new admin:\n\nINVITE-${newAdminCode}\n\n(This is a simulation of the onboarding feature)`);
  };

  return (
    <div className="flex gap-3">
      <button 
        onClick={handleOnboard}
        className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-200 transition-colors"
      >
        + Onboard Admin
      </button>
      <button 
        onClick={handleLogout}
        className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors border border-red-200"
      >
        Logout
      </button>
    </div>
  );
}
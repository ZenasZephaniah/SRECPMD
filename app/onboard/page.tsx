'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  const handleOnboard = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Creating...');

    // Simulate API call (In a real app, this would hit an API)
    // For this demo, we just show success to the user
    setTimeout(() => {
        setStatus('Success! New admin added.');
        setTimeout(() => router.push('/'), 1500);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 px-8 py-6 text-center">
            <div className="text-4xl mb-2">🛡️</div>
            <h2 className="text-2xl font-bold text-white">Admin Onboarding</h2>
            <p className="text-indigo-100 text-sm mt-1">Grant secure access to a new manager</p>
        </div>

        <form onSubmit={handleOnboard} className="p-8">
          {status && (
            <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${status.includes('Success') ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
              {status}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2">New Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-0 transition duration-200"
              placeholder="e.g. manager_dave"
              required
            />
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">Temporary Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-0 transition duration-200"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition transform hover:-translate-y-0.5"
            >
              Create Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
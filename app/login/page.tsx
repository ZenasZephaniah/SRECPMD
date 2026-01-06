'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push('/'); 
      router.refresh();
    } else {
      setError('Not an authenticated user'); // Specific error message
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 font-sans">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Green Header */}
        <div className="bg-green-600 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">Inventory Admin</h1>
          <p className="text-green-100 text-sm opacity-90">Secure Admin Access</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {/* Error Box */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Admin Username</label>
            <input 
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" 
              placeholder="Enter username" 
              value={username} 
              onChange={(e) => setUser(e.target.value)} 
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input 
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPass(e.target.value)} 
            />
          </div>

          <button className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-md">
            Login
          </button>

          <p className="text-center text-xs text-gray-400 mt-4">
            Authorized personnel only
          </p>
        </form>
      </div>
    </div>
  );
}
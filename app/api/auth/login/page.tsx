'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      router.push('/'); 
      router.refresh();
    } else {
      alert('Invalid Login');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-100">
        <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">Admin Login</h1>
        <p className="text-center text-gray-500 text-sm mb-6">Secure Admin Portal • SSR Enabled</p>
        
        <input 
          className="w-full border p-3 mb-4 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUser(e.target.value)} 
        />
        <input 
          className="w-full border p-3 mb-6 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPass(e.target.value)} 
        />
        <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md">
          Sign In
        </button>
      </form>
    </div>
  );
}
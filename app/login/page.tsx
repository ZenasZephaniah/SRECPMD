'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/');
        router.refresh();
      } else {
        setError('Invalid credentials. Access denied.');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-lg px-8 pt-8 pb-8 mb-4">
          
          <div className="text-center mb-8">
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-800">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
               </svg>
             </div>
             <h2 className="text-2xl font-extrabold text-gray-900">Secure Admin Access</h2>
             <p className="text-sm text-red-600 mt-2 font-semibold">Authorized personnel only.</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-6 text-sm" role="alert">
              <p>{error}</p>
            </div>
          )}
          
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="mb-8">
             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
               Password
             </label>
             <input
               id="password"
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               required
             />
          </div>
          
          <div className="flex items-center justify-between">
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 uppercase tracking-wider text-sm ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Verifying...' : 'Login'}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} SRECPMD. All rights reserved. System access is monitored.
        </p>
      </div>
    </div>
  );
}
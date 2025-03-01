// src/app/(auth)/login/page.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('area1');
  const [isUser, setIsUser] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedRole(value);
    setIsUser(value === 'user');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // For demo purposes, we're using a simple email format
      const email = isUser 
        ? `${username}@linkgov.com` 
        : `${selectedRole}@linkgov.com`;
      
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error) {
      setError('Failed to login. Please check your credentials.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-primary-dark text-center">Login</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div id="username-container">
          <label htmlFor="username" className="block mb-1 font-medium">Username:</label>
          <select
            id="username"
            value={selectedRole}
            onChange={handleRoleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="area1">Area 1</option>
            <option value="area2">Area 2</option>
            <option value="area3">Area 3</option>
            <option value="area4">Area 4</option>
            <option value="user">User</option>
          </select>
        </div>
        
        {isUser && (
          <div>
            <label htmlFor="user-input" className="block mb-1 font-medium">User:</label>
            <input
              type="text"
              id="user-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
        )}
        
        <div>
          <label htmlFor="password" className="block mb-1 font-medium">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-background text-white font-medium rounded-lg hover:bg-opacity-90 transition"
        >
          Login
        </button>
      </form>
      
      <p className="mt-4 text-center">
        Don't have an account? <Link href="/signup" className="text-primary-dark hover:underline">Sign up</Link>
      </p>
    </div>
  );
}

// src/app/(auth)/signup/page.tsx (continued)
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '@/lib/firebase';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Create a new user with email and password
      const email = `${username}@linkgov.com`;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Add user to Firestore
      await setDoc(doc(firestore, "users", userCredential.user.uid), {
        username,
        email,
        role: 'citizen',
        createdAt: new Date(),
        isAdmin: false
      });

      router.push('/');
    } catch (error) {
      console.error('Signup error:', error);
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-primary-dark text-center">Sign Up</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1 font-medium">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        
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
        
        <div>
          <label htmlFor="confirmPassword" className="block mb-1 font-medium">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-background text-white font-medium rounded-lg hover:bg-opacity-90 transition"
        >
          Create Account
        </button>
      </form>
      
      <p className="mt-4 text-center">
        Already have an account? <Link href="/login" className="text-primary-dark hover:underline">Login</Link>
      </p>
    </div>
  );
}
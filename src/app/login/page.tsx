'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Sign in the user with email and password
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to log in. Please check your credentials and try again.');
    }
  };

  return (
    <div className="bg-white p-8 mt-5 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-primary-dark text-center">Login</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white font-medium rounded-lg hover:bg-opacity-90 transition"
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
// import Link from 'next/link';
// import React from 'react';  

// const LoginPage = () => {
//     return (
//         <div className='bg-white p-8 mt-5 rounded-lg shadow-lg w-full max-w-md mx-auto'>
//             <h1>Login</h1>
//             <input type="text" placeholder='Email' className='border-2 border-gray-300 rounded-md p-2' />
//             <input type='password' placeholder='Password' className='border-2 border-gray-300 rounded-md p-2' /> 
//             <button type='submit' className='bg-green-500 text-white p-2 rounded-md'>Login</button>
//             <p className='text-center text-black'>
//                 Don't have an account? <Link href="/signup" className=" hover:underline">Sign up</Link>
//             </p>
//         </div>
//     )
// }

// export default LoginPage; 
// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-primary text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <section className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-3xl font-bold">WELCOME TO LINKGOV</h1>
          </section>
          
          <section className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <form onSubmit={handleSearch} className="flex items-center">
              <label htmlFor="searchheader" className="mr-2">Search</label>
              <input
                type="text"
                id="searchheader"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-1 rounded-lg text-black w-32 md:w-40"
              />
            </form>
            
            <nav className="flex space-x-4 mt-2 md:mt-0">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/account" className="hover:underline">Account</Link>
            </nav>
          </section>
        </div>
      </div>
    </header>
  );
}
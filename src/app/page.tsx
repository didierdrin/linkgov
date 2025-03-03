// src/app/page.tsx
'use client';

import { useState } from 'react';
import PostList from '@/components/feed/PostList';
import CommentDashboard from '@/components/feed/CommentSection';

export default function Home() {
  const [selectedArea, setSelectedArea] = useState('areas');
  const [searchQuery, setSearchQuery] = useState('');

  const areas = [
    { id: 'area1', name: 'Gasabo' },
    { id: 'area2', name: 'Nyarugenge' },
    { id: 'area3', name: 'Kicukiro' },
    { id: 'area4', name: 'Kamonyi' },
    { id: 'areas', name: 'All Areas' },
  ];

  return (
    <div className="flex flex-col space-y-6">
      {/* Filter and search section */}
      <section id="sort" className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 p-4 bg-white rounded-lg shadow">
        <div className="w-full md:w-auto">
          <label htmlFor="selectareas" className="block mb-2 text-primary-dark">Choose an area</label>
          <select
            id="selectareas"
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="w-full md:w-64 p-2 rounded-lg border border-gray-300"
          >
            {areas.map((area) => (
              <option key={area.id} value={area.id}>{area.name}</option>
            ))}
          </select>
        </div>
        
        <div className="w-full md:w-auto">
          <label htmlFor="search" className="block mb-2 text-primary-dark">Search</label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 p-2 rounded-lg border border-gray-300"
            placeholder="Search posts..."
          />
        </div>
      </section>

      {/* Main content area */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Posts feed */}
        <div className="w-full md:w-2/3">
          <PostList area={selectedArea} searchQuery={searchQuery} />
        </div>
        
        {/* Sidebar with comment dashboard */}
        <aside className="w-full md:w-1/3 space-y-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-4 text-primary-dark">Comment Dashboard</h2>
            <CommentDashboard />
          </div>
        </aside>
      </div>
    </div>
  );
}
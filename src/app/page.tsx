// src/app/page.tsx
'use client';

import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import PostList from '@/components/feed/PostList';
import CommentDashboard from '@/components/feed/CommentSection';

export default function Home() {
  const [selectedArea, setSelectedArea] = useState('areas');
  const [searchQuery, setSearchQuery] = useState('');

  const areas = [
    { id: 'areas', name: 'All Areas' },
    { id: 'area1', name: 'Gasabo' },
    { id: 'area2', name: 'Nyarugenge' },
    { id: 'area3', name: 'Kicukiro' },
    { id: 'area4', name: 'Kamonyi' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero section */}
      <section className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Connect with Your Community</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover local conversations, share insights, and participate in making your area better.
        </p>
      </section>

      {/* Filter and search section */}
      <section className="mb-8 bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-end">
          <div className="flex-1">
            <label htmlFor="selectareas" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>Choose an area</span>
              </div>
            </label>
            <select
              id="selectareas"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              {areas.map((area) => (
                <option key={area.id} value={area.id}>{area.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-1">
                <Search size={16} />
                <span>Search posts</span>
              </div>
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Type keywords..."
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all md:mt-0 mt-4">
            Filter Results
          </button>
        </div>
      </section>

      {/* Main content area */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Posts feed */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-600 rounded-full block"></span>
              Community Feed
            </h2>
            <PostList area={selectedArea} searchQuery={searchQuery} />
          </div>
        </div>
        
        {/* Sidebar with comment dashboard */}
        <aside className="w-full lg:w-1/3 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <span className="w-2 h-6 bg-green-600 rounded-full block"></span>
              Community Pulse
            </h2>
            <CommentDashboard />
          </div>
        </aside>
      </div>
    </div>
  );
}

// // src/app/page.tsx
// 'use client';

// import { useState } from 'react';
// import PostList from '@/components/feed/PostList';
// import CommentDashboard from '@/components/feed/CommentSection';

// export default function Home() {
//   const [selectedArea, setSelectedArea] = useState('areas');
//   const [searchQuery, setSearchQuery] = useState('');

//   const areas = [
//     { id: 'area1', name: 'Gasabo' },
//     { id: 'area2', name: 'Nyarugenge' },
//     { id: 'area3', name: 'Kicukiro' },
//     { id: 'area4', name: 'Kamonyi' },
//     { id: 'areas', name: 'All Areas' },
//   ];

//   return (
//     <div className="flex flex-col space-y-6">
//       {/* Filter and search section */}
//       <section id="sort" className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 p-4 bg-white rounded-lg shadow">
//         <div className="w-full md:w-auto">
//           <label htmlFor="selectareas" className="block mb-2 text-primary-dark">Choose an area</label>
//           <select
//             id="selectareas"
//             value={selectedArea}
//             onChange={(e) => setSelectedArea(e.target.value)}
//             className="w-full md:w-64 p-2 rounded-lg border border-gray-300"
//           >
//             {areas.map((area) => (
//               <option key={area.id} value={area.id}>{area.name}</option>
//             ))}
//           </select>
//         </div>
        
//         <div className="w-full md:w-auto">
//           <label htmlFor="search" className="block mb-2 text-primary-dark">Search</label>
//           <input
//             type="text"
//             id="search"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full md:w-64 p-2 rounded-lg border border-gray-300"
//             placeholder="Search posts..."
//           />
//         </div>
//       </section>

//       {/* Main content area */}
//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Posts feed */}
//         <div className="w-full md:w-2/3">
//           <PostList area={selectedArea} searchQuery={searchQuery} />
//         </div>
        
//         {/* Sidebar with comment dashboard */}
//         <aside className="w-full md:w-1/3 space-y-6">
//           <div className="bg-white rounded-lg shadow p-4">
//             <h2 className="text-xl font-bold mb-4 text-primary-dark">Comment Dashboard</h2>
//             <CommentDashboard />
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }
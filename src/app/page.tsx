// src/app/page.tsx
'use client';

import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import PostList from '@/components/feed/PostList';
import CommentDashboard from '@/components/feed/CommentSection';
import AddPostDialog from '@/components/feed/AddPostDialog';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
export default function Home() {
  const [selectedArea, setSelectedArea] = useState('areas');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddPostDialogOpen, setIsAddPostDialogOpen] = useState(false);
  const [refreshPosts, setRefreshPosts] = useState(false);

  const router = useRouter();

  const onPostAdded=() => {
    setRefreshPosts((prev) => !prev); // Toggle state to trigger a refresh
  };
  

  const handleAddPostClick = () => {
    const user = auth.currentUser;
    if (!user) {
      router.push('/login');
    } else {
      setIsAddPostDialogOpen(true);
      onPostAdded();
    }
  };


  const areas = [
    { id: 'areas', name: 'All Areas' },
    { id: 'Gasabo', name: 'Gasabo' },
    { id: 'Nyarugenge', name: 'Nyarugenge' },
    { id: 'Kicukiro', name: 'Kicukiro' },
    { id: 'Kamonyi', name: 'Kamonyi' },
  ];
  

  return (
    <div className="flex flex-col min-h-screen bg-green-500">
      {/* Header */}
      <header className="flex justify-between items-center bg-green-500 text-white p-4">
        <div className="flex-1"></div>
        <img src="/linkgov.png" alt="logo" className="w-10 h-10 mr-10" />
        <h1 className="flex-1 text-center text-2xl font-bold">Community Platform</h1>
        <nav className="flex flex-1 justify-end gap-4 mr-6">
          <a href="/" className="hover:underline">Home</a>
          <a href="/about" className="hover:underline">About</a>
          <a href="/account" className="hover:underline">Account</a>
          <a href="/forum" className="hover:underline">Forum</a>
          <button onClick={handleAddPostClick} className="hover:underline">+ Post</button>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex flex-col md:flex-row justify-center items-center p-4 md:p-8 flex-grow">
        <div className="w-full max-w-7xl">
          {/* Filter and search section */}
          <section id="sort" className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 p-6 bg-white rounded-xl shadow-md mb-8 text-center">
            <div className="w-full md:w-auto">
              <label htmlFor="selectareas" className="block mb-2 text-gray-700 font-medium">
                <div className="flex items-center justify-center gap-1">
                  <MapPin size={16} />
                  <span>Choose an area</span>
                </div>
              </label>
              <select
                id="selectareas"
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full md:w-96 p-3 rounded-lg border border-gray-300 text-center focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              >
                {areas.map((area) => (
                  <option key={area.id} value={area.id}>{area.name}</option>
                ))}
              </select>
            </div>
            
            
          </section>

          {/* Main content area */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Posts feed - mainleft */}
            <div id="mainleft" className="w-full lg:w-1/2 text-center">
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center justify-center gap-2">
                  <span className="w-2 h-6 bg-green-600 rounded-full block"></span>
                  Community Feed
                </h2>
                <PostList refreshTrigger={refreshPosts} area={selectedArea} searchQuery={searchQuery} />
              </div>
            </div>
            
            {/* Sidebar with content - mainright */}
            <div id="mainright" className="w-full lg:w-1/2 flex flex-col md:flex-row gap-6 text-center">
              {/* First column - mainright1 */}
              <div id="mainright1" className="w-full md:w-1/2 text-center">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center justify-center gap-2">
                    <span className="w-2 h-6 bg-green-600 rounded-full block"></span>
                    Announcements
                  </h2>
                  <p className="text-gray-700">Important community announcements will appear here.</p>
                </div>
              </div>
              
              {/* Second column - mainright2 */}
              <div id="mainright2" className="w-full md:w-1/2 text-center">
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center justify-center gap-2">
                    <span className="w-2 h-6 bg-green-600 rounded-full block"></span>
                    Community Pulse
                  </h2>
                  <CommentDashboard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Add Post Dialog */}
      <AddPostDialog
        isOpen={isAddPostDialogOpen}
        onClose={() => setIsAddPostDialogOpen(false)}
        onPostAdded={() => {
          setIsAddPostDialogOpen(false);
          // Optionally, refresh the posts list here
        }}
      />
    </div>
  );
}

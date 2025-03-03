// src/app/account/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { usePosts } from '@/hooks/usePosts';

export default function AccountPage() {
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();
  const { posts, loading: postsLoading, deletePost } = usePosts();
  const [isEditing, setIsEditing] = useState(false);
  
  // Redirect if not logged in
  if (!authLoading && !user) {
    router.push('/login');
    return null;
  }
  
  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading account information...</p>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleDeletePost = async (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await deletePost(postId);
    }
  };

  // Filter posts to only show the user's posts
  const userPosts = posts.filter((post) => post.authorId === user?.uid);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">My Account</h1>
      <div className="mb-6">
        <p className="text-lg">Logged in as: {user!.email}</p>
        <button 
          onClick={handleSignOut} 
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-3">My Posts</h2>
        {postsLoading ? (
          <p>Loading posts...</p>
        ) : (
          <>
            {userPosts.length > 0 ? (
              <ul className="space-y-4">
                {userPosts.map((post) => (
                  <li key={post.id} className="p-4 bg-white rounded shadow">
                    <h3 className="text-xl font-bold">{post.title}</h3>
                    <p className="mt-2 text-gray-700">{post.content}</p>
                    <div className="mt-4 flex space-x-2">
                      <button 
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => router.push(`/edit-post/${post.id}`)}
                      >
                        Edit
                      </button>
                      <button 
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You haven't created any posts yet.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

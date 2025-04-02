// src/app/account/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { usePosts } from '@/hooks/usePosts';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

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
  const userPosts = posts.filter((post) => post.uid === user?.uid);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex items-center mb-4 hover:text-green-500">
        <button
          onClick={() => router.back()}
          className="flex items-center text-primary-dark hover:text-primary"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Back
        </button>
      </div>
      
      <h1 className="text-3xl font-bold mb-4">My Account</h1>
      
      <div className="mb-8 p-6 bg-white rounded-lg shadow">
        <p className="text-lg mb-2">Logged in as: {user!.email}</p>
        <p className="text-gray-600 mb-4">Display name: {user!.displayName || 'Anonymous'}</p>
        <button 
          onClick={handleSignOut} 
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">My Posts</h2>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Create New Post
          </button>
        </div>
        
        {postsLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {userPosts.length > 0 ? (
              <div className="space-y-6">
                {userPosts.map((post) => (
                  <div key={post.id} className="p-6 bg-white rounded-lg shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">{post.title}</h3>
                        {post.subtitle && (
                          <p className="text-sm text-gray-500 mt-1">{post.subtitle}</p>
                        )}
                      </div>
                      <div className="flex space-x-2">
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
                    </div>

                    {post.imgUrl && (
                      <div className="mt-4 relative h-48 w-full">
                        <img 
                          src={post.imgUrl} 
                          alt={post.title}
                          className="object-cover rounded-lg w-full h-full"
                        />
                      </div>
                    )}

                    <p className="mt-4 text-gray-700 whitespace-pre-line">{post.description}</p>
                    
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      {post.area && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                          </svg>
                          {post.area}
                        </div>
                      )}
                      
                      {post.ministry && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2H4v-1h16v1h-1z" clipRule="evenodd"></path>
                          </svg>
                          {post.ministry}
                        </div>
                      )}
                      
                      {post.createdAt && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                          </svg>
                          {post.createdAt.toDate ? 
                            formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true }) : 
                            'Recently'}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                        </svg>
                        {post.likeCount || 0}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"></path>
                        </svg>
                        {post.dislikeCount || 0}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
                        </svg>
                        {post.commentCount || 0}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-10 bg-white rounded-lg shadow">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p className="text-xl text-gray-600">You haven't created any posts yet.</p>
                <button
                  onClick={() => router.push('/')}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Create Your First Post
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// // src/app/account/page.tsx
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/hooks/useAuth';
// import { usePosts } from '@/hooks/usePosts';

// export default function AccountPage() {
//   const router = useRouter();
//   const { user, loading: authLoading, signOut } = useAuth();
//   const { posts, loading: postsLoading, deletePost } = usePosts();
//   const [isEditing, setIsEditing] = useState(false);
  
//   // Redirect if not logged in
//   if (!authLoading && !user) {
//     router.push('/login');
//     return null;
//   }
  
//   if (authLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading account information...</p>
//         </div>
//       </div>
//     );
//   }

//   const handleSignOut = async () => {
//     await signOut();
//     router.push('/');
//   };

//   const handleDeletePost = async (postId: string) => {
//     if (confirm('Are you sure you want to delete this post?')) {
//       await deletePost(postId);
//     }
//   };

//   // Filter posts to only show the user's posts
//   const userPosts = posts.filter((post) => post.authorId === user?.uid);

//   return (
//     <div className="p-4">
//       <div className="flex items-center mb-4 hover:text-green-500">
//         <button
//           onClick={() => router.back()}
//           className="flex items-center text-primary-dark hover:text-primary"
//         >
//           <svg
//             className="w-5 h-5 mr-2"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M15 19l-7-7 7-7"
//             ></path>
//           </svg>
//           Back
//         </button>
//       </div>
//       <h1 className="text-3xl font-bold mb-4">My Account</h1>
//       <div className="mb-6">
//         <p className="text-lg">Logged in as: {user!.email}</p>
//         <button 
//           onClick={handleSignOut} 
//           className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//         >
//           Sign Out
//         </button>
//       </div>
      
//       <div>
//         <h2 className="text-2xl font-semibold mb-3">My Posts</h2>
//         {postsLoading ? (
//           <p>Loading posts...</p>
//         ) : (
//           <>
//             {userPosts.length > 0 ? (
//               <ul className="space-y-4">
//                 {userPosts.map((post) => (
//                   <li key={post.id} className="p-4 bg-white rounded shadow">
//                     <h3 className="text-xl font-bold">{post.title}</h3>
//                     <p className="mt-2 text-gray-700">{post.content}</p>
//                     <div className="mt-4 flex space-x-2">
//                       <button 
//                         className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                         onClick={() => router.push(`/edit-post/${post.id}`)}
//                       >
//                         Edit
//                       </button>
//                       <button 
//                         className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                         onClick={() => handleDeletePost(post.id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>You haven't created any posts yet.</p>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

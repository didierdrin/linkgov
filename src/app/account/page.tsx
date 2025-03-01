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
//   const userPosts = posts.filter(
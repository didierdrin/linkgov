
// src/components/feed/PostCard.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    authorName: string;
    area: string;
    createdAt: Date;
    likeCount: number;
    dislikeCount: number;
    commentCount: number;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(post.likeCount);
  const [dislikes, setDislikes] = useState(post.dislikeCount);

  const handleLike = () => {
    // In a real app, you'd update Firestore here
    setLikes(prev => prev + 1);
  };

  const handleDislike = () => {
    // In a real app, you'd update Firestore here
    setDislikes(prev => prev + 1);
  };

  const handleShare = () => {
    // Implement share functionality
    navigator.clipboard.writeText(window.location.origin + `/post/${post.id}`);
    alert('Link copied to clipboard!');
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-primary-dark mb-2">{post.title}</h2>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span>Posted by {post.authorName}</span>
              <span className="mx-2">•</span>
              <span>{formatDistanceToNow(post.createdAt)} ago</span>
              <span className="mx-2">•</span>
              <span>Area: {post.area}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{post.content}</p>
        
        <div className="flex items-center justify-between border-t pt-4 mt-4">
          <div className="flex space-x-4">
            <button onClick={handleLike} className="flex items-center space-x-1 text-gray-500 hover:text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span>{likes}</span>
            </button>
            
            <button onClick={handleDislike} className="flex items-center space-x-1 text-gray-500 hover:text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
              </svg>
              <span>{dislikes}</span>
            </button>
            
            <button onClick={toggleComments} className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span>{post.commentCount}</span>
            </button>
            
            <button onClick={handleShare} className="flex items-center space-x-1 text-gray-500 hover:text-purple-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Share</span>
            </button>
          </div>
          
          <Link href={`/post/${post.id}`} className="text-primary-dark hover:underline">
            View Full Discussion
          </Link>
        </div>
      </div>
      
      {showComments && (
        <div className="bg-gray-50 p-6 border-t">
          <h3 className="text-lg font-semibold mb-4">Comments</h3>
          {/* Comments would be loaded here */}
          <div className="text-gray-500 text-sm">Loading comments...</div>
        </div>
      )}
    </div>
  );
}

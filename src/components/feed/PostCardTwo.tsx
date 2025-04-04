// src/components/feed/PostCardTwo.tsx
'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import CommentSection from './CommentSection';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content?: string;
    description?: string;
    subtitle?: string;
    authorName: string;
    area: string;
    ministry?: string;
    createdAt: Date;
    likeCount: number;
    dislikeCount: number;
    commentCount: number;
    imgUrl?: string;
  };
  onLike: (postId: string) => void;
  onDislike: (postId: string) => void;
  onAddComment: (postId: string, comment: string) => void;
}

export default function PostCardTwo({ post, onLike, onDislike, onAddComment }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  const placeholderImage = "https://res.cloudinary.com/dezvucnpl/image/upload/v1742381846/istockphoto-1288129985-612x612_jvyx9t.jpg";
  const imageUrl = post.imgUrl || placeholderImage;

  const handleLike = () => {
    onLike(post.id);
  };

  const handleDislike = () => {
    onDislike(post.id);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + `/post/${post.id}`);
    alert('Link copied to clipboard!');
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const openCommentDialog = () => {
    setIsCommentDialogOpen(true);
  };

  const closeCommentDialog = () => {
    setIsCommentDialogOpen(false);
    setCommentText('');
  };

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      onAddComment(post.id, commentText);
      closeCommentDialog();
      window.location.href = '/';
      
      // Show comments section after adding a comment
      if (!showComments) {
        setShowComments(true);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex gap-4">
          {/* Image on the left */}
          <div className="flex-shrink-0">
           
            <div className="relative h-24 w-24 rounded-md overflow-hidden">
  <img 
    src={imageUrl} 
    alt={post.title}
    className="object-cover w-full h-full"
    onError={(e) => {
      console.error('Error loading image:', e);
      (e.target as HTMLImageElement).src = placeholderImage;
    }}
    loading="lazy"
  />
</div>
          </div>
          
          {/* Content on the right */}
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-primary-dark mb-2">{post.title}</h2>
            {post.subtitle && <h3 className="text-lg text-gray-700 mb-2">{post.subtitle}</h3>}
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span>Posted by {post.authorName}</span>
              <span className="mx-2">•</span>
              <span>{formatDistanceToNow(post.createdAt)} ago</span>
              <span className="mx-2">•</span>
              <span>Area: {post.area}</span>
              {post.ministry && (
                <>
                  <span className="mx-2">•</span>
                  <span>Ministry: {post.ministry}</span>
                </>
              )}
            </div>
            
            <p className="text-gray-700 mb-4">{post.description || post.content}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between border-t pt-4 mt-4">
          <div className="flex space-x-4">
            <button onClick={handleLike} className="flex items-center space-x-1 text-gray-500 hover:text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span>{post.likeCount}</span>
            </button>
            
            <button onClick={handleDislike} className="flex items-center space-x-1 text-gray-500 hover:text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
              </svg>
              <span>{post.dislikeCount}</span>
            </button>
            
            <button onClick={toggleComments} className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span>{post.commentCount}</span>
            </button>
            
            <button onClick={openCommentDialog} className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Add Comment</span>
            </button>
            
          
          </div>
        </div>
      </div>
      
      {/* Comment Dialog */}
      {isCommentDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>
            <textarea
              className="w-full border rounded-md p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your comment here..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <div className="flex justify-end gap-3 mt-4">
              <button 
                onClick={closeCommentDialog}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitComment}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Comments Section */}
      {/* {showComments && (
        <div className="bg-gray-50 p-6 border-t">
          <CommentSection postId={post.id} limit={3} />
        </div>
      )} */}
    </div>
  );
}

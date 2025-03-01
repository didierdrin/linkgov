
// src/components/feed/CommentList.tsx
'use client';

import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';

interface Comment {
  id: string;
  content: string;
  authorName: string;
  authorId: string;
  createdAt: Date;
  likeCount: number;
  dislikeCount: number;
}

interface CommentListProps {
  comments: Comment[];
  onDelete: (commentId: string) => Promise<boolean>;
}

export default function CommentList({ comments, onDelete }: CommentListProps) {
  const { user } = useAuth();

  if (comments.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <span className="font-medium">{comment.authorName}</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(comment.createdAt)} ago
              </span>
            </div>
            
            {(user?.uid === comment.authorId || user?.isAdmin) && (
              <button
                onClick={() => onDelete(comment.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            )}
          </div>
          
          <p className="mt-2 text-gray-700">{comment.content}</p>
          
          <div className="flex items-center space-x-4 mt-3">
            <div className="flex items-center space-x-1 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span>{comment.likeCount}</span>
            </div>
            
            <div className="flex items-center space-x-1 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
              </svg>
              <span>{comment.dislikeCount}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// src/components/feed/CommentForm.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface CommentFormProps {
  postId: string;
  onCommentSubmit: (content: string) => Promise<any>;
}

export default function CommentForm({ postId, onCommentSubmit }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) return;
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      await onCommentSubmit(content);
      setContent('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg text-center">
        Please log in to leave a comment
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
          Add a comment
        </label>
        <textarea
          id="comment"
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          placeholder="Share your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </div>
    </form>
  );
}

// src/components/feed/AddPostDialog.tsx
'use client';

import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore, auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface AddPostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPostAdded: () => void;
}

export default function AddPostDialog({ isOpen, onClose, onPostAdded }: AddPostDialogProps) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title || !description) {
      setError('Title and description are required.');
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        router.push('/login');
        return;
      }

      await addDoc(collection(firestore, 'posts'), {
        title,
        subtitle,
        description,
        imgUrl,
        uid: user.uid,
        authorName: user.displayName || 'Anonymous',
        createdAt: serverTimestamp(),
        likeCount: 0,
        dislikeCount: 0,
        commentCount: 0,
      });

      onPostAdded(); // Refresh the posts list
      onClose(); // Close the dialog
    } catch (error) {
      console.error('Error adding post:', error);
      setError('Failed to add post. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create a New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-1 font-medium">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="subtitle" className="block mb-1 font-medium">Subtitle:</label>
            <input
              type="text"
              id="subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1 font-medium">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="imgUrl" className="block mb-1 font-medium">Image URL (optional):</label>
            <input
              type="url"
              id="imgUrl"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
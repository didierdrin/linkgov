// src/hooks/usePosts.ts
'use client';

import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  Timestamp
} from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { useAuth } from './useAuth';

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  area: string;
  createdAt: Date;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  uid: string;
}

interface NewPost {
  title: string;
  content: string;
  area: string;
  uid: string;
}

export function usePosts(area?: string, limitCount: number = 10) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let postsQuery = query(
        collection(firestore, 'posts'),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );

      // Filter by area if specified
      if (area && area !== 'areas') {
        postsQuery = query(
          collection(firestore, 'posts'),
          where('area', '==', area),
          orderBy('createdAt', 'desc'),
          limit(limitCount)
        );
      }

      const querySnapshot = await getDocs(postsQuery);
      const fetchedPosts: Post[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedPosts.push({
          id: doc.id,
          title: data.title,
          content: data.content,
          authorId: data.authorId,
          authorName: data.authorName,
          area: data.area,
          createdAt: data.createdAt.toDate(),
          likeCount: data.likeCount || 0,
          dislikeCount: data.dislikeCount || 0,
          commentCount: data.commentCount || 0,
          uid: data.uid || ''
        });
      });

      setPosts(fetchedPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [area, limitCount]);

  const addPost = async (newPost: NewPost) => {
    if (!user) {
      setError("You must be logged in to create a post");
      return null;
    }

    try {
      const docRef = await addDoc(collection(firestore, 'posts'), {
        title: newPost.title,
        content: newPost.content,
        area: newPost.area,
        authorId: user.uid,
        authorName: user.username,
        createdAt: Timestamp.now(),
        likeCount: 0,
        dislikeCount: 0,
        commentCount: 0
      });

      const createdPost: Post = {
        id: docRef.id,
        title: newPost.title,
        content: newPost.content,
        area: newPost.area,
        authorId: user.uid,
        authorName: user.username,
        createdAt: new Date(),
        likeCount: 0,
        dislikeCount: 0,
        commentCount: 0,
        uid: user.uid
      };

      setPosts(prev => [createdPost, ...prev]);
      return createdPost;
    } catch (err) {
      console.error("Error adding post:", err);
      setError("Failed to create post. Please try again.");
      return null;
    }
  };

  const likePost = async (postId: string) => {
    if (!user) return;
    
    try {
      const post = posts.find(p => p.id === postId);
      const newLikeCount = (post?.likeCount ?? 0) + 1;
  
      await updateDoc(doc(firestore, 'posts', postId), {
        likeCount: newLikeCount
      });
      
      setPosts(prev => 
        prev.map(post => 
          post.id === postId 
            ? { ...post, likeCount: newLikeCount } 
            : post
        )
      );
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };
  
  const dislikePost = async (postId: string) => {
    if (!user) return;
    
    try {
      const post = posts.find(p => p.id === postId);
      const newDislikeCount = (post?.dislikeCount ?? 0) + 1;
  
      await updateDoc(doc(firestore, 'posts', postId), {
        dislikeCount: newDislikeCount
      });
      
      setPosts(prev => 
        prev.map(post => 
          post.id === postId 
            ? { ...post, dislikeCount: newDislikeCount } 
            : post
        )
      );
    } catch (err) {
      console.error("Error disliking post:", err);
    }
  };
  

  const deletePost = async (postId: string) => {
    if (!user) return false;
    
    const post = posts.find(p => p.id === postId);
    
    // Only allow deletion if user is admin or post author
    if (!post || (post.authorId !== user.uid && !user.isAdmin)) {
      setError("You don't have permission to delete this post");
      return false;
    }
    
    try {
      await deleteDoc(doc(firestore, 'posts', postId));
      setPosts(prev => prev.filter(post => post.id !== postId));
      return true;
    } catch (err) {
      console.error("Error deleting post:", err);
      setError("Failed to delete post. Please try again.");
      return false;
    }
  };

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
    addPost,
    likePost,
    dislikePost,
    deletePost
  };
}
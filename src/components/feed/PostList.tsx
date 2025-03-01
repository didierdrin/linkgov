// src/components/feed/PostList.tsx
'use client';

import { useState, useEffect } from 'react';
import PostCard from './Postcard';
import { firestore } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

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
}

interface PostListProps {
  area: string;
  searchQuery: string;
}

export default function PostList({ area, searchQuery }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        let postsQuery = query(
          collection(firestore, 'posts'),
          orderBy('createdAt', 'desc')
        );

        // Filter by area if not "all areas"
        if (area !== 'areas') {
          postsQuery = query(
            collection(firestore, 'posts'),
            where('area', '==', area),
            orderBy('createdAt', 'desc')
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
            likeCount: data.likeCount,
            dislikeCount: data.dislikeCount,
            commentCount: data.commentCount
          });
        });

        // Filter by search query if provided
        const filteredPosts = searchQuery 
          ? fetchedPosts.filter(post => 
              post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              post.content.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : fetchedPosts;

        setPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [area, searchQuery]);

  if (loading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center py-8">No posts found. Be the first to create a post!</div>;
  }

  return (
    <div className="space-y-6">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

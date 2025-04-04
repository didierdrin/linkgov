'use client';

import { useState, useEffect } from 'react';
import { firestore } from '@/lib/firebase';
import PostCard from './PostCardTwo';
import { useComments } from '@/hooks/useComments';
import { usePosts } from '@/hooks/usePosts';
import PostCardTwo from '@/components/feed/PostCardTwo';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

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
  refreshTrigger: boolean; // NEW PROP to force re-fetch
}

export default function PostList({ area, searchQuery, refreshTrigger }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const { error, likePost, dislikePost } = usePosts();
  const { addComment } = useComments();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let postsQuery = query(collection(firestore, 'posts'), orderBy('createdAt', 'desc'));

    if (area !== 'areas') {
      postsQuery = query(collection(firestore, 'posts'), where('area', '==', area), orderBy('createdAt', 'desc'));
    }

    // Use Firestore's real-time listener (onSnapshot)
    const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
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
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
          likeCount: data.likeCount || 0,
          dislikeCount: data.dislikeCount || 0,
          commentCount: data.commentCount || 0,
        });
      });

      // Apply search filter
      const filteredPosts = searchQuery
        ? fetchedPosts.filter((post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : fetchedPosts;

      setPosts(filteredPosts);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [area, searchQuery, refreshTrigger]); // Re-fetch when refreshTrigger changes

  const handleAddComment = async (postId: string, commentText: string) => {
   await addComment(postId, commentText);
    // No need to manually refetch posts since useComments handles updating the comment count
  };
  
  if (loading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center py-8">No posts found. Be the first to create a post!</div>;
  }

  return (
    // <div className="space-y-6">
    //   {posts.map((post) => (
    //     <PostCard key={post.id} post={post} />
    //   ))}
    // </div>
    <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No posts found. Be the first to post in this area!
          </div>
        ) : (
          posts.map((post) => (
            <PostCardTwo
              key={post.id}
              post={post}
              onLike={likePost}
              onDislike={dislikePost}
              onAddComment={handleAddComment}
            />
          ))
        )}
      </div>
  );
}

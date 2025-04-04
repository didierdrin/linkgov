// src/hooks/useComments.ts
'use client';

import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  addDoc,
  getDocs,
  Timestamp,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { useAuth } from './useAuth';

interface Comment {
  id: string;
  postId: string;
  text: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
}

export function useComments(postId?: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchComments = async (postId: string) => {
    if (!postId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const commentsQuery = query(
        collection(firestore, 'comments'),
        where('postId', '==', postId),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(commentsQuery);
      const fetchedComments: Comment[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedComments.push({
          id: doc.id,
          postId: data.postId,
          text: data.text,
          authorId: data.authorId,
          authorName: data.authorName,
          createdAt: data.createdAt.toDate(),
        });
      });

      setComments(fetchedComments);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to load comments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchComments(postId);
    }
  }, [postId]);

  const addComment = async (postId: string, text: string) => {
    if (!user) {
      setError("You must be logged in to comment");
      return null;
    }

    try {
      // First, add the comment to the comments collection
      const commentData = {
        postId,
        text,
        authorId: user.uid,
        authorName: user.username || "Anonymous",
        createdAt: Timestamp.now()
      };
      
      const docRef = await addDoc(collection(firestore, 'comments'), commentData);
      
      // Then, update the commentCount in the post document
      const postRef = doc(firestore, 'posts', postId);
      const postSnap = await getDoc(postRef);
      
      if (postSnap.exists()) {
        const postData = postSnap.data();
        const currentCommentCount = postData.commentCount || 0;
        
        await updateDoc(postRef, {
          commentCount: currentCommentCount + 1
        });
      }

      // Add the new comment to the local state
      const newComment: Comment = {
        id: docRef.id,
        postId,
        text,
        authorId: user.uid,
        authorName: user.username || "Anonymous",
        createdAt: new Date()
      };

      setComments(prev => [newComment, ...prev]);
      return newComment;
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("Failed to add comment. Please try again.");
      return null;
    }
  };

  return {
    comments,
    loading,
    error,
    addComment,
    fetchComments
  };
}

// // src/hooks/useComments.ts
// 'use client';

// import { useState, useEffect } from 'react';
// import { 
//   collection, 
//   query, 
//   where, 
//   orderBy, 
//   limit, 
//   getDocs,
//   addDoc,
//   updateDoc,
//   doc,
//   deleteDoc,
//   Timestamp, 
//   increment,
//   onSnapshot
// } from 'firebase/firestore';
// import { firestore } from '@/lib/firebase';
// import { useAuth } from './useAuth';

// interface Comment {
//   id: string;
//   postId: string;
//   content: string;
//   authorId: string;
//   authorName: string;
//   createdAt: Date;
//   likeCount: number;
//   dislikeCount: number;
// }

// export function useComments(postId: string) {
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { user } = useAuth();

//   useEffect(() => {
//     if (!postId) {
//       setComments([]);
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
    
//     const commentsQuery = query(
//       collection(firestore, 'comments'),
//       where('postId', '==', postId),
//       orderBy('createdAt', 'desc')
//     );

//     const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
//       const fetchedComments: Comment[] = [];
      
//       snapshot.forEach((doc) => {
//         const data = doc.data();
//         fetchedComments.push({
//           id: doc.id,
//           postId: data.postId,
//           content: data.content,
//           authorId: data.authorId,
//           authorName: data.authorName,
//           createdAt: data.createdAt.toDate(),
//           likeCount: data.likeCount || 0,
//           dislikeCount: data.dislikeCount || 0
//         });
//       });

//       setComments(fetchedComments);
//       setLoading(false);
//     }, (err) => {
//       console.error("Error fetching comments:", err);
//       setError("Failed to load comments. Please try again later.");
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, [postId]);

//   const addComment = async (content: string) => {
//     if (!user) {
//       setError("You must be logged in to comment");
//       return null;
//     }

//     if (!postId) {
//       setError("Post ID is required");
//       return null;
//     }

//     try {
//       // Add the comment
//       const docRef = await addDoc(collection(firestore, 'comments'), {
//         postId,
//         content,
//         authorId: user.uid,
//         authorName: user.username,
//         createdAt: Timestamp.now(),
//         likeCount: 0,
//         dislikeCount: 0
//       });

//       // Update the post's comment count
//       await updateDoc(doc(firestore, 'posts', postId), {
//         commentCount: increment(1)
//       });

//       const newComment: Comment = {
//         id: docRef.id,
//         postId,
//         content,
//         authorId: user.uid,
//         authorName: user.username,
//         createdAt: new Date(),
//         likeCount: 0,
//         dislikeCount: 0
//       };

//       return newComment;
//     } catch (err) {
//       console.error("Error adding comment:", err);
//       setError("Failed to add comment. Please try again.");
//       return null;
//     }
//   };

//   const deleteComment = async (commentId: string) => {
//     if (!user) return false;
    
//     const comment = comments.find(c => c.id === commentId);
    
//     if (!comment || (comment.authorId !== user.uid && !user.isAdmin)) {
//       setError("You don't have permission to delete this comment");
//       return false;
//     }
    
//     try {
//       await deleteDoc(doc(firestore, 'comments', commentId));
      
//       // Update the post's comment count
//       await updateDoc(doc(firestore, 'posts', postId), {
//         commentCount: increment(-1)
//       });
      
//       return true;
//     } catch (err) {
//       console.error("Error deleting comment:", err);
//       setError("Failed to delete comment. Please try again.");
//       return false;
//     }
//   };

//   return {
//     comments,
//     loading,
//     error,
//     addComment,
//     deleteComment
//   };
// }

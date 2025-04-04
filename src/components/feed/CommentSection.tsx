// src/components/feed/CommentSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, Share2, Zap } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  Timestamp,
  getFirestore
} from 'firebase/firestore';
import { firestore } from '@/lib/firebase';

interface Comment {
  id: string;
  postId?: string;
  text: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
  likes?: number;
  avatar?: string;
}

interface CommentSectionProps {
  postId?: string; // Optional - if provided, will show comments for specific post
  limit?: number;
}

export default function CommentSection({ postId, limit = 3 }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [engagementStats, setEngagementStats] = useState({
    likes: 0,
    dislikes: 0,
    comments: 0,
    shares: 0
  });

  useEffect(() => {
    fetchRecentComments();
    fetchEngagementStats();
  }, [postId]);

  const fetchRecentComments = async () => {
    setLoading(true);
    try {
      let commentsQuery;
      
      if (postId) {
        // If postId is provided, fetch comments for that specific post
        commentsQuery = query(
          collection(firestore, 'comments'),
          orderBy('createdAt', 'desc'),
         // limit(limit)
        );
      } else {
        // Otherwise fetch the most recent comments across all posts
        commentsQuery = query(
          collection(firestore, 'comments'),
          orderBy('createdAt', 'desc'),
         // limit(limit)
        );
      }

      const querySnapshot = await getDocs(commentsQuery);
      const fetchedComments: Comment[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedComments.push({
          id: doc.id,
          postId: data.postId,
          text: data.text,
          authorId: data.authorId,
          authorName: data.authorName || 'Anonymous',
          createdAt: data.createdAt?.toDate() || new Date(),
          likes: data.likes || 0,
          avatar: 'https://res.cloudinary.com/dezvucnpl/image/upload/v1742381846/istockphoto-1288129985-612x612_jvyx9t.jpg' // Using placeholder avatar
        });
      });

      setComments(fetchedComments);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  const fetchEngagementStats = async () => {
    try {
      // For total stats, we'll sum up likes/dislikes from all posts
      // This is a simple implementation - in production you might 
      // want to use aggregation or a dedicated stats document
      const postsQuery = query(
        collection(firestore, 'posts'),
       // limit(100) // Limit to prevent overwhelmingly large queries
      );
      
      const querySnapshot = await getDocs(postsQuery);
      let totalLikes = 0;
      let totalDislikes = 0;
      let totalComments = 0;
      let totalShares = 0;
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        totalLikes += data.likeCount || 0;
        totalDislikes += data.dislikeCount || 0;
        totalComments += data.commentCount || 0;
        // Share count might not exist in your schema
        totalShares += data.shareCount || 0;
      });
      
      setEngagementStats({
        likes: totalLikes,
        dislikes: totalDislikes,
        comments: totalComments,
        shares: totalShares
      });
    } catch (err) {
      console.error("Error fetching engagement stats:", err);
    }
  };

  const getTimeAgo = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div className="space-y-6 text-center">
      {/* AI Summary Section */}
      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Zap size={18} className="text-green-600" />
          <h3 className="text-md font-semibold text-green-800">AI Summary</h3>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">
          No active AI agent
        </p>
        {/* <p className="text-gray-700 text-sm leading-relaxed">
          Recent discussions focus on infrastructure improvements in Nyarugenge,
          with citizens proposing collaborative solutions for road maintenance.
          Community sentiment is primarily positive with concerns about budget allocation.
        </p> */}
      </div>
      
      {/* Recent Comments Section */}
      <div>
        <h3 className="text-md font-semibold mb-3 text-gray-800">Recent Discussions</h3>
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map(comment => (
              <div key={comment.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-all">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <img 
                    src={comment.avatar} 
                    alt={comment.authorName} 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <span className="font-medium text-gray-800">{comment.authorName}</span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span>{getTimeAgo(comment.createdAt)}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <ThumbsUp size={12} /> 
                        <span>{comment.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-gray-500">
            No comments found. Be the first to comment!
          </div>
        )}
        {/* <button className="w-full mt-4 text-green-600 text-sm font-medium hover:text-green-700 transition-all">
          View all comments →
        </button> */}
      </div>
      
      {/* Engagement Stats Section */}
      <div className="pt-2">
        <h3 className="text-md font-semibold mb-3 text-gray-800">Today's Engagement</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 p-3 rounded-lg border border-green-100 flex items-center justify-center gap-3">
            <div className="bg-green-100 rounded-full p-2">
              <ThumbsUp size={18} className="text-green-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-green-600">{engagementStats.likes}</div>
              <div className="text-xs text-gray-500">Likes</div>
            </div>
          </div>
          
          <div className="bg-red-50 p-3 rounded-lg border border-red-100 flex items-center justify-center gap-3">
            <div className="bg-red-100 rounded-full p-2">
              <ThumbsDown size={18} className="text-red-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-red-600">{engagementStats.dislikes}</div>
              <div className="text-xs text-gray-500">Dislikes</div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-center justify-center gap-3">
            <div className="bg-blue-100 rounded-full p-2">
              <MessageCircle size={18} className="text-blue-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-blue-600">{engagementStats.comments}</div>
              <div className="text-xs text-gray-500">Comments</div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 flex items-center justify-center gap-3">
            <div className="bg-purple-100 rounded-full p-2">
              <Share2 size={18} className="text-purple-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-purple-600">{engagementStats.shares}</div>
              <div className="text-xs text-gray-500">Shares</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// // src/components/feed/CommentSection.tsx
// 'use client';

// import { ThumbsUp, ThumbsDown, MessageCircle, Share2, Zap } from 'lucide-react';

// export default function CommentDashboard() {
//   // This would be populated with actual data in a real application
//   const recentComments = [
//     { 
//       id: 1, 
//       author: 'John Karekezi', 
//       avatar: 'https://res.cloudinary.com/dezvucnpl/image/upload/v1742381846/istockphoto-1288129985-612x612_jvyx9t.jpg',
//       preview: 'This is a great initiative! I think we should focus on implementing this in phases.',
//       time: '5 min ago',
//       likes: 8 
//     },
//     { 
//       id: 2, 
//       author: 'Jane Murerwa', 
//       avatar: 'https://res.cloudinary.com/dezvucnpl/image/upload/v1742381846/istockphoto-1288129985-612x612_jvyx9t.jpg',
//       preview: 'I agree with the proposal, but we need to consider the environmental impact as well.',
//       time: '10 min ago',
//       likes: 5 
//     },
//     { 
//       id: 3, 
//       author: 'Robert Muneza', 
//       avatar: 'https://res.cloudinary.com/dezvucnpl/image/upload/v1742381846/istockphoto-1288129985-612x612_jvyx9t.jpg',
//       preview: 'Can we consider an alternative approach that would be more inclusive for elderly residents?',
//       time: '15 min ago',
//       likes: 12 
//     },
//   ];

//   return (
//     <div className="space-y-6 text-center">
//       {/* AI Summary Section */}
//       <div className="bg-green-50 p-4 rounded-lg border border-green-100">
//         <div className="flex items-center justify-center gap-2 mb-3">
//           <Zap size={18} className="text-green-600" />
//           <h3 className="text-md font-semibold text-green-800">AI Summary</h3>
//         </div>
//         <p className="text-gray-700 text-sm leading-relaxed">
//           Recent discussions focus on infrastructure improvements in Nyarugenge,
//           with citizens proposing collaborative solutions for road maintenance.
//           Community sentiment is primarily positive with concerns about budget allocation.
//         </p>
//       </div>
      
//       {/* Recent Comments Section */}
//       <div>
//         <h3 className="text-md font-semibold mb-3 text-gray-800">Recent Discussions</h3>
//         <div className="space-y-4">
//           {recentComments.map(comment => (
//             <div key={comment.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-all">
//               <div className="flex items-center justify-center gap-3 mb-2">
//                 <img 
//                   src={comment.avatar} 
//                   alt={comment.author} 
//                   className="w-8 h-8 rounded-full object-cover"
//                 />
//                 <div>
//                   <span className="font-medium text-gray-800">{comment.author}</span>
//                   <div className="flex items-center gap-1 text-xs text-gray-500">
//                     <span>{comment.time}</span>
//                     <span>•</span>
//                     <div className="flex items-center gap-1">
//                       <ThumbsUp size={12} /> 
//                       <span>{comment.likes}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <p className="text-sm text-gray-700">{comment.preview}</p>
//             </div>
//           ))}
//         </div>
//         <button className="w-full mt-4 text-green-600 text-sm font-medium hover:text-green-700 transition-all">
//           View all comments →
//         </button>
//       </div>
      
//       {/* Engagement Stats Section */}
//       <div className="pt-2">
//         <h3 className="text-md font-semibold mb-3 text-gray-800">Today's Engagement</h3>
//         <div className="grid grid-cols-2 gap-3">
//           <div className="bg-green-50 p-3 rounded-lg border border-green-100 flex items-center justify-center gap-3">
//             <div className="bg-green-100 rounded-full p-2">
//               <ThumbsUp size={18} className="text-green-600" />
//             </div>
//             <div>
//               <div className="text-xl font-bold text-green-600">254</div>
//               <div className="text-xs text-gray-500">Likes</div>
//             </div>
//           </div>
          
//           <div className="bg-red-50 p-3 rounded-lg border border-red-100 flex items-center justify-center gap-3">
//             <div className="bg-red-100 rounded-full p-2">
//               <ThumbsDown size={18} className="text-red-600" />
//             </div>
//             <div>
//               <div className="text-xl font-bold text-red-600">32</div>
//               <div className="text-xs text-gray-500">Dislikes</div>
//             </div>
//           </div>
          
//           <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-center justify-center gap-3">
//             <div className="bg-blue-100 rounded-full p-2">
//               <MessageCircle size={18} className="text-blue-600" />
//             </div>
//             <div>
//               <div className="text-xl font-bold text-blue-600">128</div>
//               <div className="text-xs text-gray-500">Comments</div>
//             </div>
//           </div>
          
//           <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 flex items-center justify-center gap-3">
//             <div className="bg-purple-100 rounded-full p-2">
//               <Share2 size={18} className="text-purple-600" />
//             </div>
//             <div>
//               <div className="text-xl font-bold text-purple-600">47</div>
//               <div className="text-xs text-gray-500">Shares</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


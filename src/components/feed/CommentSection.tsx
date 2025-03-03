// src/components/feed/CommentSection.tsx
'use client';

import { ThumbsUp, ThumbsDown, MessageCircle, Share2, Zap } from 'lucide-react';

export default function CommentDashboard() {
  // This would be populated with actual data in a real application
  const recentComments = [
    { 
      id: 1, 
      author: 'John Doe', 
      avatar: '/api/placeholder/40/40',
      preview: 'This is a great initiative! I think we should focus on implementing this in phases.',
      time: '5 min ago',
      likes: 8 
    },
    { 
      id: 2, 
      author: 'Jane Smith', 
      avatar: '/api/placeholder/40/40',
      preview: 'I agree with the proposal, but we need to consider the environmental impact as well.',
      time: '10 min ago',
      likes: 5 
    },
    { 
      id: 3, 
      author: 'Robert Johnson', 
      avatar: '/api/placeholder/40/40',
      preview: 'Can we consider an alternative approach that would be more inclusive for elderly residents?',
      time: '15 min ago',
      likes: 12 
    },
  ];

  return (
    <div className="space-y-6">
      {/* AI Summary Section */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={18} className="text-blue-600" />
          <h3 className="text-md font-semibold text-blue-800">AI Summary</h3>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">
          Recent discussions focus on infrastructure improvements in Nyarugenge,
          with citizens proposing collaborative solutions for road maintenance.
          Community sentiment is primarily positive with concerns about budget allocation.
        </p>
      </div>
      
      {/* Recent Comments Section */}
      <div>
        <h3 className="text-md font-semibold mb-3 text-gray-800">Recent Discussions</h3>
        <div className="space-y-4">
          {recentComments.map(comment => (
            <div key={comment.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <img 
                  src={comment.avatar} 
                  alt={comment.author} 
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <span className="font-medium text-gray-800">{comment.author}</span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span>{comment.time}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={12} /> 
                      <span>{comment.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700">{comment.preview}</p>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 text-blue-600 text-sm font-medium hover:text-blue-700 transition-all">
          View all comments →
        </button>
      </div>
      
      {/* Engagement Stats Section */}
      <div className="pt-2">
        <h3 className="text-md font-semibold mb-3 text-gray-800">Today's Engagement</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 p-3 rounded-lg border border-green-100 flex items-center gap-3">
            <div className="bg-green-100 rounded-full p-2">
              <ThumbsUp size={18} className="text-green-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-green-600">254</div>
              <div className="text-xs text-gray-500">Likes</div>
            </div>
          </div>
          
          <div className="bg-red-50 p-3 rounded-lg border border-red-100 flex items-center gap-3">
            <div className="bg-red-100 rounded-full p-2">
              <ThumbsDown size={18} className="text-red-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-red-600">32</div>
              <div className="text-xs text-gray-500">Dislikes</div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-center gap-3">
            <div className="bg-blue-100 rounded-full p-2">
              <MessageCircle size={18} className="text-blue-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-blue-600">128</div>
              <div className="text-xs text-gray-500">Comments</div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 flex items-center gap-3">
            <div className="bg-purple-100 rounded-full p-2">
              <Share2 size={18} className="text-purple-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-purple-600">47</div>
              <div className="text-xs text-gray-500">Shares</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Weekly Activity Chart Placeholder */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
        <h3 className="text-md font-semibold mb-3 text-gray-800">Weekly Activity</h3>
        <div className="h-32 flex items-center justify-center">
          <p className="text-sm text-gray-500">Chart will be displayed here</p>
        </div>
      </div>
    </div>
  );
}


// // src/components/feed/CommentSection.tsx
// 'use client';

// export default function CommentDashboard() {
//   // This would be populated with actual data in a real application
//   const recentComments = [
//     { id: 1, author: 'John Doe', preview: 'This is a great initiative!', time: '5 min ago' },
//     { id: 2, author: 'Jane Smith', preview: 'I agree with the proposal...', time: '10 min ago' },
//     { id: 3, author: 'Robert Johnson', preview: 'Can we consider an alternative?', time: '15 min ago' },
//   ];

//   return (
//     <div className="space-y-4">
//       <div className="mb-4">
//         <h3 className="text-lg font-semibold mb-2">AI Summary</h3>
//         <p className="text-gray-600 text-sm">
//           Recent discussions focus on infrastructure improvements in Area 2,
//           with citizens proposing collaborative solutions for road maintenance.
//         </p>
//       </div>
      
//       <div>
//         <h3 className="text-lg font-semibold mb-2">Recent Comments</h3>
//         <div className="space-y-3">
//           {recentComments.map(comment => (
//             <div key={comment.id} className="p-3 bg-gray-50 rounded">
//               <div className="flex justify-between">
//                 <span className="font-medium">{comment.author}</span>
//                 <span className="text-xs text-gray-500">{comment.time}</span>
//               </div>
//               <p className="text-sm text-gray-600 mt-1">{comment.preview}</p>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       <div className="pt-4">
//         <h3 className="text-lg font-semibold mb-2">Engagement</h3>
//         <div className="grid grid-cols-2 gap-2 text-center">
//           <div className="bg-green-50 p-2 rounded">
//             <div className="text-xl font-bold text-green-600">254</div>
//             <div className="text-xs text-gray-500">Likes Today</div>
//           </div>
//           <div className="bg-red-50 p-2 rounded">
//             <div className="text-xl font-bold text-red-600">32</div>
//             <div className="text-xs text-gray-500">Dislikes Today</div>
//           </div>
//           <div className="bg-blue-50 p-2 rounded">
//             <div className="text-xl font-bold text-blue-600">128</div>
//             <div className="text-xs text-gray-500">Comments Today</div>
//           </div>
//           <div className="bg-purple-50 p-2 rounded">
//             <div className="text-xl font-bold text-purple-600">47</div>
//             <div className="text-xs text-gray-500">Shares Today</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
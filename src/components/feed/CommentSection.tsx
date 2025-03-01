
// src/components/feed/CommentSection.tsx
'use client';

export default function CommentDashboard() {
  // This would be populated with actual data in a real application
  const recentComments = [
    { id: 1, author: 'John Doe', preview: 'This is a great initiative!', time: '5 min ago' },
    { id: 2, author: 'Jane Smith', preview: 'I agree with the proposal...', time: '10 min ago' },
    { id: 3, author: 'Robert Johnson', preview: 'Can we consider an alternative?', time: '15 min ago' },
  ];

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">AI Summary</h3>
        <p className="text-gray-600 text-sm">
          Recent discussions focus on infrastructure improvements in Area 2,
          with citizens proposing collaborative solutions for road maintenance.
        </p>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Recent Comments</h3>
        <div className="space-y-3">
          {recentComments.map(comment => (
            <div key={comment.id} className="p-3 bg-gray-50 rounded">
              <div className="flex justify-between">
                <span className="font-medium">{comment.author}</span>
                <span className="text-xs text-gray-500">{comment.time}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{comment.preview}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pt-4">
        <h3 className="text-lg font-semibold mb-2">Engagement</h3>
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-green-50 p-2 rounded">
            <div className="text-xl font-bold text-green-600">254</div>
            <div className="text-xs text-gray-500">Likes Today</div>
          </div>
          <div className="bg-red-50 p-2 rounded">
            <div className="text-xl font-bold text-red-600">32</div>
            <div className="text-xs text-gray-500">Dislikes Today</div>
          </div>
          <div className="bg-blue-50 p-2 rounded">
            <div className="text-xl font-bold text-blue-600">128</div>
            <div className="text-xs text-gray-500">Comments Today</div>
          </div>
          <div className="bg-purple-50 p-2 rounded">
            <div className="text-xl font-bold text-purple-600">47</div>
            <div className="text-xs text-gray-500">Shares Today</div>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect, useRef } from 'react';
import { auth, firestore } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

interface Message {
  id: string;
  text: string;
  uid: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
}

export default function ForumPage() {
  const [user, loading] = useAuthState(auth);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle authentication and redirection
  useEffect(() => {
    // Only redirect if we're sure the user is not logged in (loading is complete)
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Fetch messages from Firestore
  useEffect(() => {
    // Don't try to fetch messages if we're still loading auth state or user is not logged in
    if (loading || !user) return;

    const q = query(collection(firestore, 'forum'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages: Message[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        fetchedMessages.push({
          id: doc.id,
          text: data.text,
          uid: data.uid,
          displayName: data.displayName,
          photoURL: data.photoURL,
          createdAt: data.createdAt?.toDate() || new Date(),
        });
      });
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [user, loading, router]);

  // Scroll to the bottom of the chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    try {
      await addDoc(collection(firestore, 'forum'), {
        text: message,
        uid: user.uid,
        displayName: user.displayName || 'Anonymous',
        photoURL: user.photoURL || null,
        createdAt: serverTimestamp(),
      });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Show loading state while auth is being determined
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="spinner h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render the main content until we're sure the user is logged in
  if (!user) {
    return <div className="text-center py-8">Please log in to access the forum</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex items-center mb-4 mt-4 ml-4 hover:text-green-500">
        <button
          onClick={() => router.back()}
          className="flex items-center text-primary-dark hover:text-primary"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Back
        </button>
      </div>
      {/* Header */}
      <header className="bg-green-500 text-white p-4">
        <h1 className="text-2xl font-bold text-center">Community Forum</h1>
      </header>

      {/* Chat Container */}
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {/* Messages */}
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.uid === user.uid ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs ${
                    msg.uid === user.uid
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {msg.photoURL && (
                      <img
                        src={msg.photoURL}
                        alt={msg.displayName}
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    <span className="font-semibold">{msg.displayName}</span>
                  </div>
                  <p className="mt-1">{msg.text}</p>
                  <span className="text-xs text-gray-300 block mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Message Input */}
      <footer className="bg-white p-4 shadow-lg">
        <form onSubmit={handleSendMessage} className="max-w-2xl mx-auto flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}

// // src/app/forum/page.tsx
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { auth, firestore } from '@/lib/firebase';
// import { addDoc, collection, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useRouter } from 'next/navigation';

// interface Message {
//   id: string;
//   text: string;
//   uid: string;
//   displayName: string;
//   photoURL?: string;
//   createdAt: Date;
// }

// export default function ForumPage() {
//   const [user] = useAuthState(auth);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState<Message[]>([]);
//   const router = useRouter();
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Fetch messages from Firestore
//   useEffect(() => {
//     if (!user) {
//       router.push('/login');
//       return;
//     }

//     const q = query(collection(firestore, 'forum'), orderBy('createdAt', 'asc'));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const fetchedMessages: Message[] = [];
//       snapshot.forEach((doc) => {
//         const data = doc.data();
//         fetchedMessages.push({
//           id: doc.id,
//           text: data.text,
//           uid: data.uid,
//           displayName: data.displayName,
//           photoURL: data.photoURL,
//           createdAt: data.createdAt.toDate(),
//         });
//       });
//       setMessages(fetchedMessages);
//     });

//     return () => unsubscribe();
//   }, [user, router]);

//   // Scroll to the bottom of the chat
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   // Handle sending a message
//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!message.trim() || !user) return;

//     try {
//       await addDoc(collection(firestore, 'forum'), {
//         text: message,
//         uid: user.uid,
//         displayName: user.displayName || 'Anonymous',
//         photoURL: user.photoURL || null,
//         createdAt: serverTimestamp(),
//       });
//       setMessage('');
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   if (!user) {
//     return <div className="text-center py-8">Redirecting to login...</div>;
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-green-500 text-white p-4">
//         <h1 className="text-2xl font-bold text-center">Community Forum</h1>
//       </header>

//       {/* Chat Container */}
//       <main className="flex-1 p-4 overflow-y-auto">
//         <div className="max-w-2xl mx-auto">
//           {/* Messages */}
//           <div className="space-y-4">
//             {messages.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`flex ${msg.uid === user.uid ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div
//                   className={`p-3 rounded-lg max-w-xs ${
//                     msg.uid === user.uid
//                       ? 'bg-green-500 text-white'
//                       : 'bg-white text-gray-800'
//                   }`}
//                 >
//                   <div className="flex items-center gap-2">
//                     {msg.photoURL && (
//                       <img
//                         src={msg.photoURL}
//                         alt={msg.displayName}
//                         className="w-6 h-6 rounded-full"
//                       />
//                     )}
//                     <span className="font-semibold">{msg.displayName}</span>
//                   </div>
//                   <p className="mt-1">{msg.text}</p>
//                   <span className="text-xs text-gray-300 block mt-1">
//                     {new Date(msg.createdAt).toLocaleTimeString()}
//                   </span>
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//         </div>
//       </main>

//       {/* Message Input */}
//       <footer className="bg-white p-4 shadow-lg">
//         <form onSubmit={handleSendMessage} className="max-w-2xl mx-auto flex gap-2">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//           <button
//             type="submit"
//             className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//           >
//             Send
//           </button>
//         </form>
//       </footer>
//     </div>
//   );
// }
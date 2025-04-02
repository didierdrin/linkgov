// src/components/feed/AddPostDialog.tsx
'use client';

import { useState, useRef } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, auth, storage } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface AddPostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPostAdded: () => void;
}

// Areas in Rwanda
const areas = [
  'Gasabo',
    'Nyarugenge',
     'Kicukiro',
     'Kamonyi'
];

// Government ministries
const governmentMinistries = [
  "Common",
  "Ministry of Education",
  "Ministry of Health",
  "Ministry of Finance",
  "Ministry of Energy",
  "Ministry of Agriculture",
  "Ministry of Transport",
  "Ministry of Communications and Digitalization",
  "Ministry of Defence",
  "Ministry of Interior",
  "Ministry of Lands and Natural Resources",
  "Ministry of Tourism, Arts and Culture",
  "Ministry of Trade and Industry",
  "Ministry of Works and Housing",
  "Ministry of Environment, Science, Technology and Innovation",
  "Ministry of Gender, Children and Social Protection",
  "Ministry of Foreign Affairs and Regional Integration"
];

export default function AddPostDialog({ isOpen, onClose, onPostAdded }: AddPostDialogProps) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [area, setArea] = useState('');
  const [ministry, setMinistry] = useState('Common');
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) return '';
    
    try {
      setIsUploading(true);
      const storageRef = ref(storage, `post-images/${Date.now()}-${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(storageRef);
      setIsUploading(false);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsUploading(false);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title || !description) {
      setError('Title and description are required.');
      return;
    }

    if (!area) {
      setError('Please select an area.');
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        router.push('/login');
        return;
      }

      let finalImgUrl = imgUrl;
      if (imageFile) {
        finalImgUrl = await uploadImage();
      }

      await addDoc(collection(firestore, 'posts'), {
        title,
        subtitle,
        description,
        imgUrl: finalImgUrl,
        area,
        ministry,
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
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
            <label htmlFor="area" className="block mb-1 font-medium">Area:</label>
            <select
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="" disabled>Select an area</option>
              {areas.map((areaOption) => (
                <option key={areaOption} value={areaOption}>
                  {areaOption}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="ministry" className="block mb-1 font-medium">Ministry:</label>
            <select
              id="ministry"
              value={ministry}
              onChange={(e) => setMinistry(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              {governmentMinistries.map((ministryOption) => (
                <option key={ministryOption} value={ministryOption}>
                  {ministryOption}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block mb-1 font-medium">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows={4}
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block mb-1 font-medium">Upload Image:</label>
            <input
              type="file"
              id="image"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {imageFile && (
              <p className="text-sm text-green-600 mt-1">
                Selected: {imageFile.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="imgUrl" className="block mb-1 font-medium">
              Or Image URL (optional):
            </label>
            <input
              type="url"
              id="imgUrl"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              disabled={!!imageFile}
            />
            <p className="text-xs text-gray-500 mt-1">
              Either upload an image or provide a URL, not both.
            </p>
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
              disabled={isUploading}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-green-300"
            >
              {isUploading ? 'Uploading...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// // src/components/feed/AddPostDialog.tsx
// 'use client';

// import { useState } from 'react';
// import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
// import { firestore, auth } from '@/lib/firebase';
// import { useRouter } from 'next/navigation';

// interface AddPostDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onPostAdded: () => void;
// }

// export default function AddPostDialog({ isOpen, onClose, onPostAdded }: AddPostDialogProps) {
//   const [title, setTitle] = useState('');
//   const [subtitle, setSubtitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [imgUrl, setImgUrl] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     if (!title || !description) {
//       setError('Title and description are required.');
//       return;
//     }

//     try {
//       const user = auth.currentUser;
//       if (!user) {
//         router.push('/login');
//         return;
//       }

//       await addDoc(collection(firestore, 'posts'), {
//         title,
//         subtitle,
//         description,
//         imgUrl,
//         uid: user.uid,
//         authorName: user.displayName || 'Anonymous',
//         createdAt: serverTimestamp(),
//         likeCount: 0,
//         dislikeCount: 0,
//         commentCount: 0,
//       });

//       onPostAdded(); // Refresh the posts list
//       //window.location.href = "/"
//       onClose(); // Close the dialog
//     } catch (error) {
//       console.error('Error adding post:', error);
//       setError('Failed to add post. Please try again.');
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4">Create a New Post</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="title" className="block mb-1 font-medium">Title:</label>
//             <input
//               type="text"
//               id="title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="subtitle" className="block mb-1 font-medium">Subtitle:</label>
//             <input
//               type="text"
//               id="subtitle"
//               value={subtitle}
//               onChange={(e) => setSubtitle(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-lg"
//             />
//           </div>
//           <div>
//             <label htmlFor="description" className="block mb-1 font-medium">Description:</label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="imgUrl" className="block mb-1 font-medium">Image URL (optional):</label>
//             <input
//               type="url"
//               id="imgUrl"
//               value={imgUrl}
//               onChange={(e) => setImgUrl(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-lg"
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <div className="flex justify-end gap-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//             >
//               Post
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
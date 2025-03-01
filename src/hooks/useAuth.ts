// src/hooks/useAuth.ts
'use client';

import { useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '@/lib/firebase';

interface User {
  uid: string;
  username: string;
  email: string;
  role: string;
  isAdmin: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get additional user data from Firestore
          const userDoc = await getDoc(doc(firestore, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              uid: firebaseUser.uid,
              username: userData.username,
              email: userData.email,
              role: userData.role,
              isAdmin: userData.isAdmin
            });
          } else {
            // Basic user information if Firestore data doesn't exist
            setUser({
              uid: firebaseUser.uid,
              username: firebaseUser.email?.split('@')[0] || 'User',
              email: firebaseUser.email || '',
              role: 'citizen',
              isAdmin: false
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return {
    user,
    loading,
    signOut,
    isAdmin: user?.isAdmin || false,
    isAuthenticated: !!user
  };
}
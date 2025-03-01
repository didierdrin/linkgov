// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
    apiKey: "AIzaSyCbk1GBanPmrEgqQh-QHzQyfEUqAbzfWN0",
    authDomain: "assigurw.firebaseapp.com",
    projectId: "assigurw",
    storageBucket: "assigurw.appspot.com",
    messagingSenderId: "265353996623",
    appId: "1:265353996623:web:c11fd2eac0be18a867bd3a",
    measurementId: "G-6PJZQ04QRC"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
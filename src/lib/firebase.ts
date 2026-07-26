// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMNgRLksOLsqmMSkDJUYZ2brxKVyN5jvY",
  authDomain: "sk-khorrum.firebaseapp.com",
  projectId: "sk-khorrum",
  storageBucket: "sk-khorrum.firebasestorage.app",
  messagingSenderId: "505612505807",
  appId: "1:505612505807:web:aeef44bf2628d7c359ddba",
  measurementId: "G-NTW729MSWP"
};

// Initialize Firebase (prevent re-initialization in Next.js hot reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;

// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPnMfqZoXjshNmhbq2XEaqNaVmhP2qFow",
  authDomain: "sk-kho.firebaseapp.com",
  projectId: "sk-kho",
  storageBucket: "sk-kho.firebasestorage.app",
  messagingSenderId: "575944457714",
  appId: "1:575944457714:web:9f2039f17438ec6bd0ff6b",
  measurementId: "G-6BEFP4Y8X0"
};

// Initialize Firebase (prevent re-initialization in Next.js hot reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMNgRLksOLsqmMSkDJUYZ2brxKVyN5jvY",
  authDomain: "sk-khorrum.firebaseapp.com",
  projectId: "sk-khorrum",
  storageBucket: "sk-khorrum.firebasestorage.app",
  messagingSenderId: "505612505807",
  appId: "1:505612505807:web:aeef44bf2628d7c359ddba",
  measurementId: "G-NTW729MSWP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  try {
    console.log("Fetching blogs...");
    const snapshot = await getDocs(collection(db, "blogs"));
    console.log("Success! Found", snapshot.docs.length, "blogs");
    
    // Test write
    console.log("Attempting test write...");
    await setDoc(doc(db, "blogs", "test-doc"), { test: true });
    console.log("Write success!");
    
    process.exit(0);
  } catch (error) {
    console.error("Firebase Error:", error.message);
    process.exit(1);
  }
}

test();

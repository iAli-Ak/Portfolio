/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
import { collection, addDoc, getDocs } from "@firebase/firestore"; // Perbarui ini


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoqTkTqgAP-J5Cb9mj0ymJrM1UpyPCdjE",
  authDomain: "portofolio-80a0e.firebaseapp.com",
  projectId: "portofolio-80a0e",
  storageBucket: "portofolio-80a0e.firebasestorage.app",
  messagingSenderId: "489945113901",
  appId: "1:489945113901:web:1a6c8311a1cee6f22e9fa4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };
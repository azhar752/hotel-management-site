import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBW-3BozW4cv9MLNx62jc4gv7rLe1uHBQo",
  authDomain: "hotel-management-site-6012e.firebaseapp.com",
  projectId: "hotel-management-site-6012e",
  storageBucket: "hotel-management-site-6012e.firebasestorage.app",
  messagingSenderId: "726964111555",
  appId: "1:726964111555:web:7979bda51094e2c83f7a76",
  measurementId: "G-3FHHSWRPRS",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

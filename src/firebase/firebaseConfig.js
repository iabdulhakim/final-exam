// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCqrAHWKexzYl7OEGLiXsHaQBJXeE-QRtk",
  authDomain: "todo-21-743bb.firebaseapp.com",
  projectId: "todo-21-743bb",
  storageBucket: "todo-21-743bb.appspot.com",
  messagingSenderId: "441695168920",
  appId: "1:441695168920:web:6d8f76ac77ed417a67a3ed",
  measurementId: "G-DJW1KDVMMJ",
  databaseURL:
    "https://todo-21-743bb-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth(app);

// db
export const db = getFirestore(app);

// real time database
export const database = getDatabase(app);

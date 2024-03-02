// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from 'firebase/firestore'; // Corrected import path


const firebaseConfig = {
  apiKey: "AIzaSyAoa6uuOGGsHUYtiAux-XdlkxCFwvTl6_0",
  authDomain: "filmfusion-88b9b.firebaseapp.com",
  projectId: "filmfusion-88b9b",
  storageBucket: "filmfusion-88b9b.appspot.com",
  messagingSenderId: "915841562101",
  appId: "1:915841562101:web:385ed583b4e1b163fadcbc",
  measurementId: "G-P5G8PVLCMQ"
};

const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);
 export const moviesRef = collection(db, "movies");
 export const reviewsRef = collection(db, "reviews");
 export const usersRef = collection(db, "users");
// const analytics = getAnalytics(app);
export default app

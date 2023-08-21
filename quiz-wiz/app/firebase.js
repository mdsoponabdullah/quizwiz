import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMAUgMNiny31O3DGCVPuyvaiQxlI26hqQ",
  authDomain: "quizwiz-28413.firebaseapp.com",
  projectId: "quizwiz-28413",
  storageBucket: "quizwiz-28413.appspot.com",
  messagingSenderId: "840288983975",
  appId: "1:840288983975:web:78064a6be26e060bdaf482",
  measurementId: "G-DCQW72V47S",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getFirestore(app);

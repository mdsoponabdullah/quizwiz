"use client";
import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth, database } from "../firebase";
import { getDoc, doc } from "firebase/firestore";


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider);
  };

  const LogOut = () => {
    setUserData(null)
    signOut(auth);
  };




  const getUserInfo = async () => {
    if (user) {
      const docRef = doc(database, "users", user.uid);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setUserData(docSnap.data());
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [user]);

  useEffect(() => {
    getUserInfo();
  }, [user]);




  return (
    <AuthContext.Provider value={{ user, googleSignIn, LogOut, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

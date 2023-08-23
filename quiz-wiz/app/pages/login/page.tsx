// pages/login.js
"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { UserAuth } from "../../context/AuthContext";
import { auth } from "../../firebase";

import { useRouter } from "next/navigation";

const Login = () => {
  const { user, googleSignIn } = UserAuth();
  const router = useRouter();
  if (user) {
    router.push("/pages/profile");
    localStorage.setItem("login", "true");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInHandler = async () => {
    if (email == "" || password == "") return;
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("login", "true");
    } catch (error) {
      console.error("error Ocured", error);
    }
  };

  const singnInwithGoogle = async () => {
    {
      localStorage.setItem("name", "sopon");
    }
    try {
      const ususerCredentialer = await googleSignIn();

      localStorage.setItem("login", "true");
    } catch (error) {}
    console.log(user);
  };
  return (
    <div className="bg-white p-20  mx-20">
      <h1 className="heading">Sign In</h1>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="w-1/2 m-auto">
          <label htmlFor="email" className="label ">
            UserName/Email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="inputBox1 text-sm"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="w-1/2 m-auto">
          <label htmlFor="password" className="label text-base">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="inputBox1 text-sm"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex items-center justify-center h-full">
          <button
            type="submit"
            onClick={signInHandler}
            className="btn-blue text-[#ffffff] place-items-center center-normal font-bold "
          >
            Submit
          </button>
        </div>
      </form>
      <div className="w-1/2 m-auto">
        <button
          onClick={singnInwithGoogle}
          className="flex text-sm font-bold items-center bg-white rounded-lg p-2 shadow-sm hover:bg-gray-100"
        >
          <img
            className="h-3 w-3 mr-2"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUZ41xgRqqoYaZyBmFhKlQBxgGgUXqsMwWLONoOFBUbg&s"
            alt="Google Icon"
          />
          Sign in with Google
        </button>
      </div>
      <div className="mt-5">
        <h3 className="text-sm font-bold text-center">
          Don't have an Account?{" "}
          <Link
            className="btn-blue  tracking-wider font-bold text-blue bg-[#F9ECD2]"
            href="/pages/signup"
          >
            Sign Up
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default Login;

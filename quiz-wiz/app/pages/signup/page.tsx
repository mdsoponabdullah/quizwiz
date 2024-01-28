// pages/login.js
"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";

import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { UserAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

const Signup = () => {
  const { googleSignIn, user } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("inside signup", user)
      if (user) {

        router.push("/pages/profile");
      }

    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [user]);


  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signupHandler = async () => {
    if (password != confirmPassword) {
      alert("Password does not match.");
    }
    if (email == "" || userName == "" || password == "" || confirmPassword == "") {
      alert("All fields are required.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      await updateProfile(userCredential.user, {
        displayName: userName,
      });

      router.push("/pages/insertInformation");
    } catch (error) {
      console.log("There is an error.", error);
    }
  };

  const singnInwithGoogle = async () => {
    try {
      const userCredential = await googleSignIn();
      //console.log(ususerCredentialer);
      if (userCredential) {
        localStorage.setItem("login", "true");
      }

      router.push("/pages/profile");
    } catch (error) {
      console.error("There is an error.", error);
      alert("This email already has an account.");
    }
  };

  return (
    <div className="bg-white p-20  mx-20 bg-[#E2E2F0] mt-20 ">
      <h1 className="heading">Sign Up</h1>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="w-1/2 m-auto">
          <label htmlFor="text" className="label">
            Username
          </label>
          <input
            type="text"
            id="text"
            className="inputBox1"
            placeholder="Your First Name"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="w-1/2 m-auto">
          <label htmlFor="email" className="label ">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="inputBox1"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="w-1/2 m-auto">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="inputBox1"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="w-1/2 m-auto">
          <label htmlFor="password" className="label">
            Confirm Password
          </label>
          <input
            type="password"
            id="password"
            className="inputBox1"
            placeholder="Enter your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center h-full">
          <button
            type="submit"
            onClick={signupHandler}
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
          Already have an Account?{" "}
          <Link
            className="btn-blue  tracking-wider font-bold text-blue bg-[#F9ECD2]"
            href="/pages/login"
          >
            Sign In
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default Signup;

// pages/login.js
"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";

import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { UserAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

const Signup = () => {
  const { user, googleSignIn } = UserAuth();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const signupHandler = async () => {
    alert(firstName);
    if (password1 != password2) {
      alert("Password is not mached");
    }
    if (
      firstName == "" ||
      lastName == "" ||
      email == "" ||
      userName == "" ||
      password1 == "" ||
      password2 == ""
    )
      return;

    try {
      const ususerCredentialer = await createUserWithEmailAndPassword(
        auth,
        email,
        password1
      );
      console.log(ususerCredentialer);
      await updateProfile(ususerCredentialer.user, {
        displayName: userName,
      });

      router.push("/pages/insertInformation");
    } catch (error) {
      console.log("error occured", error);
    }
  };

  const singnInwithGoogle = async () => {
    try {
      const ususerCredentialer = await googleSignIn();
      //console.log(ususerCredentialer);

      router.push("/pages/insertInformation");
    } catch (error) {
      console.error("error occured", error);
    }
  };

  return (
    <div className="bg-white p-20  mx-20">
      <h1 className="heading">Sign Up</h1>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex space-x-20">
          <div className="mr-2">
            <label htmlFor="text" className="label">
              First Name
            </label>
            <input
              type="text"
              id="text"
              className="inputBox1 pr-10"
              placeholder="Your First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="text" className="label ">
              Last Name
            </label>
            <input
              type="text"
              id="text"
              className="inputBox1 pr-10"
              placeholder="Your Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div>
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

        <div>
          <label htmlFor="text" className="label ">
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
        <div>
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="inputBox1"
            placeholder="Enter your password"
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="label">
            Confirm Password
          </label>
          <input
            type="password"
            id="password"
            className="inputBox1"
            placeholder="Enter your password"
            onChange={(e) => setPassword2(e.target.value)}
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
      <div>
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

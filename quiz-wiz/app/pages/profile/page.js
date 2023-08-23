"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { database } from "../../firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import Popup from "../../component/updateUserInfo";
import Loading from "../../component/loading";
import ImageUploadModal from "../../component/uploadimage";

import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const { user } = UserAuth();
  const [loding, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [uploadImage, setUploadImage] = useState(true);

  //// page purapuri hoyar por user login/logout check korar jonno

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 4000));
      setLoading(false);
    };
    checkAuthentication();
    console.log("profile page", user);

    getData();
  }, [user]);

  const getData = async () => {
    if (user) {
      const docRef = doc(database, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());

        const abc = docSnap.data();
        console.log(typeof abc);

        if (abc) {
          setUserData(abc);

          //alert(userData.firstName);
        }
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  };

  if (userData.firstName && user)
    return (
      <div className="overflow-hidden mt-10">
        <div className="container mx-auto my-5 p-5 bg-[#F3E1BD]">
          <div className="md:flex no-wrap md:-mx-2 ">
            {/* Left Side */}
            <div className="w-full md:w-3/12 md:mx-2">
              {/* Profile Card */}
              <div className="bg-white p-3 border-green-400">
                <div className="image overflow-hidden">
                  {loding ? (
                    <Loading />
                  ) : (
                    <img
                      alt={`${user.displayName}'s Profile Photo`}
                      src={userData.imgUrl ? userData.imgUrl : user.photoURL}
                      className="rounded-full"
                      width={300}
                      height={300}
                    />
                  )}
                </div>
                <div>{uploadImage && <ImageUploadModal />}</div>
                <h1 className="text-gray-900 font-bold text-xl leading-8  text-center text-blue">
                  {userData.firstName + " " + userData.lastName}
                </h1>
                <h3 className="text-gray-700 text-base text-semibold leading-6  text-center">
                  {userData.profesion}
                </h3>
                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6  text-center">
                  {userData.discription}
                </p>
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                        Active
                      </span>
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto">{userData.joinDate}</span>
                  </li>
                </ul>
              </div>
              {/* End of profile card */}
              <div className="my-4" />
            </div>
            {/* Right Side */}
            <div className="w-full md:w-9/12 mx-2 h-64">
              {/* Profile tab */}
              {/* About Section */}
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="text-right">
                  {userData.firstName ? (
                    <Popup
                      firstName={userData.firstName}
                      lastName={userData.lastName}
                      gender={userData.gender}
                      contactNumber={userData.contactNumber}
                      parmanentAddress={userData.parmanentAddress}
                      email={userData.email}
                      dateOfBirth={userData.dateOfBirth}
                      currentAddress={userData.currentAddress}
                      uid={user.uid}
                      profesion={userData.profesion}
                      discription={userData.discription}
                    />
                  ) : (
                    <Link className="btn-blue" href="/pages/insertInformation">
                      Your Information
                    </Link>
                  )}
                </div>
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide ">About </span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">First Name</div>
                      <div className="px-4 py-2">{userData.firstName}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Last Name</div>
                      <div className="px-4 py-2">{userData.lastName}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Gender</div>
                      <div className="px-4 py-2">{userData.gender}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Contact No.</div>
                      <div className="px-4 py-2">{userData.contactNumber}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Current Address
                      </div>
                      <div className="px-4 py-2">{userData.currentAddress}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Permanant Address
                      </div>
                      <div className="px-4 py-2">
                        {userData.parmanentAddress}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email.</div>
                      <div className="px-4 py-2">
                        <a
                          className="text-blue-800"
                          href="mailto:jane@example.com"
                        >
                          {userData.email}
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Birthday</div>
                      <div className="px-4 py-2">{userData.dateOfBirth}</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End of about section */}
              <div className="my-4" />

              {/* End of profile tab */}
            </div>
          </div>
        </div>
      </div>
    );
  else {
    <Loading />;
  }
};

export default Page;

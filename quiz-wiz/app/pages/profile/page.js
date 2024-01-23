"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";

import Popup from "../../component/updateUserInfo";
import Loading from "../../component/loading";
import UploadImage from "../../component/uploadprofileimage";
import ContestStatitics from "../../component/contestStatistics";
import BarChart from "../../component/BarChart";
import { useRouter } from "next/navigation";

import Link from "next/link";

const Page = () => {
  const { user, userData } = UserAuth();
  const [loding, setLoading] = useState(true);

  const router = useRouter();


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!user) router.push("/pages/login");

      else if (!userData) {
        router.push("/pages/insertInformation");

      }

    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);


  const [skill, setSkill] = useState("");

  //// page purapuri hoyar por user login/logout check korar jonno

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 4000));
      setLoading(false);
    };
    checkAuthentication();
    console.log("profile page", user);
    if (userData) {
      let fLen = userData.skill.length;
      let text = "";

      for (let i = 0; i < fLen; i++) {
        text += userData.skill[i] + "  ";
      }

      setSkill(text);
    }
  }, [user, userData]);

  let score = [];
  let contestNumbers = [];
  let contestTitle = [];
  let i = 1;

  if (userData) {
    userData.virtualContestStatistics.map((item) => {
      score.push(item.score);
      contestTitle.push(item.contestTitle);

      contestNumbers.push(i++);
    });
  }

  const data = {
    score: score,
    contestTitle: contestTitle,
  };

  if (userData)
    return (
      <div className="overflow-hidden mt-10 mx-16">
        <div className=" container mx-auto my-5 p-5 bg-[#e2e2f0] h-[700px]">
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
                      className="w-[200px] h-[200px] rounded-full ring-4  m-auto right-4"
                    />
                  )}
                </div>

                <h1 className="text-gray-900 font-bold text-xl leading-8  text-center text-blue">
                  {userData.firstName + " " + userData.lastName}
                </h1>
                <h3 className="text-gray-700 text-base text-semibold leading-6  text-center">
                  {userData.profesion}
                </h3>
                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6  text-center">
                  {userData.discription}
                </p>
                {/* <div className="w-44  m-auto ">
                  <h1 className="text-left font-bold border-b w-8/13">Skill</h1>
                  <p>{skill}</p>
                </div> */}
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700  py-2 px-3 mt-3 divide-y rounded ">
                  <li className="flex items-center text-base py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      <span className="bg-green-500 py-1 px-2 rounded text-white text-base">
                        Active
                      </span>
                    </span>
                  </li>
                  <li className="flex space-x-1 items-center py-3 text-base">
                    <p>Member since</p>
                    <p className="ml-auto text-base">{userData.joinDate}</p>
                  </li>
                </ul>
              </div>
              {/* End of profile card */}
              <div className="my-4" />
            </div>
            {/* Right Side */}
            <div className="w-full md:w-9/12 mx-2 h-64">
              {/* Profile tab */}
              {/* upload image and edit profile */}
              <div className="mb-10">
                <div className="flex  float-right space-x-5 ">
                  <div>
                    <UploadImage />
                  </div>

                  <div>
                    {" "}
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
                      <Link
                        className="btn-blue"
                        href="/pages/insertInformation"
                      >
                        Emter Your Information
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              {/*End upload image and edit profile */}

              {/* About Section */}
              <div className="bg-white p-3 shadow-sm rounded-sm">
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
                  <span className="tracking-wide text-blue  text-2xl">About </span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="textStyle1">First Name</div>
                      <div className="textStyle1">{userData.firstName}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="textStyle1">Last Name</div>
                      <div className="textStyle1">{userData.lastName}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="textStyle1">Gender</div>
                      <div className="textStyle1">{userData.gender}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="textStyle1">Contact No.</div>
                      <div className="textStyle1">{userData.contactNumber}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="textStyle1">
                        Current Address
                      </div>
                      <div className="textStyle1">{userData.currentAddress}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="textStyle1">
                        Permanant Address
                      </div>
                      <div className="textStyle1">
                        {userData.parmanentAddress}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="textStyle1">Email.</div>
                      <div className="textStyle1">
                        <a
                          className="text-blue-800 textStyle1"
                          href="mailto:jane@example.com"
                        >
                          {userData.email}
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="textStyle1">Birthday</div>
                      <div className="textStyle1">{userData.dateOfBirth}</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End of about section */}
              <div className="my-4" />

              {/* End of profile tab */}
              <ContestStatitics
                score={score}
                contestNumbers={contestNumbers}
                virtualContestStatistics={userData.virtualContestStatistics}
              />
              {/* <ContestStatitics
                score={score}
                contestNumbers={contestNumbers}
                virtualContestStatistics={userData.virtualContestStatistics}
              /> */}
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

"use client";
import React, { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import { database } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Loading from "../../component/loading";

const Page = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContacNumber] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [parmanentAddress, setParmanentAddress] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profesion, setProfesion] = useState("");
  const [discription, setDiscription] = useState("");
  const [loding, setLoading] = useState(true);
  const [check, setCheck] = useState(false);
  const router = useRouter();
  const { user, userData } = UserAuth();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!user) {
        router.push("/pages/login");
      }
      else if (userData) {
        console.log(userData)
        router.push("/pages/profile");

      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [user]);

  const getUserInfo = async () => {
    if (user) {
      const userIfoRef = doc(database, "users", user.uid);
      const userInfo = await getDoc(userIfoRef);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
      //console.log(user);
    };
    checkAuthentication();
    getUserInfo();
  }, [user]);

  const addUserData = async (e) => {
    e.preventDefault();

    const date = new Date();

    const data = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      contactNumber: contactNumber,
      currentAddress: currentAddress,
      parmanentAddress: parmanentAddress,
      email: email,
      dateOfBirth: dateOfBirth,
      skill: [],
      virtualContestStatistics: [],
      liveContestStatistics: [],
      discription: discription,
      profesion: profesion,
      joinDate: date.toDateString(),
    };

    if (user) {
      await setDoc(doc(database, "users", user.uid), data).then(() => {
        alert("Data are added");
        router.push("/pages/profile");
        setFirstName("");
        setLastName("");
        setContacNumber("");
        setParmanentAddress("");
        setCurrentAddress("");
        setGender("");
        setEmail("");
        setDateOfBirth("");
        setProfesion("");
        setDiscription("");
      })
        .catch((error) => {
          console.error(error);
        });

    }


  };

  // if (check)
  return (
    <dv className="">
      <div className="flex flex-col items-center mt-20 ">
        <div className=" flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-8 rounded shadow-md  bg-[#e2e2f0] ">
            <h2 className="text-lg font-semibold mb-2">Your Information</h2>
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
                <span className="tracking-wide">About</span>
              </div>
              {user ? (
                <form onSubmit={addUserData}>
                  <div className="text-gray-700">
                    <div className="grid md:grid-cols-2 text-sm">
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          First Name
                        </div>
                        <div className="px-4 py-2">
                          <input
                            value={firstName}
                            type="text"
                            id="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                            className="input1"
                            placeholder="Enter your first name"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Last Name</div>
                        <div className="px-4 py-2">
                          {" "}
                          <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="input1"
                            placeholder="Enter your last name"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Gender</div>
                        <div className="px-4 py-2">
                          {" "}
                          <select
                            onChange={(e) => setGender(e.target.value)}
                            name="gender"
                            className="w-[140px]  px-2 py-[3px] rounded-xl"
                            id="gender"
                            value={gender}
                            form="carform"
                          >
                            <option>select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Contact No.
                        </div>
                        <div className="px-4 py-2">
                          {" "}
                          <input
                            type="text"
                            id="contacNumbe"
                            value={contactNumber}
                            onChange={(e) => setContacNumber(e.target.value)}
                            className="input1"
                            placeholder="Enter your Contact Number"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Current Address
                        </div>
                        <div className="px-4 py-2">
                          <input
                            type="text"
                            id="currentAddress"
                            value={currentAddress}
                            onChange={(e) => setCurrentAddress(e.target.value)}
                            className="input1"
                            placeholder="Enter your current Address"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Permanant Address
                        </div>
                        <div className="px-4 py-2">
                          <input
                            type="text"
                            id="PermanantAddress"
                            value={parmanentAddress}
                            onChange={(e) =>
                              setParmanentAddress(e.target.value)
                            }
                            className="input1"
                            placeholder="Enter your Permanant Address"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Email.</div>
                        <div className="px-4 py-2">
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input1"
                            placeholder="Enter your Email"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Birthday</div>
                        <div className="px-4 py-2">
                          {" "}
                          <input
                            type="date"
                            id="email"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            className="w-[140px]  px-2 py-[1px] rounded-xl"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Profesion</div>
                        <div className="px-4 py-2">
                          <input
                            type="text"
                            id="email"
                            value={profesion}
                            onChange={(e) => setProfesion(e.target.value)}
                            className="input1"
                            placeholder="Enter your Profession"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Description
                        </div>
                        <div className="px-4 py-2">
                          <input
                            type="text"
                            id="email"
                            value={discription}
                            onChange={(e) => setDiscription(e.target.value)}
                            className="input1"
                            placeholder="Enter your Description"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="m-auto text-center mt-6">
                    {" "}
                    <input
                      type="submit"
                      id="submit"
                      className="  px-4 bg-blue font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                      value="submit"
                    />
                  </div>
                </form>
              ) : (
                <h1>loading</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </dv>
  );
  // else {
  //   return <Loading />;
  // }
};

export default Page;

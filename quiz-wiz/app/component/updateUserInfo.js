"use client";
import React, { useState } from "react";

import { database } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const Popup = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [gender, setGender] = useState(props.gender);
  const [contactNumber, setContacNumber] = useState(props.contactNumber);
  const [currentAddress, setCurrentAddress] = useState(props.currentAddress);
  const [parmanentAddress, setParmanentAddress] = useState(
    props.parmanentAddress
  );
  const [email, setEmail] = useState(props.email);
  const [dateOfBirth, setDateOfBirth] = useState(props.dateOfBirth);
  const [profesion, setProfesion] = useState(props.profesion);
  const [discription, setDiscription] = useState(props.discription);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdate = async () => {
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
      discription: discription,
      profesion: profesion,
    };
    const updateRef = doc(database, "users", props.uid);

    await updateDoc(updateRef, data)
      .then(() => {
        alert("updated");
        //isOpen(false)
        setIsOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  };

  return (
    <>
      {" "}
      <button
        onClick={togglePopup}
        className="bg-blue text-base text-[#ffffff] hover:bg-blue-700  font-semibold py-1 px-2 rounded-xl"
      >
        Edit profile
      </button>
      <div className="flex flex-col items-center mt-10 z-50 overflow-hidden ">
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="bg-white p-8 rounded shadow-md bg-[#F3E1BD]">
              <h2 className="text-lg font-semibold mb-2">
                Update your profile
              </h2>
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

                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">First Name</div>
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
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Contact No.</div>
                      <div className="px-4 py-2">
                        {" "}
                        <input
                          type="text"
                          id="contacNumbe"
                          value={contactNumber}
                          onChange={(e) => setContacNumber(e.target.value)}
                          className="input1"
                          placeholder="Enter your Contact Number"
                          required
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
                          required
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
                          onChange={(e) => setParmanentAddress(e.target.value)}
                          className="input1"
                          placeholder="Enter your Permanant Address"
                          required
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
                          required
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
                          required
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
                      <div className="px-4 py-2 font-semibold">Description</div>
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
                <div className="m-auto text-center">
                  {" "}
                  <input
                    onClick={handleUpdate}
                    type="submit"
                    id="submit"
                    className=" mt-5 text-[#ffffff]  text-xm px-4 bg-blue font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                    value="submit"
                  />
                </div>
              </div>
              <button
                onClick={togglePopup}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Popup;

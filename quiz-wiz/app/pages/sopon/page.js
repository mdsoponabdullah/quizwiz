"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { database } from "../../firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import Popup from "../../component/update";

const page = () => {
  const handleUpdate = async () => {
    if (1) {
      const updateRef = doc(database, "users", "fIBCNZQBc2gOWaImF5JxZw0UxjA3");

      const data = {
        firstName: "sopn",
        lastName: "abdullah",
        //   gender: gender,
        //   contactNumber: contactNumber,
        //   currentAddress: currentAddress,
        //   parmanentAddress: parmanentAddress,
        //   email: email,
        //   dateOfBirth: dateOfBirth,
        //   skill: [],
        //   userId: user.uid,
      };
      await updateDoc(updateRef, data)
        .then(() => {
          alert("updated");
          //isOpen(false)
        })
        .catch((error) => {
          alert(error);
          console.error(error);
        });
    }
  };

  return (
    <div className="mt-20">
      <button onClick={handleUpdate}>submit</button>
    </div>
  );
};

export default page;

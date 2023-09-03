"use client";
import React, { useState } from "react";

import { UserAuth } from "../context/AuthContext";
import { storage, database } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

const UploadQuestionImage = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const { user } = UserAuth();
  const [popUp, setPopUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPopUp(true);
    const file = e.target[0]?.files[0];
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };

  const handleUpdate = async () => {
   
  };

  if (user && imgUrl) handleUpdate();

  return (
    <div className="mt-1">
      <div>
        {popUp && (
          <div className="fixed  flex items-center justify-center z-50">
            <div className="absolute "></div>
            <div className="p-6 rounded-lg z-10">
              <div
                className="text-center m-auto"
                style={{ width: `${progresspercent}` }}
              >
                <h1 className="text-blue text-[200px] font-black drop-shadow-lg absolute right-10">
                  {" "}
                  {progresspercent}%
                </h1>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="text-center flex -space-x-10">
        <input type="file" className="text-sm" />
        <button
          type="submit"
          className="btn-blue m-auto text-center font-semibold text-[#ffffff]"
        >
          Change Picture
        </button>
      </form>
    </div>
  );
};

export default UploadQuestionImage;

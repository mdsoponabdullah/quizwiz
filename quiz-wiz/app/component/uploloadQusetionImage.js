"use client";
import React, { useState } from "react";

import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const UploadQuestionImage = ({ setQuestionImage }) => {
  const [progresspercent, setProgresspercent] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

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
          setQuestionImage(downloadURL);
        });
      }
    );
  };

  return (
    <div className="mt-1">
      <form onSubmit={handleSubmit} className="text-center flex -space-x-10">
        <div className="w-full">
          <div className="float-left">
            {" "}
            <input type="file" className="text-sm " />
          </div>
          <div className="float-right">
            <button
              type="submit"
              className="btn-blue m-auto text-center px-12 font-semibold text-[#ffffff]"
            >
              add image
            </button>
          </div>
        </div>
      </form>
      <div className="text-center m-auto">
        {progresspercent != 0 && (
          <h1
            style={{ width: `${progresspercent}` + "%" }}
            className="text-[#ffffff] bg-blue text-[10px] mt-3  rounded-full"
          >
            {progresspercent}%
          </h1>
        )}
      </div>
    </div>
  );
};

export default UploadQuestionImage;

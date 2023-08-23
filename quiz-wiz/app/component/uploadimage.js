"use client";
import React, { useState } from "react";

import { UserAuth } from "../context/AuthContext";
import { storage, database } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

const UploadImage = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const { user } = UserAuth();

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
          setImgUrl(downloadURL);
        });
      }
    );
  };

  const handleUpdate = async () => {
    if (1) {
      const data = {
        imgUrl: imgUrl,
      };
      const updateRef = doc(database, "users", user.uid);

      await updateDoc(updateRef, data)
        .then(() => {
          //alert("updated");
          //isOpen(false)
          window.location.reload();
        })
        .catch((error) => {
          alert(error);
          console.error(error);
        });
    }
  };

  if (user && imgUrl) handleUpdate();

  return (
    <div className="w-1/2 m-auto">
      <form onSubmit={handleSubmit} className="m-auto text-center">
        <input type="file" className="text-sm" />
        <button
          type="submit"
          className="btn-blue m-auto text-center text-[#ffffff]"
        >
          Upload
        </button>
      </form>
      {!imgUrl && (
        <div className="">
          <div
            className="text-center m-auto"
            style={{ width: `${progresspercent}` }}
          >
            {progresspercent}%
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage;

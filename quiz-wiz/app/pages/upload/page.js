import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { storage, database } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

const ImageUploadModal = ({ isOpen, closeModal }) => {
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
          alert("updated");
          closeModal();
        })
        .catch((error) => {
          alert(error);
          console.error(error);
        });
    }
  };

  if (user && imgUrl) handleUpdate();

  return (
    <div>
    <div className={`fixed inset-0 flex justify-center items-center ${isOpen ? "visible" : "invisible"}`}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <form onSubmit={handleSubmit}>
          <input type="file" />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Upload
          </button>
        </form>
        {!imgUrl && (
          <div className="mt-4">
            <div className="h-2 bg-blue-500 rounded" style={{ width: `${progresspercent}%` }} />
            <div className="text-center">{progresspercent}%</div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default ImageUploadModal;

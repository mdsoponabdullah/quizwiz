"use client";
import React, { useState, useEffect } from "react";

import { database } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const page = () => {

  ////////// create collection or table /////////
  const databaseRef = collection(database, "QuizWiz");
  ///////////// End //////////////////////
  const [id, setId] = useState(null);

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");
  const [age, setAge] = useState(null);

  const [firedata, setFiredata] = useState([]);
  const [update, setUpdate] = useState(false);
  const [load, setLoad] = useState(true);

  ///////////////Add Data////////////////////////
  const addData = (e) => {
    e.preventDefault();
    addDoc(databaseRef, {
      name: name,
      description: description,
      age: Number(age),
    })
      .then(() => {
        alert("Data are added");
        setName("");
        setDescription("");
        setAge(null);
        setLoad(!load);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  ///////////////////End//////////////

  //////////Get Data//////////////////

  useEffect(() => {
    setInterval(()=>{},1000)
    getData();
  }, [load]);

  const getData = async () => {
    await getDocs(databaseRef)
      .then((response) => {
        setFiredata(
          response.docs.map((data) => {
            return { ...data.data(), id: data.id };
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  ////////// End ////////////////

  /////////Update data///////////

  const getId = (id, name, age, description) => {
    setId(id);
    setUpdate(true);
    setName(name);
    setAge(age);
    setDescription(description);
  };

  const updateField = (e) => {
    e.preventDefault();
    alert(id);
    const fieldToEdit = doc(database, "QuizWiz", id);
    updateDoc(fieldToEdit, {
      name: name,
      age: Number(age),
      description: description,
    })
      .then(() => {
        alert("updated");
        setName("");
        setDescription("");
        setAge(null);
        setLoad(!load);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  ///////////End ///////////

  //////////Delete Data//////

  const deleteData = (id) => {
    setId(id);
    const fieldToDelete = doc(database, "QuizWiz", id);
    deleteDoc(fieldToDelete)
      .then(() => {
        alert("data hase been deleted");
        setLoad(!load);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-20 m-auto">
      <form
        className="space-x-3 m-auto text-center"
        onSubmit={!update ? addData : updateField}
      >
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="enter name"
        />
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="enter Description"
        />
        <input
          type="number"
          onChange={(e) => setAge(e.target.value)}
          value={age}
          placeholder="enter age"
        />

        <input type="submit" value={!update ? "ADD" : "Update"} />
      </form>

      <div className=" pt-20 m-auto">
        {firedata.map((data) => {
          return (
            <>
              <h1 className="text-left mx-40 ">id :{data.id}</h1>
              <h1 className="text-left mx-40 ">name :{data.name}</h1>
              <h1 className="text-left mx-40 ">age :{data.age}</h1>
              <h1 className="text-left mx-40 ">
                description :{data.description}
              </h1>
              <button
                className="text-left mx-40 btn-blue "
                onClick={() =>
                  getId(data.id, data.name, data.age, data.description)
                }
              >
                update
              </button>

              <button
                className="text-left mx-40 btn-blue "
                onClick={() => deleteData(data.id)}
              >
                delete
              </button>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default page;

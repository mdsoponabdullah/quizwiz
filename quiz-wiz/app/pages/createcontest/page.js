"use client";

import React, { useEffect, useState } from "react";

import { UserAuth } from "../../context/AuthContext";

import { collection, addDoc } from "firebase/firestore";
import { database } from "../../firebase";
import UploadQuestionimage from "../../component/uploloadQusetionImage";
import { useRouter } from "next/navigation";


const page = () => {
  const [contestTitle, setContestTitle] = useState("");
  const [contestCreator, setContestCreator] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [questionDescription, setQuestionDescription] = useState("");
  const [questionExplaination, setQuestionExplaination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [lastRegistationDate, setLastRegistationDate] = useState("");
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [a, setA] = useState("a. ");
  const [b, setB] = useState("b. ");
  const [c, setC] = useState("c. ");
  const [d, setD] = useState("d. ");

  const [correctAns, setCorrectAns] = useState("");
  const [questionImage, setQuestionImage] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [popUp, setPopUp] = useState(false);

  const { user } = UserAuth();
  const router = useRouter()
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!user) {
        router.push("/pages/login");
      }

    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);



  useEffect(() => {
    if (user) {
      setContestCreator(user.uid);
      console.log("contest", user.uid);
    }
  }, [user]);

  const [setsOfmcq, setSetsOfmcq] = useState([]);

  // const [fillInTheBlank, setFillInTheBlank] = useState({
  //   questionNumber: questionNumber,
  //   questionDescription: questionDescription,
  //   corectAns: "",
  // });
  const [setsOfFillInTheBlank, setSetsOfFillInTheBlank] = useState([]);

  const [contest, setContest] = useState({});

  useEffect(() => { }, [setsOfmcq]);

  const addQuestion = (e) => {
    e.preventDefault();
    if (questionDescription == "") {
      alert("Provide Question Description");
      return
    }
    const question = {
      questionNumber: questionNumber,
      questionDescription: questionDescription,
      imageUrl: questionImage,
      a: a,
      b: b,
      c: c,
      d: d,
      correctAns: correctAns,
      questionExplaination: questionExplaination
    };


    setSetsOfmcq([...setsOfmcq, question]);
    setA("a. ");
    setB("b. ");
    setC("c. ");
    setD("d. ");
    setCorrectAns("");
    setQuestionDescription("");
    setQuestionImage(null);
    setQuestionNumber(questionNumber + 1);
    setQuestionExplaination("")

    console.log(setsOfmcq);
  };

  const addQuestionTitle = (e) => {
    e.preventDefault();
  };

  const createContest = async (e) => {
    e.preventDefault();
    if (
      !contestCreator.length &&
      !contestTitle.length &&
      !startDate.length &&
      !endDate.length &&
      !lastRegistationDate.length
    ) {
      alert("Something went wrong.");
      return;
    }


    var date1 = new Date(startDate);
    var date2 = new Date(endDate);
    var duration1 = (date2.getTime() - date1.getTime()) / 60 / 1000;

    const contestObj = {
      contestCreator: contestCreator,
      contestTitle: contestTitle,
      setsOfmcq: setsOfmcq,
      setsOfFillInTheBlank: setsOfFillInTheBlank,
      participantId: [],
      startDate: startDate,
      endDate: endDate,
      lastRegistationDate: lastRegistationDate,
      duration: duration1,
    };
    setContest(contestObj);
    console.log(contest);
    const databaseRef = collection(database, "contest");
    if (contestObj) {
      try {
        await addDoc(databaseRef, contestObj);
        alert("Contest is created");
      } catch (error) {
        console.log(error);
      }
    }

    setContestTitle("");
    setSetsOfFillInTheBlank([]);
    setStartDate("");
    setStartTime("");
    setLastRegistationDate("");
    setDuration(0);
    setQuestionNumber(0);
    router.push("/");
  };

  return (
    <div>
      <div className="mt-20 text-center w-1/3 m-auto">
        {/* add contest discription */}
        <form onSubmit={addQuestionTitle}>
          <label className="label text-left pl-1">Context Title </label>
          <div>
            <input
              className="inputBox1"
              type="text"
              required
              placeholder="context title"
              value={contestTitle}
              onChange={(e) => setContestTitle(e.target.value)}
            />
          </div>
          <label className="label text-left pl-1">Start Date and Time </label>
          <div>
            <input
              className="inputBox1"
              type="datetime-local"
              placeholder="start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <label className="label text-left pl-1">End Date and Time </label>
          <div>
            <input
              className="inputBox1"
              type="datetime-local"
              placeholder="start Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>


          <label className="label text-left pl-1">Last Registation Date </label>
          <div>
            <input
              className="inputBox1"
              type="Datetime-local"
              placeholder="last registation Date"
              value={lastRegistationDate}
              onChange={(e) => setLastRegistationDate(e.target.value)}
            />
          </div>
        </form>

        {/* add mcq question */}

        <div className="mt-20">
          <div className="mt-1">
            <textarea
              className="inputBox1"
              required
              type="text"
              value={questionDescription}
              placeholder={questionNumber
                .toString()
                .concat(". Question Description")}
              onChange={(e) => setQuestionDescription(e.target.value)}
            />
          </div>
          <UploadQuestionimage setQuestionImage={setQuestionImage} />
          <div>
            {questionImage && (
              <img
                alt={"Profile Photo"}
                src={questionImage}
                className="m-auto right-4 overflow-hidden"
              />
            )}
          </div>
        </div>
        <form className="space-y-3" onSubmit={addQuestion}>
          <div className=" text-center">
            <div className="mt-1">
              <input required
                className="inputBox1"
                value={a}
                type="text"
                placeholder="A"
                onChange={(e) => setA(e.target.value)}
              />
            </div>
            <div className="mt-1">
              <input required
                className="inputBox1"
                value={b}
                type="text"
                placeholder="B"
                onChange={(e) => setB(e.target.value)}
              />
            </div>
            <div className="mt-1">
              <input required
                className="inputBox1"
                value={c}
                type="text"
                placeholder="C"
                onChange={(e) => setC(e.target.value)}
              />
            </div>
            <div className="mt-1">
              <input required
                className="inputBox1"
                value={d}
                type="text"
                placeholder="D"
                onChange={(e) => setD(e.target.value)}
              />
            </div>
            <div className="mt-1">
              <select required
                className="inputBox1 "
                onChange={(e) => setCorrectAns(e.target.value)}
                value={correctAns}
              >
                <option>select correct Answer</option>
                <option value={a}>{a}</option>
                <option value={b}>{b}</option>
                <option value={c}>{c}</option>
                <option value={d}>{d}</option>
              </select>
            </div>
            <div className="mt-1">

              <textarea
                value={questionExplaination}
                placeholder="Question Explaination"
                onChange={(e) => setQuestionExplaination(e.target.value)}
                className="inputBox1"
              />
            </div>
          </div>
          <div>
            <input
              type="submit"
              className="btn-blue text-xl m-auto text-center px-12 font-semibold text-[#ffffff]"
              value="Add Question"
            />
          </div>
        </form>
      </div>
      {/*showing contest*/}
      <div className="mt-10 p-8 text-base m-auto w-1/2 border-5 shadow-sm">
        <div className="p-20">
          {" "}
          <h1 className="heading">Preview Contest</h1>
          <h1 className="text-base text-left font-bold tracking-wide text-blue">
            {contestTitle && (
              <span className="text-[#000111] font-semibold">
                Contest title: {contestTitle}
              </span>
            )}
          </h1>
          <h1 className="text-base text-left font-bold tracking-wide text-blue">
            {startDate && (
              <span className="text-[#000111] font-semibold">
                Contest startDate: {startDate}
              </span>
            )}
          </h1>
          <h1 className="text-base text-left font-bold tracking-wide text-blue">
            {startTime && (
              <span className="text-[#000111] font-semibold">
                Contest startTime: {startTime}
              </span>
            )}
          </h1>
          <h1 className="text-base text-left font-bold tracking-wide text-blue">
            {duration != 0 && (
              <span className="text-[#000111] font-semibold">
                Contest duration: {duration}
              </span>
            )}
          </h1>
          <h1 className="text-base text-left font-bold tracking-wide text-blue">
            {lastRegistationDate && (
              <span>Contest lastRegistationDate: {lastRegistationDate}</span>
            )}
          </h1>
        </div>

        <div>
          <div className="max-w-md mx-auto">
            <ul className="divide-y divide-gray-300">
              {setsOfmcq.map((question) => (
                <li key={question.questionNumber} className="py-4">
                  <div className="">
                    <div className="font-semibold">
                      Question {question.questionNumber}.
                    </div>
                    <p className="text-gray-600">
                      {question.questionDescription}
                    </p>

                    {question.imageUrl && (
                      <img
                        alt={"Profile Photo"}
                        src={question.imageUrl}
                        className="m-auto right-4 overflow-hidden"
                      />
                    )}
                  </div>

                  <ol className="pl-6 mt-2">
                    <li> {question.a}</li>
                    <li> {question.b}</li>
                    <li> {question.c}</li>
                    <li> {question.d}</li>
                  </ol>
                  <div className="mt-2 text-sm text-gray-500">
                    Correct Answer: {question.correctAns}
                  </div>
                  {question.questionExplaination && <div className="mt-5">
                    <p className="text-blue text-[17px] font-bold  "> Explanation</p>
                    <p> {question.questionExplaination}</p>
                  </div>}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <form onSubmit={createContest}>
          <input
            type="submit"
            className="btn-blue m-auto text-xl  text-center px-12 font-semibold text-[#ffffff]"
            value="create Contest"
          />
        </form>
      </div>
    </div>
  );
};

export default page;

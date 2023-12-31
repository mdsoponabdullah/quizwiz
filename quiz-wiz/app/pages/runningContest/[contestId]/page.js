"use client";

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../../../firebase";
import { UserAuth } from "../../../context/AuthContext";

const page = ({ params }) => {
  const { user, userData } = UserAuth();

  const [contest, setContest] = useState({});
  const [setsOfmcq, setSetsOfmcq] = useState([]);
  const [countCorectAns, setCountCorectAns] = useState(0);
  const [countWrongAns, setCountWrongAns] = useState(0);
  const [numberOfQuestion, setNumberOfQuestion] = useState(0);
  const [submited, setSubmited] = useState(false);
  const [timer, setTimer] = useState(45);
  const [countSecond, setCountSecond] = useState(60);

  const [questionNumberOfWrongAns, setQuestionNumberOfWrongAns] = useState([]);
  const correct = new Set();
  const wrong = new Set();

  const getContest = async () => {
    const docRef = doc(database, "contest", params.contestId);
    try {
      const doc = await getDoc(docRef);

      if (doc.exists()) {
        if (doc.data()) {
          setContest(doc.data());
          console.log(contest);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContest();
  }, []);

  var getTimer = async () => {
    var date1 = new Date(contest.startDate).getTime();
    var date2 = new Date(contest.endDate).getTime();
    var date = new Date().getTime();
    var duration;
    
     duration = (date2 - date) / 60 / 1000;
    setTimer(--duration);

    var second = countSecond;
    setInterval(() => {
      setCountSecond(second--);
      if (second == 0) {
        if (duration == 0 && second == 0||duration<0) submitTheContest();
        setTimer(--duration);
        second = 60;
      }
    }, 1000);
  };

  useEffect(() => {
    if (contest) {
      console.log(contest);

      getTimer();
    }
  }, [contest]);
  useEffect(() => {
    if (contest) {
      setSetsOfmcq(contest.setsOfmcq);
    }
  }, [contest]);
  useEffect(() => {
    console.log(setsOfmcq);
    if (setsOfmcq) setNumberOfQuestion(setsOfmcq.length);
  }, [setsOfmcq]);

  const submitTheContest = async () => {
    setQuestionNumberOfWrongAns(numberOfQuestion);

    setCountCorectAns(correct.size);

    setCountWrongAns(wrong.size);

    setSubmited(true);
    const virtualContestStatistics = [...userData.virtualContestStatistics];

    const obj = {
      contestTitle: contest.contestTitle,
      date: new Date().toDateString(),
      score: (correct.size / numberOfQuestion) * 100,
      numberOfQuestion: numberOfQuestion,
      correctAns: correct.size,
      wrongAns: wrong.size,
    };
    console.log("befor", virtualContestStatistics);
    virtualContestStatistics.push(obj);
    console.log("after", virtualContestStatistics);

    await updateDoc(doc(database, "users", user.uid), {
      virtualContestStatistics: virtualContestStatistics,
    }).then(() => {
      alert("push data into database");
    });
    console.log("sumited from constesid", virtualContestStatistics);
  };

  const provideAns = (e, correctAns, questionNumber) => {
    var c = false;
    var w = false;
    if (e.target.value == correctAns) {
      correct.add(e.target.value);
      c = true;
    } else {
      wrong.add(questionNumber);
      w = true;
    }
    if (correct.has(correctAns) && wrong.has(questionNumber) && c)
      wrong.delete(questionNumber);
    if (correct.has(correctAns) && wrong.has(questionNumber) && w)
      correct.delete(correctAns);

    // setCountCorectAns(correct.size);
    // setCountWrongAns(wrong.size);
  };

  return (
    <div>
      {!submited && (
        <div className="mt-10 p-8 text-base m-auto w-1/2 border-5 rounder-lg shadow-sm bg-regal-blue">
          <div className="p-2">
            <h1 className="heading  text-blue">Contest</h1>
            <h1 className="text-base text-center font-bold tracking-wide text-blue">
              {contest.contestTitle && (
                <span className="text-[#000111] font-semibold">
                  Contest title: {contest.contestTitle}
                </span>
              )}
            </h1>
            <h1 className="text-base text-center font-bold tracking-wide text-blue">
              {contest.startDate && (
                <span className="text-[#000111] font-semibold">
                  Contest startDate: {contest.startDate}
                </span>
              )}
            </h1>
            <h1 className="text-base text-center font-bold tracking-wide text-blue">
              {contest.startDate && (
                <span className="text-[#000111] font-semibold">
                  Contest endDate: {contest.endDate}
                </span>
              )}
            </h1>
            <h1 className="text-base text-center font-bold tracking-wide text-blue">
              {contest.startTime && (
                <span className="text-[#000111] font-semibold">
                  Contest startTime: {contest.startTime}
                </span>
              )}
            </h1>
            <h1 className="text-base text-center font-bold tracking-wide text-blue">
              {contest.duration !== 0 && (
                <span className="text-[#000111] font-semibold">
                  Contest duration: {contest.duration}
                </span>
              )}
            </h1>
            <h1 className="text-base text-center font-bold tracking-wide">
              {contest.lastRegistationDate && (
                <span className="text-[#000111] font-semibold">
                  Contest lastRegistationDate: {contest.lastRegistationDate}
                </span>
              )}
            </h1>
            <h1 className="text-base text-center font-bold tracking-wide">
              remaining :{" "}
              {isNaN(timer) == false && (
                <span className="text-[#000111] font-semibold">
                  {" "}
                  {parseInt(timer) + ":" + countSecond}
                </span>
              )}
            </h1>
          </div>

          <div>
            <div className="max-w-md mx-auto">
              <ul className="divide-y divide-gray-300">
                {setsOfmcq &&
                  setsOfmcq.map((question) => (
                    <li key={question.questionNumber} className="py-4">
                      <div className="">
                        <div className="font-semibold">
                          Question {question.questionNumber}.
                        </div>
                        <p className="text-gray-600">
                          {question.questionDescription}
                        </p>
                        <div>
                          {question.imageUrl && (
                            <img
                              alt="loading"
                              src={question.imageUrl}
                              className="m-auto right-4"
                            />
                          )}
                        </div>
                      </div>

                      <ol className="pl-6 mt-2">
                        <li>
                          <input
                            type="radio"
                            value={question.a}
                            name={question.questionNumber}
                            onChange={(e) => {
                              provideAns(
                                e,
                                question.correctAns,
                                question.questionNumber
                              );
                            }}
                          />
                          <span className="pb-5"> {question.a}</span>
                        </li>
                        <li>
                          <input
                            type="radio"
                            value={question.b}
                            name={question.questionNumber}
                            onChange={(e) => {
                              provideAns(
                                e,
                                question.correctAns,
                                question.questionNumber
                              );
                            }}
                          />
                          <span className="pb-5"> {question.b}</span>
                        </li>
                        <li>
                          <input
                            type="radio"
                            value={question.c}
                            name={question.questionNumber}
                            onChange={(e) => {
                              provideAns(
                                e,
                                question.correctAns,
                                question.questionNumber
                              );
                            }}
                          />
                          <span className="pb-5"> {question.c}</span>
                        </li>
                        <li>
                          <input
                            type="radio"
                            value={question.d}
                            name={question.questionNumber}
                            onChange={(e) => {
                              provideAns(
                                e,
                                question.correctAns,
                                question.questionNumber
                              );
                            }}
                          />
                          <span className="pb-5"> {question.d}</span>
                        </li>
                      </ol>
                      {/* <div className="mt-2 text-sm text-gray-500">
                      Correct Answer: {question.correctAns}
                    </div> */}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="m-auto text-center">
              <form onSubmit={submitTheContest}>
                <input
                  type="submit"
                  className="btn-blue text-lg text-[#ffffff] text-center"
                  value="submit"
                />
              </form>
            </div>
          </div>
        </div>
      )}
      {submited && (
        <div className="mt-10 p-8 text-base m-auto w-1/2 border-5 rounder-lg shadow-sm bg-regal-blue">
          <h1 className="heading  text-blue">Result</h1>
          <h1 className="text-base text-center font-bold tracking-wide text-blue">
            {
              <span className="text-[#000111] font-semibold">
                Number Of Question: {numberOfQuestion}
              </span>
            }
          </h1>
          <h1 className="text-base text-center font-bold tracking-wide text-blue">
            {
              <span className="text-[#000111] font-semibold">
                Correct Answer: {countCorectAns}
              </span>
            }
          </h1>
          <h1 className="text-base text-center font-bold tracking-wide text-blue">
            {
              <span className="text-[#000111] font-semibold">
                Wrong answer: {countWrongAns}
              </span>
            }
          </h1>
          <h1 className="text-base text-center font-bold tracking-wide text-blue">
            {
              <span className="text-[#000111] font-semibold">
                Not Answered:{numberOfQuestion - countWrongAns - countCorectAns}
              </span>
            }
          </h1>
        </div>
      )}
    </div>
  );
};

export default page;

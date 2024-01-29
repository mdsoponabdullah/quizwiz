"use client";

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../../../firebase";
import { UserAuth } from "../../../context/AuthContext";
import Result from "../../../component/result"

const page = ({ params }) => {
  const { user, userData } = UserAuth();
  const [contest, setContest] = useState({});
  const [setsOfmcq, setSetsOfmcq] = useState([]);
  const [numberOfQuestion, setNumberOfQuestion] = useState(0);
  const [submited, setSubmited] = useState(false);
  const [timer, setTimer] = useState(45);
  const [countSecond, setCountSecond] = useState(60);
  const [setsOfCorrectAnswer, setSetsOfCorrectAnswer] = useState([]);
  const [setsOfWrongAnswer, setSetsOfWrongAnswer] = useState([]);


  const addToSet = (element, x) => {
    if (x == 1)
      setSetsOfCorrectAnswer((prevSet) => [...new Set([...prevSet, element])]);
    else setSetsOfWrongAnswer((prevSet) => [...new Set([...prevSet, element])]);

  };

  const removeFromSet = (element, x) => {
    if (x == 1)
      setSetsOfCorrectAnswer((prevSet) => prevSet.filter((item) => item !== element));
    else setSetsOfWrongAnswer((prevSet) => prevSet.filter((item) => item !== element));
  };
  const isElementInSet = (element, x) => {
    if (x == 1)
      return setsOfCorrectAnswer.includes(element);
    else return setsOfWrongAnswer.includes(element);
  };
  const provideAns = (e, correctAns, questionNumber) => {

    if (correctAns == e.target.value) {
      addToSet(questionNumber, 1);
      if (isElementInSet(questionNumber, 2)) removeFromSet(questionNumber, 2);
    }
    else {
      addToSet(questionNumber, 2);
      if (isElementInSet(questionNumber, 1)) removeFromSet(questionNumber, 1);
    }
    console.log(questionNumber, correctAns, e.target.value);



  };


  useEffect(() => {
    console.log(setsOfCorrectAnswer, setsOfWrongAnswer);
    console.log(setsOfCorrectAnswer.length, setsOfWrongAnswer.length);


  }, [setsOfCorrectAnswer, setsOfWrongAnswer])




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

    duration = (date2 - date1) / 60 / 1000;
    setTimer(duration);

    var second = countSecond;
    setInterval(() => {
      setCountSecond(second--);
      if (second == 0) {
        if (duration == 0 && second == 0 || duration < 0) submitTheContest();
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
    setSubmited(true);
    const virtualContestStatistics = [...userData.virtualContestStatistics];

    const obj = {
      contestTitle: contest.contestTitle,
      date: new Date().toDateString(),
      score: (setsOfCorrectAnswer.length / numberOfQuestion) * 100,
      numberOfQuestion: numberOfQuestion,
      correctAns: setsOfCorrectAnswer.length,
      wrongAns: setsOfWrongAnswer.length,
    };


    virtualContestStatistics.push(obj);


    await updateDoc(doc(database, "users", user.uid), {
      virtualContestStatistics: virtualContestStatistics,
    }).then(() => {
      // alert("push data into database");

    });
  };


  return (
    <div>
      {!submited && (
        <div className="mt-10 p-8 text-base m-auto w-1/2 border-5 rounder-lg shadow-sm bg-[#E2E2F0]">
          <div className="p-2">
            <h1 className="heading  text-blue">Contest</h1>
            <h1 className="text-base text-center font-bold tracking-wide text-blue">
              {contest.contestTitle && (
                <span className="text-[#000111] font-semibold">
                  Contest Title: {contest.contestTitle}
                </span>
              )}
            </h1>
            <h1 className="text-base text-center font-bold tracking-wide text-blue">
              {contest.startDate && (
                <span className="text-[#000111] font-semibold">
                  Contest Starting Time: {contest.startDate}
                </span>
              )}
            </h1>
            <h1 className="text-base text-center font-bold tracking-wide text-blue">
              {contest.startDate && (
                <span className="text-[#000111] font-semibold">
                  Contest Finishing Time: {contest.endDate}
                </span>
              )}
            </h1>
            <h1 className="text-base text-center font-bold tracking-wide text-blue">
              {contest.startTime && (
                <span className="text-[#000111] font-semibold">
                  Contest Starting Time: {contest.startTime}
                </span>
              )}
            </h1>
            <h1 className="text-base text-center font-bold tracking-wide text-blue">
              {contest.duration !== 0 && (
                <span className="text-[#000111] font-semibold">
                  Contest Duration: {contest.duration}
                </span>
              )}
            </h1>
            <h1 className="text-base text-center font-bold tracking-wide">
              {contest.lastRegistationDate && (
                <span className="text-[#000111] font-semibold">
                  Registration Closing Time: {contest.lastRegistationDate}
                </span>
              )}
            </h1>
            <h1 className="text-base text-center font-bold tracking-wide">
              Time Remaining :{" "}
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
                            onClick={(e) => {

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
                  className="btn-blue text-xl text-[#ffffff] text-center"
                  value="submit"
                />
              </form>
            </div>
          </div>
        </div>
      )}
      {submited && (
        <div className="mt-10 p-8 text-base m-auto w-1/2 border-5 rounder-lg shadow-sm bg-[#E2E2F0]">
          <h1 className="heading  text-blue">Result</h1>
          <h1 className="text-base text-center font-bold tracking-wide text-blue">
            {
              <span className="text-[#000111] font-semibold">
                Total Questions: {numberOfQuestion}
              </span>
            }
          </h1>
          <h1 className="text-base text-center font-bold tracking-wide text-blue">
            {
              <span className="text-[#000111] font-semibold">
                Correct Answer: {setsOfCorrectAnswer.length}
              </span>
            }
          </h1>
          <h1 className="text-base text-center font-bold tracking-wide text-blue">
            {
              <span className="text-[#000111] font-semibold">
                Wrong Answer: {setsOfWrongAnswer.length}
              </span>
            }
          </h1>
          <h1 className="text-base text-center font-bold tracking-wide text-blue">
            {
              <span className="text-[#000111] font-semibold">
                Not Answered: {numberOfQuestion - setsOfCorrectAnswer.length - setsOfWrongAnswer.length}
              </span>
            }
          </h1>
          <Result setsOfmcq={setsOfmcq} setsOfCorrectAnswer={setsOfCorrectAnswer} setsOfWrongAnswer={setsOfWrongAnswer} />
        </div>

      )}

    </div>
  );
};

export default page;

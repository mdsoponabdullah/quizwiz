"use client";

import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../../../firebase";

const page = ({ params }) => {
  const [contest, setContest] = useState({});
  const [setsOfmcq, setSetsOfmcq] = useState([]);
  const [countCorectAns, setCountCorectAns] = useState(0);
  const [countWrongAns, setCountWrongAns] = useState(0);
  const [numberOfQuestion, setNumberOfQuestion] = useState(0);
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
    if (contest) console.log(contest);
  }, []);
  useEffect(() => {
    if (contest) {
      setSetsOfmcq(contest.setsOfmcq);
    }
  }, [contest]);
  useEffect(() => {
    console.log(setsOfmcq);
    if (setsOfmcq) setNumberOfQuestion(setsOfmcq.length);
  }, [setsOfmcq]);

  const submitTheContest = () => {
    alert(questionNumberOfWrongAns);
    alert("numberOfQuestion" + numberOfQuestion);
    alert("countCorectAns" + correct.size);
    alert("countWrongAns" + wrong.size);

    console.log(correct);
    console.log(wrong);

    alert("hjhj");
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
      <div className="mt-10 p-8 text-base m-auto w-1/2 border-5 shadow-sm bg-regal-blue">
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
                        <span className="pb-5"> a. {question.a}</span>
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
                        <span className="pb-5"> b. {question.b}</span>
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
                        <span className="pb-5"> c. {question.c}</span>
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
                        <span className="pb-5"> d. {question.d}</span>
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
    </div>
  );
};

export default page;

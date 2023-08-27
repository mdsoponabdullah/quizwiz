"use client";
import React, { useEffect, useState } from "react";
import { database } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

const runningcontest = () => {
  const [contests, setContests] = useState([]);

  const getContest = async () => {
    const dataBaseRef = collection(database, "contest");

    const contestsContainer = [];
    try {
      const getRunnigContest = await getDocs(dataBaseRef);
      getRunnigContest.forEach((doc) => {
        const contest = { contestId: doc.id, contestData: doc.data() };
        // console.log(doc.id, " => ", doc.data());
        contestsContainer.push(contest);
      });
      console.log("sopon", contestsContainer);
    } catch (error) {
      console.log(error);
    }
    setContests(contestsContainer);
    console.log("noyon", contests);
  };
  useEffect(() => {
    getContest();
  }, []);

  return (
    <div className="m-5">
      <h1 className="text-base ml-5 tracking-widest font-semibold">
        Running contest
      </h1>
      <div className=" bg-regal-blue p-5 rounded-2xl ">
        <ul className="list-decimal text-sm font-semibold ">
          {contests.map((contest) => (
            <Link href={"/pages/runningContest/" + contest.contestId}>
              <li key={contest.contestId} className="ml-3">
                {contest.contestData.contestTitle}
              </li>
            </Link>
          ))}
        </ul>

        <span className="text-blue text-sm">See more.....</span>
      </div>
    </div>
  );
};

export default runningcontest;

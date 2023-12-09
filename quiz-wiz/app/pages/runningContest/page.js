"use client";
import React, { useEffect, useState } from "react";
import { database } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

const runningcontest = () => {
  const [contests, setContests] = useState([]);

  const [showAll, setShowAll] = useState(false);

  const handleClick = () => {
    setShowAll(!showAll);
  };

  const getContest = async () => {
    const dataBaseRef = collection(database, "contest");
    var today = new Date();

    const contestsContainer = [];
    try {
      const getRunnigContest = await getDocs(dataBaseRef);

      getRunnigContest.forEach((doc) => {
        var contestDate = new Date(Date.parse(doc.data().startDate));

        // Example string representing time
        var timeString = "03:43";

        // Extracting hour and minute using substring
        var hour = timeString.substring(0, 2);
        var minute = timeString.substring(3);

        console.log(doc.data().startTime);
        console.log(
          +hour,
          today.getHours(),
          +minute,
          today.getMinutes(),
          doc.data().duration
        );

        if (
          (today.getFullYear() == contestDate.getFullYear() &&
            today.getMonth() == contestDate.getMonth() &&
            today.getDay() == contestDate.getDay() &&
            +hour <= today.getHours(),
          +minute <= today.getMinutes())
        ) {
          const contest = { contestId: doc.id, contestData: doc.data() };
          console.log(doc.id, " => ", doc.data());
          contestsContainer.push(contest);
        }
      });
      // let output = employees.filter(employee => employee.department == "IT");
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
          {contests.slice(0, showAll ? contests.length : 4).map((contest) => (
            <Link href={"/pages/runningContest/" + contest.contestId}>
              <li key={contest.contestId} className="ml-3">
                {contest.contestData.contestTitle}
              </li>
            </Link>
          ))}
        </ul>

        {!showAll && (
          <span
            className="text-blue text-sm cursor-pointer "
            onClick={handleClick}
          >
            See more.....
          </span>
        )}

        {showAll && (
          <span
            className="text-blue text-sm cursor-pointer  "
            onClick={handleClick}
          >
            Hide
          </span>
        )}
      </div>
    </div>
  );
};

export default runningcontest;

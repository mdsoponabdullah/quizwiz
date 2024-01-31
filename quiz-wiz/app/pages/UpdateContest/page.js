"use client";

import React, { useEffect, useState } from "react";

import { UserAuth } from "../../context/AuthContext";

import { collection, addDoc, getDoc } from "firebase/firestore";
import { database } from "../../firebase";
import UploadQuestionimage from "../../component/uploloadQusetionImage";



const updateContest = ({ searchParams }) => {


    //const { contestId, contestData } = router.query;
    console.log(searchParams.contestId);
    console.log(searchParams.contestData);

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

    const getContest = async () => {

        const contestRef = doc(database, "contest", searchParams.contestId);
        const contest = await getDoc(contestRef);
        console.log(contest);
        setContestTitle(contest.contestTitle);
        setStartDate(contest.startDate);
        setEndDate(contest.endDate);
        setLastRegistationDate(contest.lastRegistationDate);
    }

    useEffect(() => {
        getContest
    }, [])


    return (
        <div>
            <div className="mt-20 text-center w-1/3 m-auto">
                {/* add contest discription */}
                <form onSubmit={() => { }}>
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


            </div>
            {/*showing contest*/}

        </div>
    );
};

export default updateContest;

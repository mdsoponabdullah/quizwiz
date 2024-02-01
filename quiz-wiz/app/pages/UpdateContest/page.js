"use client";

import React, { useEffect, useState } from "react";

import { UserAuth } from "../../context/AuthContext";

import { collection, setDoc, doc, getDoc } from "firebase/firestore";

import { database } from "../../firebase";
import UploadQuestionimage from "../../component/uploloadQusetionImage";
import { useRouter } from 'next/navigation'

const updateContest = ({ searchParams }) => {



    console.log(searchParams.contestId);


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
    const [contestData, setContestData] = useState(null);
    const [contestId, setContesId] = useState(searchParams.contestId);


    const getContest = async () => {

        const contestRef = doc(database, "contest", contestId);
        const contestSnap = await getDoc(contestRef);

        if (contestSnap.exists()) {


            console.log("contest data", contestSnap.data());
            const contest = contestSnap.data();
            setContestTitle(contest.contestTitle);
            setStartDate(contest.startDate);
            setEndDate(contest.endDate);
            setLastRegistationDate(contest.lastRegistationDate);
            setContestData(contest);

        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    useEffect(() => {
        getContest();
    }, [])



    //////update contest ///
    const router = useRouter();

    const handleUpdateContest = async (e) => {


        e.preventDefault();
        if (

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
        var duration = (date2.getTime() - date1.getTime()) / 60 / 1000;

        const contestObj = {
            contestCreator: contestData.contestCreator,
            contestTitle: contestTitle,
            setsOfmcq: contestData.setsOfmcq,
            setsOfFillInTheBlank: contestData.setsOfFillInTheBlank,
            participantId: [],
            startDate: startDate,
            endDate: endDate,
            lastRegistationDate: lastRegistationDate,
            duration: duration,
        };

        await setDoc(doc(database, "contest", searchParams.contestId), contestObj);


        // setContestTitle("");
        // setSetsOfFillInTheBlank([]);
        // setStartDate("");
        // setStartTime("");
        // setLastRegistationDate("");
        // setDuration(0);
        // setQuestionNumber(0);

        router.push("/");
    };



    return (
        <div>
            <div className="mt-20 text-center w-1/3 m-auto">
                {/* add contest discription */}
                <form onSubmit={handleUpdateContest}>
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

                    <div className="mt-5">
                        <input
                            className="btn-blue"
                            type="submit"
                            value="change"
                        // onClick={updateContest}
                        />
                    </div>
                </form>


            </div>
            {/*showing contest*/}

        </div>
    );
};

export default updateContest;

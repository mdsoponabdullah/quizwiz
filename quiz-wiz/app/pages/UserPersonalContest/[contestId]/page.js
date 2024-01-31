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

   
    useEffect(() => {
        if (contest) {
            setSetsOfmcq(contest.setsOfmcq);
        }
    }, [contest]);
    useEffect(() => {
        console.log(setsOfmcq);
        if (setsOfmcq) setNumberOfQuestion(setsOfmcq.length);
    }, [setsOfmcq]);

    


       


      
   


    return (
        <div>
          
                <div className="mt-10 pt-8 text-base m-auto w-1/2 border-5 rounder-lg shadow-sm bg-[#E2E2F0]">
                    <div className="">
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
                        
                       
                    </div>

                    <div className="text-base m-auto  border-5 rounder-lg shadow-sm bg-[#E2E2F0]">
                   
                   <Result setsOfmcq={setsOfmcq} setsOfCorrectAnswer={setsOfCorrectAnswer} setsOfWrongAnswer={setsOfWrongAnswer} />
               </div>

                </div>
           
          
                
            

        </div>
    );
};

export default page;

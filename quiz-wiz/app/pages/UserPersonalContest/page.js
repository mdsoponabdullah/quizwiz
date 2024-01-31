"use client";
import React, { useEffect, useState } from "react";
import { database } from "../../firebase";
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";

import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";




const page = ({ userId }) => {


    const [contests, setContests] = useState([]);

    const [showAll, setShowAll] = useState(false);

    const handleClick = () => {
        setShowAll(!showAll);
    };

    const getContest = async () => {
        const dataBaseRef = collection(database, "contest");

        const contestsContainer = [];
        try {
            const getRunnigContest = await getDocs(dataBaseRef);

            getRunnigContest.forEach((doc) => {


                if (doc.data().contestCreator == userId) {
                    console.log(doc.data().contestCreator, userId)
                    const contest = { contestId: doc.id, contestData: doc.data() };
                    console.log(doc.id, " => ", doc.data());

                    setContests((prev) => {
                        return [...prev, contest]
                    })

                }
            });

            console.log("", contestsContainer);
        } catch (error) {
            console.log(error);
        }

    };
    useEffect(() => {
        getContest();
    }, []);



    //////////////delete contest/////////////
    const deleteContest = async (contestId) => {

        alert("Are you sure to delete the contest");
        await deleteDoc(doc(database, "contest", contestId));
    }




    return (
        <div className="">
            <h1 className="text-base text-blue ml-5 tracking-widest font-semibold">
                Your Created Contests
            </h1>
            <div className="bg-[#e2e2f0] p-5 rounded-2xl ">
                <ul className="list-decimal text-sm font-semibold ">
                    {contests.slice(0, showAll ? contests.length : 4).map((contest) => (

                        <li key={contest.contestId} className="ml-3 ">


                            <div className="flex">
                                <div className="w-1/2">
                                    <Link href={"/pages/UserPersonalContest/" + contest.contestId} className="linkStyle1" >
                                        {contest.contestData.contestTitle}
                                    </Link>

                                </div>
                                <div className="w-1/4 text-center" >


                                    <Link href={{
                                        pathname: '/pages/UpdateContest', query: {
                                            contestId: contest.contestId, contestData: contest.contestData

                                        }
                                    }} >
                                        <MdEdit className="text-[#4ae23d]   inline-block text-xl" />
                                    </Link>



                                </div>
                                <div className="w-1/4 text-center" >

                                    <button onClick={
                                        () => {
                                            deleteContest(contest.contestId)

                                        }
                                    } >
                                        <MdDelete className="text-[#ff3030]   inline-block text-xl" />

                                    </button>


                                </div>
                            </div>
                        </li>


                    ))}
                </ul>

                {!showAll && (
                    <span
                        className="text-blue text-base cursor-pointer "
                        onClick={handleClick}
                    >
                        See more.....
                    </span>
                )}

                {showAll && (
                    <span
                        className="text-blue text-base cursor-pointer  "
                        onClick={handleClick}
                    >
                        Hide
                    </span>
                )}
            </div>
        </div>
    );
};

export default page;

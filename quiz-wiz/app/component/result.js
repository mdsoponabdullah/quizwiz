

import React from "react";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { FaRegCircle } from "react-icons/fa";



const page = ({ setsOfCorrectAnswer, setsOfWrongAnswer, setsOfmcq }) => {



    return (
        <div>
            <div className="mt-10 p-8 text-base m-auto w-1/2 border-5 rounder-lg shadow-sm bg-[#E2E2F0]">


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
                                            {setsOfCorrectAnswer.includes(question.questionNumber) ? <p className="text-gray-600 text-[#5ed141]">
                                                Your Answer was Correct
                                            </p> : setsOfWrongAnswer.includes(question.questionNumber) ? <p className="text-gray-600 text-[#e73232]">
                                                Your Answer was Wrong
                                            </p> : <p className="text-gray-600 text-[#e73232]">
                                                You did not Answer This Question
                                            </p>}
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

                                                {question.correctAns == question.a ? <span className="pb-5  text-base font-semibold  text-[#5ed141]"> {question.a}  <TiTick className="inline" />
                                                </span> : <span className="pb-5 text-base font-semibold  text-[#e73232] "> {question.a} <RxCross2 className="inline" /> </span>}
                                            </li>
                                            <li>

                                                {question.correctAns == question.b ? <span className="pb-5  text-base font-semibold  text-[#5ed141]"> {question.b}  <TiTick className="inline" />
                                                </span> : <span className="pb-5 text-base font-semibold  text-[#e73232] "> {question.b} <RxCross2 className="inline" /></span>}
                                            </li>
                                            <li>

                                                {question.correctAns == question.c ? <span className="pb-5  text-base font-semibold  text-[#5ed141]"> {question.c}  <TiTick className="inline" />
                                                </span> : <span className="pb-5  text-base font-semibold text-[#e73232] "> {question.c} <RxCross2 className="inline" /> </span>}
                                            </li>
                                            <li>

                                                {question.correctAns == question.d ? <span className="pb-5  text-base font-semibold  text-[#5ed141]"> {question.d} <TiTick className="inline" />
                                                </span> : <span className="pb-5  text-base font-semibold text-[#e73232] "> {question.d}<RxCross2 className="inline" /></span>}
                                            </li>

                                        </ol>
                                        {question.questionExplaination && <div className="mt-5">
                                            <p className="text-blue text-[17px] font-bold  "> Explanation</p>
                                            <p> {question.questionExplaination}</p>
                                        </div>}
                                    </li>
                                ))}
                        </ul>
                    </div>

                </div>
            </div>


        </div>
    );
};

export default page;

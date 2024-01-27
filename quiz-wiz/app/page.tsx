'use client'
import React from "react";
import RunningContest from "./pages/runningContest/page";
import PastContest from "./pages/PastContest/page";
import FrequetlyAsketQuestion from "./component/frequentlyAskedQuestion";
import SectionToUpdateLater from "./component/sectionToUpdateLater";
import UpcomingContest from "./pages/Upcomingcontest/page";
import QuizWizForum from "./component/quizWizForum";
import Slider from "./component/slider"

const page = () => {
  return (
    <div className="mx-8 mt-16 overflow-hidden">
      <div className="w-1/2 float-left">
        <div>
          <RunningContest />
        </div>
        <div>
          <PastContest />
        </div>
        <div>
          <FrequetlyAsketQuestion />
        </div>
        <div>
          <SectionToUpdateLater />
        </div>
      </div>
      <div className="w-1/2 float-right">
        <div>
          <UpcomingContest />
        </div>
        <div>
          <QuizWizForum />
          <Slider />

        </div>
      </div>
    </div>
  );
};

export default page;

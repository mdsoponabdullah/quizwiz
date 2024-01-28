'use client'
import React from "react";
import RunningContest from "./pages/runningContest/page";
import PastContest from "./pages/PastContest/page";
import FrequetlyAsketQuestion from "./component/frequentlyAskedQuestion";
import UpcomingContest from "./pages/Upcomingcontest/page";

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
          {/*  */}
        </div>
      </div>
      <div className="w-1/2 float-right">
        <div>
          <UpcomingContest />
        </div>
        <div>
          <FrequetlyAsketQuestion />

        </div>
      </div>
    </div>
  );
};

export default page;

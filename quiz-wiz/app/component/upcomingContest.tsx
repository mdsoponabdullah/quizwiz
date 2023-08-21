import React from "react";
const UpcomingContest = () => {
  return (
    <div className="m-5">
      <h1 className="text-base ml-5 tracking-widest font-semibold">
        Upcoming contest
      </h1>
      <div className="bg-regal-blue p-5 rounded-2xl ">
        <ul className="text-sm font-semibold ">
          <li className="ml-3">1. Quiz head...</li>
          <li className="ml-3">2. CSECU Quiz...</li>
          <li className="ml-3">3. CSECU Quiz...</li>
          <li className="ml-3">4. CSECU Quiz...</li>
          <li className="ml-3">5. CSECU Quiz...</li>
        </ul>
        <span className="text-blue text-sm">See more.....</span>
      </div>
    </div>
  );
};
export default UpcomingContest;
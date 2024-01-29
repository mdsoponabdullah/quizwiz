// pages/about.js
'use client'
import React from "react";
import Card from "../../component/card";
import { useState, useEffect } from "react";

const About = () => {
  const [currentProfile, setCurrentProfile] = useState(true);

  useEffect(() => {
    // Set up the interval to call the function every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentProfile(!currentProfile);
    }, 5000); // 5000 milliseconds = 5 seconds

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [currentProfile]);

  return (
    <div className="min-h-screen p-8">
      <div className=" bg-[#e2e2f0] mt-20 max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4 text-blue text-center">About Us</h1>
        <div className="flex items-center">
          <div className="w-1/3 " onClick={()=>setCurrentProfile(!currentProfile)}>
            {currentProfile? (
              <Card
                imageSrc="/image/sopon3.jpg"
                name="Md Sopon Abdullah"
                description="Founder of QuizWiz"
                
                
              />
            ) : (
              <Card
                imageSrc="/image/ramim.jpg"
                name="Shoaib Ramim"
                description="Co-Founder of QuizWiz"
              />
            )}
          </div>
          <div className="w-2/3 ml-6">
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id
              justo in magna sagittis euismod. Vestibulum ante ipsum primis in
              faucibus orci luctus et ultrices posuere cubilia curae;
              Suspendisse potenti.
            </p>
            <p className="mt-4 text-gray-700">
              Vestibulum nec erat eu nisl tristique malesuada vitae id nunc. Sed
              euismod, nunc id fermentum congue, libero ipsum condimentum massa,
              id cursus dolor mauris nec tortor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

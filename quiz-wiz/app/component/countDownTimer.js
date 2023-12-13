"use client";
import { useState, useEffect } from "react";

const CountdownTimer = ({ startDate }) => {
  // State variables
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  // Update the count down every 1 second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  // Function to calculate time remaining
  function calculateTimeRemaining() {
    const now = new Date().getTime();
    const distance = startDate - now;

    if (distance < 0) {
      // If the count down is finished, return an object with expired set to true
      return { expired: true };
    }

    // Time calculations for days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Return an object with the calculated time values
    return { days, hours, minutes, seconds };
  }

  // Render the result
  return (
    <div className="p-4 rounded-md">
      {timeRemaining.expired ? (
        <p className="text-[120px] text-red-700 font-bold">EXPIRED</p>
      ) : (
        <p className="text-[80px] text-white font-semibold  ">
          {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m{" "}
          {timeRemaining.seconds}s
        </p>
      )}
    </div>
  );
};

export default CountdownTimer;

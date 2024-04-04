import React from "react";

function AboutUs() {
  return (
    <div className="flex flex-col items-center max-w-sm mx-auto md:max-w-md px-2 ">
      <p className="m-2 text-center text-white font-bold text-3xl tracking-wide">
        Why I Built <span className="text-[#3771d2] font-extrabold tracking-widest">RateMyRental?</span>
      </p>
      <div className="h-screen text-center text-white mt-4">
      Like many renters, I've had my fair share of frustrating experiences with landlords and rental properties. Dealing with my last landlord was the final straw. From ignoring urgent repairs to unreasonable rent increases, I felt powerless and knew there had to be a better way. That's when the idea for RateMyRental was born. I wanted to create a space where renters could share honest reviews, have a voice, and help each other navigate the rental market with more knowledge and confidence.
      </div>
    </div>
  );
}

export default AboutUs;

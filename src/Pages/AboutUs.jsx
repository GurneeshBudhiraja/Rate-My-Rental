import React from "react";

function AboutUs() {
  return (
    <div className="flex flex-col items-center max-w-prose mx-auto min-h-screen   ">
      <p className="m-4 text-center text-white font-bold text-3xl tracking-wide">
        Why I Built <span className="text-[#3771d2] font-extrabold tracking-widest">RateMyRental?</span>
      </p>
      <div className="text-gray-50 m-4 leading-8 text-lg font-medium tracking-wider ">
      Like many renters, I've had my fair share of frustrating experiences with landlords and rental properties. Dealing with my last landlord was the final straw. From ignoring urgent repairs to unreasonable rent increases, I felt powerless and knew there had to be a better way. That's when the idea for RateMyRental was born. I wanted to create a space where renters could share honest reviews, have a voice, and help each other navigate the rental market with more knowledge and confidence.
      </div>
    </div>
  );
}

export default AboutUs;

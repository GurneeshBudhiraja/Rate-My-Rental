import React from "react";
import  KnowSVG from "../pictures/KnowSVG"
import Neighbors from "../pictures/Neighbors"
import Empower from "../pictures/Empower"

function HomeMission() {
  return (
    <div className='mt-2 text-white'>
      <hr className="border-[#3771d2]" />
      <p className="text-center text-2xl py-2 tracking-widest font-bold">
        Our Mission
      </p>
      <hr className="border-[#3771d2]" />
      <div className="flex flex-col w-auto items-center justify-center mt-3 flex-wrap gap-2">
        <div className="flex flex-col items-center flex-wrap rounded-lg bg-gray-900 bg-opacity-50 w-[90%] border border-white py-4 px-4 gap-2">
          <KnowSVG className="w-32 h-32" />
          <p className="tracking-wide text-center">
            Avoid surprises.<span className="block">Know before you rent.</span>
          </p>
        </div>
        <div className="flex flex-col items-center flex-wrap rounded-lg bg-gray-900 bg-opacity-50 w-[90%] border border-white py-4 px-2 gap-2">
          <Neighbors className="w-52 h-40" />
          <p className="tracking-wide text-center">
            Know what it's <br /> really like to live there
          </p>
        </div>
        <div className="flex flex-col items-center flex-wrap rounded-lg bg-gray-900 bg-opacity-50 w-[90%] border border-white py-4 px-2 gap-2">
          <Empower className="w-52 h-32"/>
          <p className="tracking-wide text-center">
            Empowering renters with community knowledge
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeMission;

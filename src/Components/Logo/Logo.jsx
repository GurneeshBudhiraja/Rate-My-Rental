import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Logo({ className }) {
  return (
    <div className={`p-4 text-white font-semibold tracking-wider text-xl lg:text-2xl 2xl:text-3xl `}>
        R{<span className={`text-[#4771ce] font-semibold ${className}`}>M</span>}R
    </div>
  );
}

export default Logo;

import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Logo({ className }) {
  return (
    <div className={`p-4 text-white font-bold`}>
        R{<span className={`text-[#4771ce] font-bold ${className}`}>M</span>}R
    </div>
  );
}

export default Logo;

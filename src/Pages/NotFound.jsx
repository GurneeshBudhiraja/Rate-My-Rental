import React from "react";
import notFoundImage from "../assets/404.svg";
function NotFound() {
  return (
    <div className=" h-screen bg-black text-white">
      <div className="mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-3 ">
        <img src={notFoundImage} alt="not found" className="max-w-64 " />
        <p className="whitespace-pre-line text-center text-2xl">404 · Page not found</p>
      </div>
    </div>
  );
}

export default NotFound;

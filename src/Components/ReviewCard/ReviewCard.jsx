import React from "react";

function ReviewCard({
  image = null,
  neighbourhood,
  ammenities,
  owner,
  address = null,
  dateOfReview = null,
  comments = "Not Provided",
  rent = "Not Provided",
  trash = false,
  onClick = null,
}) {
  return (
    <div
      className={`flex border rounded-md border-theme ${
        trash ? "pb-8 p-2" : "p-2"
      } gap-2 items-center bg-[#0a0a0a] relative`}
    >
      <div className="border-2 border-theme rounded-lg mx-1 min-w-20 w-20 h-full">
        {image ? (
          <img
            src={image}
            alt="rental image will come here"
            className="min-w-20 min-h-20 w-20 h-20 p-2"
          />
        ) : (
          <img
            src=""
            alt="Image Not Provided"
            className="min-w-20 min-h-20 w-20 h-20 p-2 text-sm text-theme font-semibold"
          />
        )}
      </div>
      <div className="overflow-x-auto ">
        {address && (
          <p className="capitalize">
            <span className="text-theme font-bold tracking-wide">Address:</span>{" "}
            {address}
          </p>
        )}
        <p className="">
          <span className="text-theme font-bold tracking-wide">Rent:</span>{" "}
          {rent}
        </p>
        <p className="">
          <span className="text-theme font-bold tracking-wide">
            Neighbourhood:
          </span>{" "}
          {neighbourhood}
        </p>
        <p className="">
          <span className="text-theme font-bold tracking-wide">Amenities:</span>{" "}
          {ammenities}
        </p>
        <p className="">
          <span className="text-theme font-bold tracking-wide">Owner:</span>{" "}
          {owner}
        </p>
        <p className="">
          <span className="text-theme font-bold tracking-wide">Comments:</span>{" "}
          {comments?comments:"Not Provided"}
        </p>
        
        {trash && (
          <div className="absolute right-3 bottom-1" onClick={onClick}>
            <i className="fa-solid fa-trash-alt text-gray-300 cursor-pointer"></i>
          </div>
        )}
        {dateOfReview && (
          <p className="absolute left-2 bottom-1 font-semibold text-sm ">
            <span className="text-theme font-semibold tracking-wide">
              Created on:
            </span>{" "}
            {dateOfReview.split("T")[0]}
          </p>
        )}
      </div>
    </div>
  );
}

export default ReviewCard;

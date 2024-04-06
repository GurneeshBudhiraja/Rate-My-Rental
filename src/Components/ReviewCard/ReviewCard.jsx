import React from "react";

function ReviewCard({
  image = null,
  neighbourhood,
  ammenities,
  owner,
  comments = "Not Provided",
  rent = "Not Provided",
}) {
  return (
    <>
      <div className="flex border rounded-md border-theme p-2 gap-2 items-center bg-[#0a0a0a] ">
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
            <span className="text-theme font-bold tracking-wide">
              Amenities:
            </span>{" "}
            {ammenities}
          </p>
          <p className="">
            <span className="text-theme font-bold tracking-wide">Owner:</span>{" "}
            {owner}
          </p>
          <p className="">
            <span className="text-theme font-bold tracking-wide">
              Comments:
            </span>{" "}
            {comments}
          </p>
        </div>
      </div>
    </>
  );
}

export default ReviewCard;

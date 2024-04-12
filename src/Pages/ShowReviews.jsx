import React, { useCallback, useEffect } from "react";
import { review, storage } from "../Appwrite/Services/services.js";
import { useSelector } from "react-redux";
import keys from "../keys/keys.js";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ReviewCard,
  ExpandedReview,
} from "../Components/components.js";
import { Query } from "appwrite";
import notFound from "../assets/notFound.svg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function ShowReviews() {
  // getting the value of address from the store
  const addressValue = useSelector((state) => state.address.searchAddress);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  const [reviewArray, setReviewArray] = React.useState([]);
  const [expandedReview, setExpandedReview] = React.useState({});
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    if (!addressValue) {
      navigate("/");
    }
    
    const fetchReviews = async () => {
      try {
        setError("");
        const queryArray = JSON.stringify([
          Query.equal("address", addressValue),
          Query.orderDesc("$createdAt"),
        ]);
        const res = await review.getReviews(queryArray);
        if (
          res &&
          res.documents.length > 0 &&
          Object.keys(res.documents[0]).length > 0
        ) {
          setReviewArray(res.documents);
        }
        
      } catch (error) {
        setError("An error occurred. Please try again later.");
        console.log(error);
      } finally {
        setLoading(false);
        
      }
    };
    fetchReviews();
    return () => {
      setReviewArray([]);
    };
  }, []);
  

  const expandReview = useCallback(
    async (id) => {
      try {
        setError("");
        if (!id.trim()) return;
        const response = await review.getReview(id);
        const responseObject = {
          neighbourhood: response.neighbourhood,
          amenities: response.amenities,
          owner: response.owner,
          comments: response.comments,
          isImage: response.isImage,
          address: response.address,
          rent: response.rent,
          dateOfReview: response["$createdAt"].split("T")[0],
        };
        if (response.isImage) {
          const imageResponse = storage.getFilePreview({ fileId: id });
          responseObject.imageSrc = imageResponse["href"];
        }
        setExpandedReview(responseObject);
        setOpen(true);
      } catch (error) {
        setError("An error occurred. Please try again later.");
        console.log(error.message);
      }
    },
    [expandedReview, setExpandedReview]
  );
  return (
    <div
      className={`text-white bg-[#0a0a0a] min-h-screen px-5 mb-8 pt-4 max-w-prose mx-auto relative`}
    >
      <div className={`${open && "blur-[1px]"} `}>
        <p className="text-3xl text-center mb-4 font-bold tracking-wider ">
          Reviews
        </p>
      {error && (
        <p className="text-rose-500 text-center" >{error}</p>
      )}
        <p className="my-2 tracking-wider">
          Reviews for: <span className="capitalize">{addressValue}</span>
        </p>
        {loading ? (
          <Box
            spacing={4}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 2,
              gap: 5,
              borderRadius: 2,
              flexWrap: "wrap",
            }}
          >
            {Array.from(Array(3)).map((_, index) => (
              <Skeleton
                variant="rounded"
                sx={{
                  bgcolor: "grey.900",
                  width: "auto",
                  height: "20vh",
                }}
                animation="wave"
              />
            ))}
          </Box>
        ) : (
          <div className="flex flex-col gap-2">
            {reviewArray.length > 0 ? (
              reviewArray.map((eachReview) => (
                <ReviewCard
                  fileId={eachReview["$id"]}
                  isImage={eachReview.isImage}
                  neighbourhood={eachReview.neighbourhood}
                  dateOfReview={eachReview["$createdAt"]}
                  key={eachReview["$id"]}
                  amenities={eachReview.amenities}
                  owner={eachReview.owner}
                  comments={eachReview.comments}
                  onClickShowReview={() => expandReview(eachReview["$id"])}
                />
              ))
            ) : (
              <div className="mx-auto flex flex-col items-center justify-center mt-5 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 ">
                <img
                  src={notFound}
                  alt="not found"
                  className="max-w-40 max-h-40 w-auto h-auto "
                />
                <p className="text-nowrap text-lg ">
                  No reviews found for this address
                </p>

                <Button
                  children={"No reviews? Add yours"}
                  classProps="mt-2 bg-theme px-2 cursor-pointer rounded-lg py-2 font-medium tracking-wider whitespace-break-spaces text-center "
                  onClick={() => navigate("/addreview")}
                />
              </div>
            )}
          </div>
        )}
      </div>
      {open && (
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[345px] max-h-[40%] md:max-h-[50%] lg:max-h-[75%] overflow-auto`}
        >
          <Card
            sx={{
              maxWidth: 345,
              position: "relative",
              color: "white",
              backgroundColor: "#0a0a0a",
              border: "2px solid #5f81ff",
              boxShadow: "1px 1px 10px 1px #4771ce",
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={expandedReview.imageSrc ? expandedReview.imageSrc : ""}
              alt="Image Not Provided"
            />
            <CardContent>
              <ExpandedReview expandedReview={expandedReview} />
            </CardContent>
          </Card>
          <button
            className="absolute top-2 right-3 text-[#436cce] bg-[#0a0a0a] px-2 rounded-full "
            onClick={() => setOpen(false)}
          >
            X
          </button>
        </div>
      )}
      <button className="fixed bottom-16 left-1/2 -translate-x-1/2 text-center text-white animate-pulse text-nowrap md:py-1 px-2 rounded-md tracking-wide font-semibold bg-theme/50 backdrop-blur-3xl" >Click on a review to expand</button>
    </div>
  );
}

export default ShowReviews;

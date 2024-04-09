import React from "react";
import { review } from "../Appwrite/Services/services.js";
import { useSelector } from "react-redux";
import keys from "../keys/keys.js";
import { useNavigate } from "react-router-dom";
import { ReviewCard } from "../Components/components.js";
import { ID, Query } from "appwrite";
import notFound from "../assets/notFound.svg";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function ShowReviews() {
  // getting the value of address from the store
  const addressValue = useSelector((state) => state.address.searchAddress);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const [reviewArray, setReviewArray] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    if (!addressValue) {
      navigate("/");
    }
    const fetchReviews = async () => {
      try {
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

  return (
    <div className="text-white bg-[#0a0a0a] min-h-screen px-5 mb-8 pt-4 max-w-prose mx-auto relative">
      <p className="text-3xl text-center mb-4 font-bold tracking-wider ">
        Reviews
      </p>
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
              neighbourhood={eachReview.neighbourhood}
              key={eachReview["$id"]}
                ammenities={eachReview.ammenities}
                owner={eachReview.owner}
                comments={eachReview.comments}
              />
            ))
          ) : (
            <div className="mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-3 ">
              <img src={notFound} alt="not found" />
              <p className="text-nowrap">No reviews found for this address</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ShowReviews;

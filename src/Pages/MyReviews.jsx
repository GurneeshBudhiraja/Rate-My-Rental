import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { review, storage } from "../Appwrite/Services/services.js";
import { Query } from "appwrite";
import notFound from "../assets/notFound.svg";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { ReviewCard } from "../Components/components.js";

function MyReviews() {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [reviewArray, setReviewArray] = React.useState([]);

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate("/login");
    }
    const fetchMyReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        // custom query
        const queryArray = JSON.stringify([
          Query.equal("user", user.userEmail),
          Query.orderDesc("$createdAt"),
        ]);
        // fetch reviews from the server
        const { documents } = await review.getReviews(queryArray);
        setReviewArray(documents);
      } catch (error) {
        setError(`An error occurred. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };
    fetchMyReviews();
    return () => {
      setError(null);
      setReviewArray([]);
    };
  }, []);

  // delete review function
  const deleteReview = async (selectedReview) => {
    try {
      setError(null);
      setLoading(true);
      // delete the review from the database
      await review.deleteReview(selectedReview["$id"]);
      // delete the image from the storage
      if(selectedReview.isImage){
        await storage.deleteFile(selectedReview["$id"]);
      }
      // remove the review from the state
      setReviewArray((state) =>
        state.filter((eachReview) => eachReview["$id"] !== selectedReview["$id"])
      );
      
      setOpen(true);
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const hideSnackBar = (_, reason) => {
    if (reason === "timeout") {
      setOpen(false);
      return;
    }
  };

  return (
    <div className="text-white bg-[#0a0a0a] min-h-screen px-5 pt-4 max-w-prose mx-auto relative mb-2 ">
      <p className="text-3xl text-center mb-4 font-bold tracking-wider ">
        My Reviews
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
              key={index}
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
                neighbourhood={eachReview.neighbourhood}
                address={eachReview.address}
                rent={eachReview.rent}
                dateOfReview={eachReview["$createdAt"]}
                key={eachReview["$id"]}
                amenities={eachReview.amenities}
                owner={eachReview.owner}
                comments={eachReview.comments}
                trash={true}
                isImage={eachReview.isImage}
                onClick={() => deleteReview(eachReview)}
              />
            ))
          ) : (
            <div className="mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-3 ">
              <img src={notFound} alt="not found" />
              <p className="text-nowrap">You haven't added any reviews yet.</p>
            </div>
          )}
        </div>
      )}
      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={hideSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => {
            setOpen(false);
          }}
          sx={{ width: "100%" }}
        >
          Review deleted successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default MyReviews;

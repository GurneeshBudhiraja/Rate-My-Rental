import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {review} from "../Appwrite/Services/services.js";
import {Query} from "appwrite";
import notFound from "../assets/notFound.svg";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { ReviewCard } from '../Components/components.js';

function MyReviews() {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [error,setError] = React.useState(null);
  const [loading,setLoading] = React.useState(false);
  const [reviewArray,setReviewArray] = React.useState([]);
  useEffect(()=>{
    if(!user.isAuthenticated){
      navigate('/login');
    }
    const fetchMyReviews = async()=>{
      setLoading(true);
      setError(null);
      try {
        // fetch reviews from the server
        const queryArray = JSON.stringify([
          Query.equal("user", user.userEmail),
          Query.orderDesc("$createdAt"),
        ]);
        const {documents} = await review.getReviews(queryArray);
        console.log(documents);
        setReviewArray(documents);
      } catch (error) {
        console.log(error.message);
        setError('An error occurred. Please try again later.');
      } finally{
        setLoading(false);
      }
    }
    fetchMyReviews();
    return ()=>{
      setReviewArray([]);
    }
  },[])
  const deleteReview = async(documentId)=>{
    //work to be done here

    }
  }
  return (
      <div className="text-white bg-[#0a0a0a] min-h-screen px-5 pt-4 max-w-prose mx-auto relative">
        <p className="text-3xl text-center mb-4 font-bold tracking-wider ">
          Reviews
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
                  trash={true}
                  onClick={()=>deleteReview(eachReview["$id"])}
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

export default MyReviews;

import React from "react";
import { review } from "../Appwrite/Services/services.js";
import { useSelector } from "react-redux";
import keys from "../keys/keys";
import { useNavigate } from "react-router-dom";
import image from "../assets/react.svg";
import { ReviewCard } from "../Components/components.js";
import {Query} from 'appwrite';

function CheckReview() {
  // getting the value of address from the store
  const addressValue = (useSelector((state) => state.address.searchAddress))
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const [reviews, setReviews] = React.useState(false);
  
  React.useEffect(() => {
    setLoading(true);
    if (!addressValue) {
      navigate("/");
    }
    
    const fetchReviews = async () => {
      try {
        const res = await review.getReviews(addressValue);
        if(res){
          console.log(res.documents);
          setReviews(res);
          console.log(reviews);
        } 
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();


  }, [addressValue]);

  return (
    <div className="text-white bg-[#0a0a0a] min-h-screen px-5 pt-4 max-w-prose mx-auto">
      <p className="text-3xl text-center mb-4 font-bold tracking-wider ">
        Reviews
      </p>
      <p className="my-2 tracking-wider">Reviews for: <span className="capitalize">{addressValue}</span></p>
      {loading ? (
        "loading...."
      ) : (
        <div className="flex flex-col gap-2">
          {
            reviews.documents && reviews.documents.forEach((review)=>{
              <ReviewCard
                neighbourhood={review.neighbourhood}
                ammenities={review.ammenities}
                owner={review.owner}
                comments={review.comments}
              />
            })
          }
        </div>
      )}
    </div>
  );
}

export default CheckReview;

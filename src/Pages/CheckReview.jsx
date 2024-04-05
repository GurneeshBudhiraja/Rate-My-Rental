import React from "react";
import { useParams } from "react-router-dom";
import { review } from "../Appwrite/Services/services.js";


import keys from "../keys/keys";

function CheckReview() {
  const hello = useParams();
  React.useEffect(() => {
    const loadReview = async () => {      
      try {
        const addressValue = hello.addressValue.toLowerCase();
        console.log(addressValue);
        const resp = await review.getReview(addressValue);
        console.log(resp.documents);
      } catch (error) {
        console.log(error);
      }
    }
    loadReview();
  }, []);


  return <div className="text-white">{hello.addressValue.toLowerCase()}</div>;
}

export default CheckReview;

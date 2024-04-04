import React from "react";
import {CCarousel, CCarouselItem, CCarouselCaption} from "@coreui/react"
function Testimonial({ key = Date.now(), rating, review, author }) {
  return (
    <>
      <div>{rating}</div>
      <hr />
      <p>{review}</p>
      <p className="text-center">~{author}</p>
    </>
  );
}

function Carousel() {
  const reviews = [
    {
      rating: "⭐⭐⭐⭐",
      review:
        "An essential tool in my rental search, leading me to a perfect fit quickly and reliably.",
      author: "Marc",
    },
    {
      rating: "⭐⭐⭐⭐⭐",
      review:
        "RateMyRental's thorough reviews became my compass for navigating the rental market!",
      author: "Mable",
    },
    {
      rating: "⭐⭐⭐⭐",
      review:
        "Made apartment-hunting a breeze! The site's insights were pivotal in my decision-making.",
      author: "Verna",
    },
    {
      rating: "⭐⭐⭐⭐",
      review:
        "Found a hidden gem thanks to this site! The detailed reviews and tips were game-changing.",
      author: "Arshpreet",
    },
    {
      rating: "⭐⭐⭐⭐⭐",
      review:
        "A trustworthy advisor in my rental journey, providing clarity and confidence in choosing my home.",
      author: "Mitchell",
    },
  ];

  return (
    <>
      Some Work
    </>
  );
}

export default Carousel;

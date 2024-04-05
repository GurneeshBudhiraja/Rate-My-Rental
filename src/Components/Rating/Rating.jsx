import React from 'react';

function Rating() {
  const [rating, setRating] = React.useState(-1);

  function HighlightStar(index) {
    setRating(index);
  }

  function AddStar({ selected, onClick }) {
    return (
      <span onClick={onClick}>
        <i className={`fa-solid fa-star fa-xl  ${selected?'text-yellow-400':'text-gray-200'} cursor-pointer`}></i>
      </span>
    );
  }

  return (
    <div className='space-x-5 text-center'>
      {
        [...Array(5)].map((_, index) => (
          <AddStar 
            key={index}
            selected={index < rating}
            onClick={() => HighlightStar(index + 1)}
          />
        ))
      }
    </div>
  );
}

export default Rating;

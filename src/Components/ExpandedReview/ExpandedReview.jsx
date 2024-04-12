import React from 'react'

function ExpandedReview({
  expandedReview,
}) {
  const reviewData = [
    { label: 'Address', key: 'address' },
    { label: 'Rent', key: 'rent' },
    { label: 'Neighbourhood', key: 'neighbourhood' },
    { label: 'Amenities', key: 'amenities' },
    { label: 'Owner', key: 'owner' },
    { label: 'Comments', key: 'comments' },
    { label: 'Created on', key: 'dateOfReview' },
  ];

  return (
    <div className='text-gray-100 capitalize'>
      {
        reviewData.map((eachData) => (
          <p key={eachData.key} className='my-1 '>
            <span className='font-bold text-theme'>{eachData.label}:</span>{" "}
            {expandedReview[eachData.key] ? expandedReview[eachData.key] : 'Not Provided'}
          </p>
        ))
      }
    </div>
  )
}

export default ExpandedReview
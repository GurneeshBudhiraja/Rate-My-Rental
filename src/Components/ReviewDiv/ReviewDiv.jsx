import React from 'react'
import { Rating } from '../components.js'
function ReviewDiv({labelName}) {
  return (
    <div className='border border-theme rounded-md py-4 px-2 space-y-4 text-wrap'>
      <label>{labelName}</label>
      <Rating />
    </div>
  )
}

export default ReviewDiv
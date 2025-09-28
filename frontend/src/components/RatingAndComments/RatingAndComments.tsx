import { Rating } from '@mui/material'
import React from 'react'

type RatingProps = {
  rating: number
  ratingSize : "small" | "medium"
  nbComments: number
}

const RatingAndComments = ( {rating, nbComments, ratingSize}: RatingProps) => {
  return (
    <div>
        <Rating value={rating} readOnly size={ratingSize}/>
        <div> {nbComments} Comments</div>
    </div>
  
  )
}

export default RatingAndComments
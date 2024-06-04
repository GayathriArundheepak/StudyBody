import React, { useState } from 'react';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import { IconButton } from '@mui/material';

interface RatingProps {
  defaultValue?: number;
}

const Rating: React.FC<RatingProps> = ({ defaultValue = 0 }) => {
  const [rating, setRating] = useState(defaultValue);

  const handleRatingClick = (value: number) => {
    setRating(value === rating ? 0 : value); // Toggle rating
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <IconButton key={value} onClick={() => handleRatingClick(value)}>
          {value <= rating ? <StarIcon /> : value - 0.5 === rating ? <StarHalfIcon /> : <StarOutlineIcon />}
        </IconButton>
      ))}
    </div>
  );
};

export default Rating;

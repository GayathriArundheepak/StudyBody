import React from 'react';
import Rating from './Rating'; // Assuming Rating component is in a separate file

const CourseRating: React.FC = () => {
  return (
    <div className="course-rating">
      <h3>Rate this course</h3>
      <Rating />
    </div>
  );
};

export default CourseRating;

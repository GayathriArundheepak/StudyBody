import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./HorizontalSlide.scss";

interface ClassItem {
  standard: string;
  description: string;
}

interface ClassListProps {
  selectedSyllabus: string;
}

enum ClassStandard {
  FIRST_STANDARD = "1",
  SECOND_STANDARD = "2",
  THIRD_STANDARD = "3",
  FOURTH_STANDARD = "4",
  FIFTH_STANDARD = "5",
  SIXTH_STANDARD = "6",
  SEVENTH_STANDARD = "7",
  EIGHTH_STANDARD = "8",
  NINTH_STANDARD = "9",
  TENTH_STANDARD = "10",
  ELEVENTH_STANDARD = "11",
  TWELFTH_STANDARD = "12",
}

const HorizontalSlide: React.FC<ClassListProps> = ({ selectedSyllabus }) => {
  const [scrollLeft, setScrollLeft] = useState(0);
  const classListRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [startIndex, setStartIndex] = useState(0);
  const cardWidth = 300; // Width of each card




  const handleScrollRight = () => {
    if (classListRef.current) {
      const newIndex = startIndex + 1;
      setScrollLeft(newIndex * -cardWidth);
      setStartIndex(newIndex);
    }
  };

  const handleScrollLeft = () => {
    if (classListRef.current && startIndex > 0) {
      const newIndex = startIndex - 1;
      setScrollLeft(newIndex * -cardWidth);
      setStartIndex(newIndex);
    }
  };
  const classes: { standard: ClassStandard; description: string }[] = [
    {
      standard: ClassStandard.FIRST_STANDARD,
      description:
        "One hour live class / 16x Lesson / Test Papers / Free Study Materials",
    },
    {
      standard: ClassStandard.SECOND_STANDARD,
      description:
        "One hour live class / 16x Lesson / Test Papers / Free Study Materials",
    },
    {
      standard: ClassStandard.THIRD_STANDARD,
      description:
        "One hour live class / 16x Lesson / Test Papers / Free Study Materials",
    },
    {
      standard: ClassStandard.FOURTH_STANDARD,
      description:
        "One hour live class / 16x Lesson / Test Papers / Free Study Materials",
    },
    {
      standard: ClassStandard.FIFTH_STANDARD,
      description:
        "One hour live class / 16x Lesson / Test Papers / Free Study Materials",
    },
    {
      standard: ClassStandard.SIXTH_STANDARD,
      description:
        "One hour live class / 16x Lesson / Test Papers / Free Study Materials",
    },
    {
      standard: ClassStandard.SEVENTH_STANDARD,
      description:
        "One hour live class / 16x Lesson / Test Papers / Free Study Materials",
    },
    {
      standard: ClassStandard.EIGHTH_STANDARD,
      description:
        "One hour live class / 16x Lesson / Test Papers / Free Study Materials",
    },
    {
      standard: ClassStandard.NINTH_STANDARD,
      description:
        "One hour live class / 16x Lesson / Test Papers / Free Study Materials",
    },
    {
      standard: ClassStandard.TENTH_STANDARD,
      description:
        "One hour live class / 16x Lesson / Test Papers / Free Study Materials",
    },
    {
      standard: ClassStandard.ELEVENTH_STANDARD,
      description:
        "One hour live class / 16x Lesson / Test Papers / Free Study Materials",
    },
    {
      standard: ClassStandard.TWELFTH_STANDARD,
      description:
        "One hour live class / 16x Lesson / Test Papers / Free Study Materials",
    },
  ];

  return (
    <div className="horizontal-slide-container">
      <button className="scroll-button" onClick={handleScrollLeft} disabled={startIndex === 0}>
        &lt;
      </button>
      <div className="horizontal-slide" ref={classListRef}>
        <div className="slides" style={{ transform: `translateX(${scrollLeft}px)` }}>
          {classes.map((classItem, index) => (
            <div key={index} className="slide">
              <div className="preview-image">
                <img src="/images/previewImage.jpg" alt="Preview" />
              </div>
              <div className="class-details">
                <h3>
                  {classItem.standard} ({selectedSyllabus})
                </h3>
                <p>{classItem.description}</p>
                <button className="action-button" disabled={loading}>
                  {loading ? "Loading..." : "Subjects"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="scroll-button" onClick={handleScrollRight}>
        &gt;
      </button>
    </div>
  );
};

export default HorizontalSlide;

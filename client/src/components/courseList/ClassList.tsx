import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import {
  fetchCoursesStart,
  fetchCoursesSuccess,
} from "../../redux/course/CourseSlice"; // Import the fetchCoursesStart action

import "./ClassList.scss";
import { RootState } from "../../redux/store";
import api from '../../axios/api'
 import ClassStandard from "../../enum/ClassStandardEnums";


interface ClassListProps {
  selectedSyllabus: string;
}

const ClassList: React.FC<ClassListProps> = ({ selectedSyllabus }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const courses = useSelector((state: RootState) => state.course.courses);
  const handleClickSubjects = (standard: ClassStandard) => {
    setLoading(true);
    dispatch(fetchCoursesStart());
    api
      .post("/api/course/coursesList", {
        syllabus: selectedSyllabus,
        standard: standard,
      })
      .then((response) => {
        console.log("Subjects:", response.data); // Handle the response data as needed
        try {
          dispatch(fetchCoursesSuccess(response.data));
          navigate("/subjects");
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
      })
      .finally(() => {
        setLoading(false);
      });
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
    <div className="class-list">
      <h2>Classes for {selectedSyllabus}</h2>
      <div className="rows">
        {classes.map((classItem, index) => (
          <div key={index} className="card">
            <div className="previewImage">
              <img src="/images/previewImage.jpg" alt="" />
            </div>
            <div className="class-details">
              <h3>
                {classItem.standard}({selectedSyllabus})
              </h3>
              <p>{classItem.description}</p>
              <button
                className="subject-btn"
                onClick={() => handleClickSubjects(classItem.standard)}
                disabled={loading}
              >
                {loading ? "Loading..." : "Subjects"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ClassList;

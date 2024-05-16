import React from "react";
import "./EditCourse.scss";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import EditCourseForm from "../../../components/course/EditCourseForm";

import { useParams } from "react-router-dom";

function EditCourse() {
  const { courseId } = useParams<{ courseId?: string }>(); // Make courseId optional

  return (
    <>
      <Navbar />
      <div className="edit-course">
        <div className="edit-course-right">
          <Sidebar />
        </div>
        <div className="edit-course-left">
          {courseId && <EditCourseForm courseId={courseId} />}{" "}
          {/* Render EditCourseForm only if courseId is defined */}
        </div>
      </div>
    </>
  );
}

export default EditCourse;

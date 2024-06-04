import React from "react";
import "./CreateCourse.scss";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import CreateCourseForm from "../../../components/course/CreateCourseForm.";

function CreateCourse() {
  return (
    <>
      <Navbar />
      <div className="create-course">
        <div className="create-course-right">
          <Sidebar />
        </div>
        <div className="create-course-left">
          <CreateCourseForm />
        </div>
      </div>
    </>
  );
}

export default CreateCourse;

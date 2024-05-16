import React, { useEffect, useState } from "react";
import "./CourseList.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import api from "../../../../axios/api";
import { FormikProps } from "formik";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../../components/navbar/Navbar";
interface Course {
  _id: string;
  course_title?: string;
  subject?: string;
  syllabus?: string;
  standard?: string;
  prize?: number;
  adminApproved: boolean;
  slot: {
    day: string[];
    isWeekend: boolean;
    time: string;
  };
}

function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [selectedSyllabus, setSelectedSyllabus] = useState<string>("ICSE");
  const [selectedStandard, setSelectedStandard] = useState<string>("1");
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<string[]>([]);
  const navigate = useNavigate(); // Get the history object
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/course/coursesList",
          {
            syllabus: selectedSyllabus,
            standard: selectedStandard,
            subject: selectedSubject,
          }
        );
        setCourses(response.data.courseList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [selectedSyllabus, selectedStandard, selectedSubject]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        api
          .get(`/api/course/subjects/${selectedSyllabus}/${selectedStandard}`)
          .then((response) => {
            console.log(response.data);
            setSubjects(response.data.subjects);
            toast.success(response.data.message);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
            console.error("Error fetching subjects:", error);
          });
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, [selectedSyllabus, selectedStandard]);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const changeItemsPerPage = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(0); // Reset to first page when changing items per page
  };

  const onAdminApprove = async (id: string) => {
    try {
      await axios.put(`http://localhost:8080/api/course/approve-course/${id}`);
      const updatedCourses = courses.map((course) => {
        if (course._id === id) {
          return { ...course, adminApproved: true };
        }
        return course;
      });
      setCourses(updatedCourses);
    } catch (error) {
      console.error("Error approving course:", error);
    }
  };

  const onDisapprovalApproval = async (id: string) => {
    try {
      await axios.put(
        `http://localhost:8080/api/course/disApprove-course/${id}`
      );
      const updatedCourses = courses.map((course) => {
        if (course._id === id) {
          return { ...course, adminApproved: false };
        }
        return course;
      });
      setCourses(updatedCourses);
    } catch (error) {
      console.error("Error disapproving course:", error);
    }
  };
  const handleBack = () => {
    // Use navigate with -1 to go back to the previous page
    navigate(-1);
  };

  return (
    <>
      <div className="course-list-container">
        <ToastContainer />
        <Navbar />
        {/* <button onClick={handleBack}>back</button> */}
        <h2>Course List</h2>
        {/* Syllabus, Standard, and Subject selection */}
        <div className="selection-container">
          <label htmlFor="syllabus">Syllabus:</label>
          <select
            id="syllabus"
            value={selectedSyllabus}
            onChange={(e) => setSelectedSyllabus(e.target.value)}
          >
            <option value="ICSE">ICSE</option>
            <option value="CBSE">CBSE</option>
            <option value="STATE">STATE</option>
          </select>
          <label htmlFor="standard">Standard:</label>
          <select
            id="standard"
            value={selectedStandard}
            onChange={(e) => setSelectedStandard(e.target.value)}
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={(i + 1).toString()}>
                {i + 1}
              </option>
            ))}
          </select>
          <label htmlFor="subject">Subject:</label>
          <select
            id="subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="All">All</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {courses.length === 0 ? (
              <p>No courses available for the selected criteria.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Subject</th>
                    <th>Syllabus</th>
                    <th>Standard</th>
                    <th>Prize</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSubject === "All"
                    ? // Render all courses
                      courses
                        .slice(
                          currentPage * itemsPerPage,
                          (currentPage + 1) * itemsPerPage
                        )
                        .map((course: Course) => (
                          <tr key={course._id}>
                            <td>{course.course_title}</td>
                            <td>{course.subject}</td>
                            <td>{course.syllabus}</td>
                            <td>{course.standard}</td>
                            <td>{course.prize}</td>
                            <td>
                              {course.adminApproved ? (
                                <button
                                  onClick={() =>
                                    onDisapprovalApproval(course._id)
                                  }
                                >
                                  Disapprove
                                </button>
                              ) : (
                                <button
                                  onClick={() => onAdminApprove(course._id)}
                                >
                                  Approve
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                    : // Render courses for the selected subject only
                      courses
                        .filter((course) => course.subject === selectedSubject)
                        .slice(
                          currentPage * itemsPerPage,
                          (currentPage + 1) * itemsPerPage
                        )
                        .map((course: Course) => (
                          <tr key={course._id}>
                            <td>{course.course_title}</td>
                            <td>{course.subject}</td>
                            <td>{course.syllabus}</td>
                            <td>{course.standard}</td>
                            <td>{course.prize}</td>
                            <td>
                              {course.adminApproved ? (
                                <button
                                  onClick={() =>
                                    onDisapprovalApproval(course._id)
                                  }
                                >
                                  Disapprove
                                </button>
                              ) : (
                                <button
                                  onClick={() => onAdminApprove(course._id)}
                                >
                                  Approve
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                </tbody>
              </table>
            )}
          </>
        )}
        <div className="pagination-container">
          {/* Pagination controls */}
          <div className="pagination" style={{ color: "blue" }}>
            {/* Items per page selection */}
            <select
              onChange={(e) => changeItemsPerPage(Number(e.target.value))}
            >
              <option value={2}>2 per page</option>
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
            </select>

            {/* Previous button */}
            <button
              className="pagination-button"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Previous
            </button>

            {/* Page numbers */}
            {Array.from(
              Array(Math.ceil(courses.length / itemsPerPage)).keys()
            ).map((pageNumber) => (
              <button
                className="pagination-button "
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                disabled={currentPage === pageNumber}
              >
                {pageNumber + 1}
              </button>
            ))}

            {/* Next button */}
            <button
              className="pagination-button "
              onClick={() => onPageChange(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(courses.length / itemsPerPage) - 1
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CourseList;

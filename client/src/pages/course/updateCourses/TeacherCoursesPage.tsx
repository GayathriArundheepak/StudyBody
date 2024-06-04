import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import "./TeacherCoursesPage.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import Course from "../../../interface/course/Course";
import CourseResponse from "../../../interface/course/CourseResponse";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import VideoChatSharpIcon from "@mui/icons-material/VideoChatSharp";
import api from "../../../axios/api";

const TeacherCoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (currentUser) {
      fetchCourses(currentUser._id);
    }
  }, [currentUser]);
  const fetchCourses = async (userId: string) => {
    try {
      const response = await api.get<CourseResponse>(
        `/api/course/teachers_coursesList/${userId}`
      );
      setCourses(response.data.courseList); // Here you set courses using response.data
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleEditCourse = (courseId: string) => {
    // Navigate to the EditCoursePage with courseId as a parameter
    navigate(`/edit-course/${courseId}`);
  };
  const handleAddMaterials = (courseId: string) => {
    // Navigate to the EditCoursePage with courseId as a parameter
    navigate(`/addMeterials/add/${courseId}`);
  };
  const handleDeleteCourse = async (courseId: string) => {
    try {
      console.log(courseId);
      await api.delete(
        `/api/course/delete-course/${courseId}`
      );
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="teacher-courses-page">
        <div className="teacher-middle-left">
          <Sidebar />
        </div>
        <div className="table">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Course Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Syllabus</TableCell>
                  <TableCell>Standard</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Prize</TableCell>
                  <TableCell>Commission</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course._id}>
                    <TableCell>{course.course_title}</TableCell>
                    <TableCell>{course.description}</TableCell>
                    <TableCell>{course.syllabus}</TableCell>
                    <TableCell>{course.standard}</TableCell>
                    <TableCell>{course.subject}</TableCell>
                    <TableCell>{course.prize}</TableCell>
                    <TableCell>{course.commission}%</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEditCourse(course._id)}>
                        Edit
                      </Button>
                      <Button onClick={() => handleDeleteCourse(course._id)}>
                        Delete
                      </Button>
                      <Button onClick={() => handleAddMaterials(course._id)}>
                        Add Materials
                      </Button>
                      <Button onClick={() => handleAddMaterials(course._id)}>
                        <VideoChatSharpIcon style={{ color: "#4d2c5e" }} />
                        <a
                          href="/videoChat"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sidebarListItemText"
                        >
                          Make Live Class
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};
export default TeacherCoursesPage;

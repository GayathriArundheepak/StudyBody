import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import './TeacherCoursesPage.scss';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Course from '../../../interface/course/Course';
import CourseResponse from '../../../interface/course/CourseResponse'
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/navbar/Navbar';


const TeacherCoursesPage: React.FC = () => {
  const navigate = useNavigate()
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (currentUser) {
      fetchCourses(currentUser._id);
    }
  }, [currentUser]);
  const fetchCourses = async (userId: string) => {
    try {
      const response = await axios.get<CourseResponse>(`http://localhost:8080/api/course/teachers_coursesList/${userId}`);
      setCourses(response.data.courseList); // Here you set courses using response.data
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
  
  
  const handleEditCourse = (courseId: string) => {
    // Navigate to the EditCoursePage with courseId as a parameter
    navigate(`/edit-course/${courseId}`);
  };
  const handleAddMaterials = (courseId: string) => {
    // Navigate to the EditCoursePage with courseId as a parameter
    navigate( '/AddMeterials/add');
  };
  const handleDeleteCourse = async (courseId: string) => {
    try {
      console.log(courseId)
      await axios.delete(`http://localhost:8080/api/course/delete-course/${courseId}`);
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <>
      <Navbar/>
    <div className="teacher-courses-page">
      <h1>My Courses</h1>
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
                <Button onClick={() => handleEditCourse(course._id)}>Edit</Button>
                  <Button onClick={() => handleDeleteCourse(course._id)}>Delete</Button>
                  {/* <Button onClick={() => handleAddMaterials(course._id)}>Add Materials</Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </>
  );
};
export default TeacherCoursesPage;

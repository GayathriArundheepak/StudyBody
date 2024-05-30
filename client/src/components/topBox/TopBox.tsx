import "./TopBox.scss"
import api from '../../axios/api';
import { useEffect, useState } from "react";
import CourseResponse from '../../interface/course/CourseResponse';
import Course from '../../interface/course/Course';
import { UserSliceState } from "../../redux/user/UserSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
 import IUser from '../../interface/user/User';

// interface IUser {
//   _id: string;
//   username: string;
//   profilePic: string;
//   email: string;
//   otpApproved: boolean;
//   mylearnings?: string;
//   gender: string;
//   date_of_birth?: string;
//   rating?: number;
//   qualifications?: string;
//   block: boolean;
//   adminApproved: boolean;
//   commissionAmount:number;
// }
const TopBox = () => {
  const { currentUser }: UserSliceState = useSelector((state: RootState) => state.user);
  const userType: string = useSelector((state: RootState) => state.user.userType) || 'student';
  const [users, setUsers] = useState<IUser[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  // const [amount, setamount] = useState(0);
 

  const fetchData = async () => {
    try {
      const response = await api.get(`/api/teacher/teachersList`);
      const filteredUsers = response.data.data.filter((user: IUser) => user.otpApproved && user.adminApproved);
      const updatedUsers = await Promise.all(
        filteredUsers.map(async (user:IUser) => {
          const commissionAmount = await fetchCourses(user._id);
                // Round the commission amount to a maximum of 3 decimal digits
        const roundedCommissionAmount = parseFloat(commissionAmount.toFixed(3));
        return { ...user, commissionAmount: roundedCommissionAmount };
        })
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error(`Error fetching teachers:`, error);
    }
  };

  const fetchTeacherCourses = async () => {
    try {
      const response = await api.get(`/api/course/teachers_coursesList/${currentUser?._id}`);
      const courseData = response.data.courseList;
      setCourses(courseData);

      const revenueByMonth: { [key: string]: number } = {};
      courseData.forEach((course: Course) => {
        const createdAtDate = new Date(course.createdAt);
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthIndex = createdAtDate.getMonth();
        const month = monthNames[monthIndex];
        if (course.commission !== undefined && course.prize !== undefined) {
          const commissionAmount = (course.commission / 100) * course.prize;
          const teachersFee= course.prize-commissionAmount
          const totalTeachersFee= teachersFee*course.students_list.length
          // Add commission amount to the existing amount
      
          if (!revenueByMonth[month]) {
            revenueByMonth[month] = 0;
          }
          revenueByMonth[month] +=totalTeachersFee;
        }
      });
      // Optionally, you can set the revenueByMonth to state if needed for further use
    } catch (error) {
      console.error('Error fetching teacher courses:', error);
    }
  };
 

  useEffect(() => {
    if (userType === 'admin') {
      fetchData ()
    } else if (userType === 'teacher') {
      fetchTeacherCourses();
    }
  }, [userType,fetchData,fetchTeacherCourses]);


  const fetchCourses = async (userId: string) => {
    try {
      const response = await api.get<CourseResponse>(`/api/course/teachers_coursesList/${userId}`);
      console.log('list', response.data.courseList);
      let amount = 0;
      response.data.courseList.forEach((course: Course) => {
        // Check if course.commission and course.prize are defined
        if (course.commission !== undefined && course.prize !== undefined) {
          // Calculate commission amount for each course
          const commissionAmount = (course.commission / 100) * course.prize;
          const totalCommissionAmount = commissionAmount*course.students_list.length
          // Add commission amount to the existing amount
          amount += totalCommissionAmount;
        }
      });
      console.log('amount', amount);
      return amount;
    } catch (error) {
      console.error('Error fetching courses:', error);
      return 0; // Return a default value in case of error
    }
  };
  
  return (
    <div className="topBox">
    <h1 className="topBox-h1">{userType === 'admin' ? 'Top Dealers (Teachers)' : 'My Courses'}</h1>
    <div className="list">
      {userType === 'admin' ? (
        users.map(user => (
          <div key={user._id} className="listItem">
            <div className="user">
              <img src={user.profilePic} alt="profile pic" />
              <div className="userTexts">
                <span className="username">{user.username}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <span className="amount">{user.commissionAmount}</span>
          </div>
        ))
      ) : (
        courses.map(course => (
          <div key={course._id} className="listItem">
            <div className="course">
              <div className="courseTexts">
                <span className="courseTitle">{course.course_title}</span>
                <span className="amount">Amount earned: {course.commission && course.prize ? (course.commission / 100) * course.prize * course.students_list.length : 0}</span>
                <span className="studentsEnrolled">Students Enrolled: {course.students_list.length}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
  )
}
export default TopBox
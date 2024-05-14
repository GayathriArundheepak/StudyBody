import "./TopBox.scss"
import api from '../../axios/api';
import { useEffect, useState } from "react";
import CourseResponse from '../../interface/course/CourseResponse';
import Course from '../../interface/course/Course';
interface User {
  _id: string;
  username: string;
  profilePic: string;
  email: string;
  otpApproved: boolean;
  mylearnings?: string;
  gender: string;
  date_of_birth?: string;
  rating?: number;
  qualifications?: string;
  block: boolean;
  adminApproved: boolean;
  commissionAmount:number;
}
const TopBox = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [amount, setamount] = useState(0);
 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const response = await api.get(`/api/${userType}/${currentPage}/${itemsPerPage}`);
        const response = await api.get(`/api/teacher/teachersList`);
         // Filter out the teachers who are OTP approved and admin approved
         const filteredUsers = response.data.data.filter((user: User) => user.otpApproved && user.adminApproved);
         console.log(filteredUsers)
        setUsers(filteredUsers);

      } catch (error) {
        console.error(`Error fetching teachers:`, error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/teacher/teachersList`);
        const filteredUsers = response.data.data.filter((user: User) => user.otpApproved && user.adminApproved);
        const updatedUsers = await Promise.all(
          filteredUsers.map(async (user:User) => {
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
  
    fetchData();
  }, []);
  
  
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
          // Add commission amount to the existing amount
          amount += commissionAmount;
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
      <h1 className="topBox-h1 ">Top Dealrs(Teachers)</h1>
      <div className="list">
        {users.map(user=>(
          <>
          <div className="listItem" >
            <div className="user">
              <img src={user.profilePic} alt="profile pic" />
              <div className="userTexts">
                <span className="username">{user.username}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <span className="amount">{user.commissionAmount}</span>
          </div>
    
          </>
         ))} 
      </div>
    </div>
  )
}
export default TopBox
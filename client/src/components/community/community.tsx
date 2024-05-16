import React, { useState, useEffect, useRef } from "react";
import './Community.scss'
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UserSliceState } from "../../redux/user/UserSlice";
import Course from "../../interface/course/Course";
import api from "../../axios/api";
import ChatOnline from "../chatOnline/ChatOnline";
import { Socket } from "socket.io-client";
interface Conversation {
  _id: string;
  members: string[];
  conversationName: string;
  isGroup: boolean;
}
interface Conversation {
  _id: string;
  members: string[];
  // Other properties
}
interface CommunityProps {
  setCurrentChat: (chat: Conversation | null) => void;
}

interface Friend {
  _id: string;
  profilePic?: string | null;
  username?: string;
  email: string;
  password?: string;
  newPassword?: string;
  gender?: string;
  date_of_birth?: Date;
  userType?: string;
  wishlist?: string[];
}
const Community: React.FC<CommunityProps> = ({ setCurrentChat }) => {
  const { currentUser }: UserSliceState = useSelector(
    (state: RootState) => state.user
  );
  const myLearningIds: string[] = currentUser?.mylearnings || [];
  const [myLearnings, setMyLearnings] = useState<Course[]>([]);
  const [selectedCourseStudents, setSelectedCourseStudents] = useState<
    Friend[]
  >([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const socket = useRef<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();
  // const [currentChat, setCurrentChat] = useState(null);
  useEffect(() => {
    const fetchMyLearningDetails = async () => {
      try {
        await myLearningIds.map((id) => fetchCourseDetails(id));
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    // Function to fetch course details by ID
    const fetchCourseDetails = async (id: string) => {
      try {
        const response = await api.get(`/api/course/fetch-course/${id}`);
        console.log("coursecommunity:", response.data.courseList);
        setMyLearnings([response.data.courseList]);
        console.log(myLearnings);
        const selectedCourse = response.data.courseList;
        const studentIds = selectedCourse.students_list;
        const studentDetails = await Promise.all(
          studentIds.map((id: string) => api.get(`/api/student/${id}`))
        );
        const students = studentDetails.map((res) => res.data.data);
        setSelectedCourseStudents(students);
     
      } catch (error) {
        // Handle errors, e.g., logging or displaying error messages
        throw new Error(`Error fetching course details for ID ${id}: ${error}`);
      }
    };

    if (myLearningIds.length > 0) {
      fetchMyLearningDetails();
    }
  }, [myLearningIds]);

  const handleCourseClick = async (courseId: string) => {
    setSelectedCourseId(courseId);
  };

  return (
    <div className="community">
      <h2 className="communityTitle">My Learning communities</h2>
      <div className="courseList">
        {myLearnings.map((course: Course) => (
          <div
            key={course._id}
            className="courseItem"
            onClick={() => handleCourseClick(course._id)}
          >
            <h3>{course.course_title}</h3>
          </div>
        ))}
      </div>
      <div className="chatOnline">
        {selectedCourseId && (
          <ChatOnline
            selectedCourseStudents={selectedCourseStudents}
            onlineUsers={onlineUsers}
            setCurrentChat={setCurrentChat} // Pass setCurrentChat here
          />
        )}
      </div>
    </div>
  );
};

export default Community;

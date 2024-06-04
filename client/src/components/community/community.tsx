import React, { useState, useEffect, useMemo} from "react";
import './Community.scss'
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UserSliceState } from "../../redux/user/UserSlice";
import Course from "../../interface/course/Course";
import api from "../../axios/api";
import ChatOnline from "../chatOnline/ChatOnline";
import IFriend from "../../interface/messanger/Friend";
import IConversation from "../../interface/messanger/Conversation";

interface CommunityProps {
  setCurrentChat: (chat: IConversation | null) => void;
  // onlineUsers:IOnlineUser;
}


const Community: React.FC<CommunityProps> = ({ setCurrentChat }) => {
  const { currentUser }: UserSliceState = useSelector(
    (state: RootState) => state.user
  );
  const userType: string = useSelector(
    (state: RootState) => state.user.userType
  ) || "student";
  const myLearningIds: string[] = useMemo(() => currentUser?.mylearnings || [], [currentUser?.mylearnings]);
   const [myLearnings, setMyLearnings] = useState<Course[]>([]);
  const [selectedCourseStudents, setSelectedCourseStudents] = useState<
    IFriend[]
  >([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  // const scrollRef = useRef();
  useEffect(() => {
    const fetchMyLearningDetails = async () => {
      try {
        if (userType === "teacher") {
          const response = await api.get(`/api/course/teachers_coursesList/${currentUser?._id}`);
          setMyLearnings(response.data.courseList);
        } else {
          await myLearningIds.map((id) => fetchCourseDetails(id));
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    // Function to fetch course details by ID
    const fetchCourseDetails = async (id: string) => {
      try {
        const response = await api.get(`/api/course/fetch-course/${id}`);
        console.log("coursecommunity:", response.data.courseList);
        setMyLearnings((prevMyLearnings) => [
          ...prevMyLearnings,
          response.data.courseList,
        ]);
        console.log('ml',myLearnings);
      
     
      } catch (error) {
        // Handle errors, e.g., logging or displaying error messages
        throw new Error(`Error fetching course details for ID ${id}: ${error}`);
      }
    };
if(userType === 'student'){

  if (myLearningIds.length > 0) {
    fetchMyLearningDetails();
  }
}else if (userType === 'teacher'){
  fetchMyLearningDetails();
}
  }, [currentUser?._id, myLearningIds, myLearnings,userType]);

  const handleCourseClick = async (courseId: string) => {
    if (selectedCourseId === courseId) {
      // Deselect the course if it is already selected
      setSelectedCourseId(null);
      setSelectedCourseStudents([]);
    } else {
      setSelectedCourseId(courseId);
      try {
        const response = await api.get(`/api/course/fetch-course/${courseId}`);
        const selectedCourse = response.data.courseList;
        const studentIds = selectedCourse.students_list;
        const studentDetails = await Promise.all(
          studentIds.map((id: string) => api.get(`/api/student/${id}`))
        );
        const teacherDetails = await api.get(`/api/teacher/${selectedCourse.teacher_id}`);
        const students = studentDetails.map((res) => res.data.data);
        const teacher = teacherDetails.data.data;
        setSelectedCourseStudents([teacher, ...students]);
      } catch (error) {
        console.error("Error fetching students or teacher:", error);
      }
  };
}
  return (
    <div className="community">
    <h2 className="communityTitle">My Learning communities</h2>
    <div className="courseList">
      {myLearnings.map((course: Course) => (
        <div key={course._id} className="courseItem">
          <h3 onClick={() => handleCourseClick(course._id)}>{course.course_title}</h3>
          {selectedCourseId === course._id && (
              <ChatOnline
                selectedCourseStudents={selectedCourseStudents}
                //  onlineUsers={onlineUsers}
                setCurrentChat={setCurrentChat} // Pass setCurrentChat here
              />
        
          )}
        </div>
      ))}
    </div>
  </div>
  );
};
export default Community;

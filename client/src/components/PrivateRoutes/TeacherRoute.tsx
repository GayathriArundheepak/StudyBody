import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

// Define interface for Redux state
interface RootState {
  user: {
    userType: string;
    currentUser: any; // Adjust the type of currentUser as per your Redux state structure
  };
}

const TeacherRoute: React.FC = () => {
  // Use RootState interface with useSelector hook
  const { userType, currentUser }: RootState['user'] = useSelector((state: RootState) => state.user);

  // Check if currentUser is null
  if (!currentUser) {
    return <Navigate to="/" />;
  }
  
  console.log(userType);

  switch (userType) {
    case 'teacher':
      return <Outlet />;
    case 'admin':
      return <Navigate to="/adminSignin" />;
    case 'student':
      return <Navigate to="/signin" />;
    default:
      return <Navigate to="/" />;
  }
};

export default TeacherRoute;

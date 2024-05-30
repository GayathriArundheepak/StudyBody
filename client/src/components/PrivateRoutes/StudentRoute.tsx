import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
// Define interface for Redux state
interface RootState {
  user: {
    userType: string;
  };
}
const StudentRoute: React.FC = () => {
  // Use RootState interface with useSelector hook
  const { userType } = useSelector((state: RootState) => state.user);
  

  // Return the appropriate JSX based on user type
  return userType === 'student' ? <Outlet /> : <Navigate to="/signin" />;
};

export default StudentRoute;

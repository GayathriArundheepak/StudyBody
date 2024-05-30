import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
interface RootState {
  user: {
    currentUser: any; // Update the type according to your user object structure
  };
}

const AuthRoute: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return !currentUser ? <Outlet /> : <Navigate to="/" />;
};

export default AuthRoute;

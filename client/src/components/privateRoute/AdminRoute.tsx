import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

interface RootState {
  user: {
    userType: string;
  };
}
export default function AdminRoute() {
  const { userType } = useSelector((state: RootState) => state.user);
  return userType === 'admin' ? <Outlet/> : <Navigate to='/'/>;
}

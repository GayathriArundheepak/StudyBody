import React from 'react';
import axios from 'axios';
import './SignOut.scss'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { signOut } from '../../redux/user/UserSlice';
import api from '../../axios/api';
interface SignOutProps {}

const SignOut: React.FC<SignOutProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, loading } = useSelector((state: RootState) => state.user);
  const userType: string = useSelector((state: RootState) => state.user.userType) || 'student';
  console.log(userType)
  const handleSignOut = async () => {
    try {
      const response = await api.get('/api/auth/signout', { withCredentials: true });
      console.log('response', response.data);
      if (response.data.success) {
        dispatch(signOut());
        if (userType === 'admin') {
          navigate('/adminSignin');
        } else {
          navigate('/signin');
        }
      }
    } catch (error) {
      console.error('Error signing out:', error);
      // Handle sign-out error
    }
  };

  return (
    <div>
      <button className='auth-btn'  onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;

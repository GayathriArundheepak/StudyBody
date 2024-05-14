import React, { useState, ChangeEvent, FormEvent } from 'react';
import './Signin.scss';
import axios, { AxiosResponse, AxiosError } from 'axios';
import api from '../../../axios/api'
import {  useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiResponse from '../../../interface/auth/ApiResponse';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email')
  const [formData, setFormData] = useState({
    email: email,
    password: '',
    confirmPassword: '',
    userType: 'student' // Set default userType here
  });

  
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // Check if password and confirmPassword match before making the API call
    if (formData.password !== formData.confirmPassword) {
      alert('Password and Confirm Password must match');
      return;
    }
      try{
        // Make the API call to reset the password
        api.post("/api/auth/forgotPassword", formData)
        .then((response: AxiosResponse<ApiResponse>) => {
          const responseData: ApiResponse = response.data; 
          console.log('response', response.data);
          toast.success( responseData.message);
          setTimeout(() => {
            navigate('/signin')
           }, 6000);
           
          })
          .catch((error) => {
            toast.error(error.response.data.message);
            console.error('Error:', error);
           
          });

      }catch(error){
        
        toast.error('An error occurred . Please try again .');
      }
  }

  return (
    <div className='signin'>
      <div className="container">
      <ToastContainer />
        <h1>Forgot Password</h1>
        <form action="POST" onSubmit={handleSubmit}>
          <input type="email" name='email'  value={email || ''}  />
          <input type="password" name='password' placeholder='New Password' onChange={handleInputChange} />
          <input type="password" name='confirmPassword' placeholder='Confirm Password' onChange={handleInputChange} />
          
          {/* Add radio buttons for userType selection */}
          <div className="role-selection">
            <input type="radio" id="student" name="userType" value="student" onChange={handleInputChange} defaultChecked />
            <label htmlFor="student">Student</label>
            <input type="radio" id="teacher" name="userType" value="teacher" onChange={handleInputChange} />
            <label htmlFor="teacher">Teacher</label>
          </div>
          
          <button className='auth-btn' type='submit'>Reset Password</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword;

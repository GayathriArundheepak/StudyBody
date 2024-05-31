import './Signup.scss';
import React from 'react';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../axios/api'
import ApiResponse from '../../../interface/auth/ApiResponse';

interface FormData {
  username: string;
  email: string;
  password: string;
  gender: string;
  userType: string;
  date_of_birth: string;
}
 

const Signup = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    gender: 'Male',
    userType: 'student',
    date_of_birth: '2000-01-14'
  });
 

  const validateForm = (): boolean => {
    if (!formData.username || !formData.email || !formData.password || !formData.userType) {
      setError('Please fill in all the required fields.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    return true;
  };


  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      const isValid = validateForm();
      if (isValid) {
        api.post("/api/auth/register", formData)
        .then((response) => {
          const responseData: ApiResponse = response.data; 
          console.log('response', response.data);
          toast.success( responseData.message);
         
          setTimeout(() => {
            navigate(`/otpApproval?email=${encodeURIComponent(formData.email)}`);
          }, 6000); 
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.error('Error:', error);
          // Handle error
        });
      }      
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred during signup. Please try again later.');
    }
  };

  return (
    
    <div className='signup'>
      <div className="container">
        <ToastContainer />
        <h1>StudyBuddy</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name='username' placeholder=' Full Name' onChange={handleInputChange} />
          <input type="text" name='email' placeholder=' Email' onChange={handleInputChange} />
          <input type="password" name='password' placeholder=' password' onChange={handleInputChange} />
          <input type="password" placeholder=' Confirm password' />
          <div className="innerbox">
            <select name="gender" id="gender" onChange={handleInputChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="TransMan">TransMan</option>
              <option value="TransWoman">TransWoman</option>
              <option value="Other">Other</option>
            </select>
            {/* <input type="text" name='date_of_birth' onClick={showCalender} value={date} placeholder='Date of Birth' onChange={handleInputChange} />
            {calender && <Calendar className="react-calendar" value={new Date(date)} onChange={handleChange} />} */}
          </div>
          <div className="role-selection">
            <input type="radio" id="student" name="userType" value="student" onChange={handleInputChange} />
            <label htmlFor="student">Student</label>
            <input type="radio" id="teacher" name="userType" value="teacher" onChange={handleInputChange} />
            <label htmlFor="teacher">Teacher</label>
          </div>
          {error && <p className='error-message'>{error}</p>}
          <button className='auth-btn' type='submit'>Signup</button>
          <Link to="/signin">
            <p>Already have an account?Signin</p>
          </Link>
        </form>
  
    
      </div>
    </div>
  )
}

export default Signup;

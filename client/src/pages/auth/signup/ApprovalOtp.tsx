import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import './Signup.scss';
import { useNavigate ,useLocation} from 'react-router-dom';
import  { AxiosResponse, AxiosError } from 'axios';
import OTPTimer from '../../../components/otpTimer/OtpTimer';
import api from '../../../axios/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiResponse from '../../../interface/auth/ApiResponse';

// Inside your functional component
interface FormData {
  email: string;
  otp: string;
}

const ApprovalOtp: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email')

  // const [error, setError] = useState<string>('');
  const [otpExpired, setOtpExpired] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: email  || '',
    otp: '',
  });

 

  useEffect(() => {
    const timer = setTimeout(() => {
      setOtpExpired(true);
    }, 30000); // Set the expiry time for the OTP (30 seconds)

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []);

  // Function to handle the resend OTP click
  const handleResendOTP = async (): Promise<void> => {
    try {
        // Make an API call to resend OTP
       api.post('/api/auth/otp-resend', { email: email })
       .then((response: AxiosResponse) => {
        console.log('OTP Resent:', response.data);
        setOtpExpired(false);
        toast.success( response.data.message);
        ; 
        
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error(error.response.message);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          // setError(error.response.data.message || 'Unknown error occurred');
        }
      });

      
    } catch (error: any) {
        // Handle errors, such as displaying an error message
        toast.error(error.response.data.message);
        console.error('Error resending OTP:', error.response?.data ?? error.message);
    }
  }
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData)

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    try{

      api.post("/api/auth/otp-verification", formData)
      .then((response: AxiosResponse<ApiResponse>) => {
          console.log('response', response.data);
          toast.success( response.data.message);
         
          
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.error('Error:', error);
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            // setError(error.response.data.message || 'Unknown error occurred');
            toast.error(error.response.message);
          }
        });
    }catch(error){
      toast.error('An error occurred during otp varification. Please try again .');
    }
  };
 


  return (
    <div>
      <div className='signup'>
        <div className="container">
        <ToastContainer />
          <h1>StudyBuddy</h1>
          <form action="POST" onSubmit={handleSubmit}>
            <input type="text" name='email' value={email || ''}  />
            <input type="text" name='otp' placeholder='OTP' onChange={handleInputChange} />
            <button className='auth-btn' type="submit">Send OTP</button>
            {/* {error && <p className='error-message'>{error}</p>} */}
            {otpExpired ? (
              <p><span onClick={handleResendOTP} style={{ cursor: 'pointer', textDecoration: 'underline', color:'green' }}>Resend OTP</span> <span>  </span>
                 (otp expaired)</p>
            ) : (
              <>
                <OTPTimer />
                <p>Please enter the OTP sent to your email.</p>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ApprovalOtp;

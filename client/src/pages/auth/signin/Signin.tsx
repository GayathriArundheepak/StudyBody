import React, { useState, ChangeEvent, FormEvent } from "react";
import "./Signin.scss";
import "../../../config/toastify.scss";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from "axios";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../../redux/user/UserSlice";
import api from "../../../axios/api";
import ApiResponse from "../../../interface/auth/ApiResponse";

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdmin = window.location.pathname === "/adminSignin";
  const defaultUserType = isAdmin ? "admin" : "student";
  // const [err, setError] = useState<string>('');
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: defaultUserType,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(signInStart());
    try {
      api
        .post<ApiResponse>("/api/auth/login", formData, {
          withCredentials: true,
        })
        .then((response: AxiosResponse<ApiResponse>) => {
          console.log("response", response.data);
          dispatch(signInSuccess(response.data));
          toast.success(response.data.message);
          setTimeout(() => {
            if (response.data.userType === "student") {
              navigate("/profile");
            } else if (response.data.userType === "teacher") {
              navigate("/teacherProfile");
            } else if (response.data.userType === "admin") {
              navigate("/adminProfile");
            } else {
              navigate("/profile");
            }
          }, 6000);
        })
        .catch((error) => {
          console.error("Error:", error);

          dispatch(signInFailure(error.response.data));
          toast.error(error.response.data.message);
        });
    } catch (error) {
      toast.error("An error occurred . Please try again.");
    }
  };

  return (
    <div className="signin">
      <div className="container">
        <ToastContainer />
        <h1>StudyBuddy</h1>
        <form action="POST" onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder=" email"
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder=" password"
            onChange={handleInputChange}
          />
          {!isAdmin && (
            <div className="role-selection">
              <input
                type="radio"
                id="student"
                name="userType"
                value="student"
                onChange={handleInputChange}
              />
              <label htmlFor="student">Student</label>
              <input
                type="radio"
                id="teacher"
                name="userType"
                value="teacher"
                onChange={handleInputChange}
              />
              <label htmlFor="teacher">Teacher</label>
            </div>
          )}

          <button className="auth-btn" type="submit">
            Signin
          </button>
          <Link to={`/forgotPassword?email=${formData.email}`}>
            Forgot Password?
          </Link>
          <Link to="/signup">
            <p>Don't you have an account?Signup</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signin;

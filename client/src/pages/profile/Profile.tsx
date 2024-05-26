import React, { useState } from "react";
import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  UserSliceState,
} from "../../redux/user/UserSlice";
import { RootState } from "../../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Field, ErrorMessage, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import ImageUpdate from "../../components/imageUpdate/ImageUpdate";
import api from "../../axios/api";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser }: UserSliceState = useSelector(
    (state: RootState) => state.user
  );
  const userType: string =
    useSelector((state: RootState) => state.user.userType) || "student";
  console.log(currentUser);
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    profilePic: currentUser?.profilePic || "",
    gender: currentUser?.gender || "",
    date_of_birth: currentUser?.date_of_birth || "",
  });

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    // gender: Yup.string().required('Gender is required'),
    date_of_birth: Yup.date().required("Date of Birth is required"),
  });
  const handleSubmit = async (
    values: {
      username: string;
      password: string;
      gender: string;
      date_of_birth: string | Date;
    },
    actions: FormikHelpers<{
      username: string;
      password: string;
      gender: string;
      date_of_birth: string | Date;
    }>
  ) => {
    dispatch(updateUserStart());
    try {
      const id = currentUser?._id.toString();

      const updatedProfilePic = formData.profilePic; // Get updated profilePic from formData
      const updatedValues = { ...values, profilePic: updatedProfilePic };
      api
        .put(`/api/${userType}/updateProfile/${id}`, updatedValues, 
        )
        .then((response) => {
          dispatch(updateUserSuccess(response.data));
          const responseData = response.data;
          toast.success(responseData.message);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.error("Error :", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      actions.setSubmitting(false); // Reset form submission state
    }
  };

  return (
    <>
      <div className="profile">
        <Navbar />
        <ToastContainer />
        <div className="profile-right">
          <Sidebar />
        </div>
        <div className="profile-container">
          <h1>Profile</h1>
          <Formik
            initialValues={{
              username: currentUser?.username || "",
              password: "",
              gender: currentUser?.gender || "",
              date_of_birth: currentUser?.date_of_birth || "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              console.log(values);
              if (JSON.stringify(values) === JSON.stringify(formData)) {
                toast.warn("You did not make any changes.");
                actions.setSubmitting(false);
                return;
              }
              handleSubmit(values, actions);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <ImageUpdate formData={formData} setFormData={setFormData} />
                <Field type="text" name="username" placeholder="Your Name" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error-message"
                />
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
                <div className="innerbox">
                  <Field as="select" name="gender">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="TransMan">TransMan</option>
                    <option value="TransWoman">TransWoman</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="error-message"
                  />
                  <div className="expiry">
                    <label htmlFor="date_of_birth">Date of Birth</label>
                    <Field type="date" name="date_of_birth" />
                    <ErrorMessage
                      name="date_of_birth"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting}>
                  Save change
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="footer-profile">
        <Footer />
      </div>
      </div>
    </>
  );
};

export default Profile;

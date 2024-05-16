// import React from 'react';
// import { Formik, Form, Field, ErrorMessage,FormikHelpers  } from 'formik';
// import { useNavigate, Link } from 'react-router-dom';
// import * as Yup from 'yup';
// import api from '../../axios/api';

// const SignUpForm = () => {
//     const navigate = useNavigate();

//   const initialValues = {
//     username: '',
//     email: '',
//     password: '',
//     gender: 'Male',
//     userType: 'student',
//   };

//   const validationSchema = Yup.object({
//     username: Yup.string().required('Full Name is required'),
//     email: Yup.string().email('Invalid email address').required('Email is required'),
//     password: Yup.string().required('Password is required'),
//     gender: Yup.string().required('Gender is required'),
//     userType: Yup.string().required('User Type is required'),
//   });



//   const handleSubmit = async (
//     values: FormData, // Specify the type of 'values' explicitly
//     { setSubmitting }: FormikHelpers<FormData>
//   ): Promise<void> => {
//     try {
//       const response = await api.post("/api/auth/register", values);
//       console.log('response', response.data);
//       navigate('/otpApproval');
//     } catch (error) {
//       console.error('Error:', error);
//     }
//     setSubmitting(false);
//   };
  


//   return (
//     <div className='signup'>
//       <div className="container">
//         <h1>StudyBuddy</h1>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           <Form>
//             <Field type="text" name="username" placeholder="Full Name" />
//             <ErrorMessage name="username" component="div" className="error-message" />

//             <Field type="text" name="email" placeholder="Email" />
//             <ErrorMessage name="email" component="div" className="error-message" />

//             <Field type="password" name="password" placeholder="Password" />
//             <ErrorMessage name="password" component="div" className="error-message" />

//             <Field as="select" name="gender">
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="TransMan">TransMan</option>
//               <option value="TransWoman">TransWoman</option>
//               <option value="Other">Other</option>
//             </Field>
//             <ErrorMessage name="gender" component="div" className="error-message" />

//             <div className="role-selection">
//               <label>
//                 <Field type="radio" name="userType" value="student" />
//                 Student
//               </label>
//               <label>
//                 <Field type="radio" name="userType" value="teacher" />
//                 Teacher
//               </label>
//             </div>

//             <ErrorMessage name="userType" component="div" className="error-message" />

//             <button type='submit'>Signup</button>
//             <Link to="/signin">
//               <p>Already have an account?Signin</p>
//             </Link>
//           </Form>
//         </Formik>
//       </div>
//     </div>
//   )
// }

// export default SignUpForm

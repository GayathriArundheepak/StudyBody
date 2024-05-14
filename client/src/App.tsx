import React from 'react'; // Import React

import './App.scss';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';


import Signup from './pages/auth/signup/Signup';
import Signin from './pages/auth/signin/Signin';
import Profile from './pages/profile/Profile';
import ApprovalOtp from './pages/auth/signup/ApprovalOtp';
import UserList from './pages/admin/userManagement/UserList';
import Home from './pages/home/Home';
import SignOut from './components/signOut/SignOut';
import StudentRoute from './components/PrivateRoutes/StudentRoute';
import TeacherRoute from './components/PrivateRoutes/TeacherRoute';
import AuthRoute from './components/PrivateRoutes/AuthRoute';
import AdminRoute from './components/PrivateRoutes/AdminRoute';
import ForgotPassword from './pages/auth/signin/ForgetPssword';
import Course from './pages/course/courseCollection/course/Course';
import SubjectPage from './pages/course/courseCollection/subjectPage/SubjectsPage';
import Wishlist from './components/wishlist/Wishlist';
import Cart from './components/cart/Cart';
import CreateCourse from './pages/course/createCourse/CreateCourse';
import TeacherCoursesPage from './pages/course/updateCourses/TeacherCoursesPage';
import EditCourseForm from './components/course/EditCourseForm';
// import { string } from 'yup';
import Success from './components/success/Success';
import Cancel from './components/cancel/Cancel';
 import Checkout from './components/checkout/CheckOut';
 import MyLearning from './components/mylearning/Mylearning';
import CreateReviewForm from './components/review/CreateReviewForm';
import AddMaterials from './components/course/AddMaterial';
import Materials from './components/materials/Materials';
import CourseList from './pages/admin/courseManagement/courseList/CourseLIst';
import AddSubject from './pages/admin/courseManagement/addSubject/AddSubject';
import Messanger from './pages/messanger/Messanger';





function App() {




  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/> 
          
            <Route path='/courses' element ={<Course/>}/>
            <Route path='/subjects' element ={<SubjectPage/>}/>
            <Route path='/messanger' element={<Messanger/>}/>

          <Route element={<AuthRoute/>}>
            <>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/signout' element={<SignOut/>}/>
              <Route path='/otpApproval' element={<ApprovalOtp/>}/>
              <Route path='/signin' element={<Signin/>}/>
              <Route path='/adminSignin' element={<Signin/>}/>
              <Route path='/forgotPassword' element={<ForgotPassword/>}/>
            
            </>
          </Route>

          <Route element={<StudentRoute/>}>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/wishlist' element={<Wishlist/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/mylearnings' element={<MyLearning />} />
            <Route path='/success/:orderId' element ={<Success />}/>
            <Route path='/cancel' element ={<Cancel/>}/>
            <Route path="/checkout/:orderId" element={<Checkout />} />
            <Route path='/course/review' element ={<CreateReviewForm/>}/>
            <Route path='/materials/:courseId' element={<Materials />} />
       
       
          </Route>

          <Route element={<TeacherRoute/>}>
            <Route path='/teacherProfile' element={<Profile/>}/>
          <Route path='/createCourseForm' element={<CreateCourse/>}/> 
          <Route path='/AddMeterials/add/:courseId' element={<AddMaterials/>}/> 
          <Route path='/UpdateCourse' element={<TeacherCoursesPage/>}/> 
          <Route  path="/edit-course/:courseId"  element={<EditCourseForm />}/>

          </Route>

          <Route element={<AdminRoute/>}>
            <>
              <Route path='/adminProfile' element={<Profile/>}/>
              <Route path='/userManagement/student' element={<UserList userType="student" />}/>
              <Route path='/userManagement/teacher' element={<UserList userType="teacher" />}/>
              <Route path='/courseManagement/admin' element={<CourseList />}/>
              <Route path='/courseManagement/admin/addSubject' element={<AddSubject />}/>
            </>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

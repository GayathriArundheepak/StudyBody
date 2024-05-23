// Success.tsx
import React, { useEffect } from 'react';
import './Success.scss';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import api from '../../axios/api';
import { Link, useMatch, useParams } from 'react-router-dom';



const Success: React.FC= () => {
  const { orderId } = useParams<{ orderId: string }>();
  const match = useMatch('/successd/:orderId');
  const updateCourseStudentsList = (courseId:string, studentId:string) => { // Accept courseId and studentId as parameters
    return api
      .post('api/course/update-course-students-list', { courseId, studentId }) // Pass courseId and studentId in the request body
      .then(response => {
        console.log('Course students list updated successfully:', response.data);
        return response.data; // You can return the data if needed
      })
      .catch(error => {
        console.error('Error updating course students list:', error);
        throw error; // Re-throw the error to propagate it further if needed
      });
  };
  // Define the function to update student's mylearning
const updateStudentsMylearning = (studentId: string, courseId: string) => {
  // Make a POST request to the corresponding endpoint
  return api
    .post('api/student/update-students-mylearning', {studentId,courseId })
    .then(response => {
      console.log('Student mylearning updated successfully:', response.data);
      return response.data; // You can return the data if needed
    })
    .catch(error => {
      console.error('Error updating student mylearning:', error);
      throw error; // Re-throw the error to propagate it further if needed
    });
};

const clearCart = (studentId:string) => {
  // Make a POST request to the corresponding endpoint
  return api
    .post('api/cart/clear-cart/' + studentId)
    .then(response => {
      console.log('Cart cleared successfully:', response.data);
      return response.data; // You can return the data if needed
    })
    .catch(error => {
      console.error('Error clearing cart:', error);
      throw error; // Re-throw the error to propagate it further if needed
    });
};
  useEffect(() => {
    const updateOrderPaymentStatus = () => {
      return api
        .post('api/order/update-order-payment-status', { orderId })
        .then(async response => {
          console.log('Order payment status updated successfully:', response.data);
          const courseId = response.data.data.courseId;
          const studentId = response.data.data.studentId;
          console.log(studentId)
          // return updateCourseStudentsList(courseId, studentId); 
          const [courseUpdateResult, studentUpdateResult,cartUpdateResult] = await Promise.all([
            updateCourseStudentsList(courseId, studentId),
            updateStudentsMylearning( studentId,courseId),
            clearCart (studentId)
        ]);
           // Log results or handle them as needed
           console.log('Course update result:', courseUpdateResult);
           console.log('Student update result:', studentUpdateResult);
           console.log('Cart update result:', cartUpdateResult);
        })
        .catch(error => {
          console.error('Error updating order payment status:', error);
          throw error; // Re-throw the error to propagate it further if needed
        });
    };
    
  
    updateOrderPaymentStatus();
  }, [orderId]); // Run the effect when orderId changes
  

  return (
    <div className="success-page">
      <div className="icon-container">
        <CheckSharpIcon className="success-icon" style={{ color: 'green' }} />
      </div>
      <h2>Payment Successful!</h2>

      <Link to="/mylearnings">My Learning</Link>
    </div>
  );
};

export default Success;


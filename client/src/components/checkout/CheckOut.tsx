import React, { useEffect, useState } from 'react';
import './CheckOut.scss';
import axios from 'axios';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import makePayment from '../paymentComponent/MakePayment';
import Course from '../../interface/course/Course';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Navbar from '../navbar/Navbar';
// import { UserSliceState } from '../../redux/user/UserSlice';


const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const match = useMatch('/checkout/:orderId');
    const [cartItems, setCartItems] = useState<Course[]>([]);
    const { orderId } = useParams<{ orderId: string }>();
    const currentUser = useSelector((state: RootState) => state.user.currentUser);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                if (currentUser && currentUser._id) {
                    const response = await axios.get(`http://localhost:8080/api/cart/get-cart/${currentUser._id}`);
                    setCartItems(response.data.cart);
                } else {
                    alert('You are not signed in');
                    navigate('/signin');
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
                alert('Error fetching cart items');
            }
        };

        fetchCartItems();
    }, [currentUser, navigate]);

    const handleMakePayment = async () => {
        try {
            await makePayment(cartItems, orderId || '');

        } catch (error) {
            console.log("cartpayment:", error)
        }
    };

    const totalPrice = cartItems.reduce((acc: number, item: Course) => {
        // Check if item.prize is defined before adding it to the accumulator
        if (item.prize !== undefined) {
            return acc + item.prize;
        } else {
            // If item.prize is undefined, return the accumulator unchanged
            return acc;
        }
    }, 0);
   

    return (
        <div className="checkout">

        <Navbar/>
        <div className="checkout-container">
        <h2 className="checkout-heading">Checkout</h2>
        <div className="course-list">
            <h3 className="course-list-heading">Selected Courses:</h3>
            <ul className="course-list-items">
                {cartItems.map((course: Course) => (
                    <li key={course._id} className="course-list-item">
                        <span className="course-title">{course.course_title}</span>
                        <span className="course-price">${course.prize}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="payment-details">
            <h3 className="total-price">Total Price: ${totalPrice}</h3>
            <button className="payment-button" onClick={handleMakePayment}>Make Payment</button>
        </div>
    </div>
        </div>
    
    );
};

export default Checkout;

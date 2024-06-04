import React, { useState, useEffect, useCallback } from "react";
import "./Cart.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UserSliceState } from "../../redux/user/UserSlice";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Navbar from "../navbar/Navbar";
import api from "../../axios/api";
import { ToastContainer, toast } from "react-toastify";
import ICourse from '../../interface/course/Course';

function Cart(): JSX.Element {
  const [cartItems, setCartItems] = useState<ICourse[]>([]);
  const { currentUser }: UserSliceState = useSelector(
    (state: RootState) => state.user
  );
  const courses: ICourse[] = useSelector(
    (state: RootState) => state.course.courses
  ) as unknown as ICourse[]; // No need for type assertion
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [teacherNames, setTeacherNames] = useState<{ [key: string]: string }>(
    {}
  );

  const fetchTeacherName = useCallback(async (teacherId: string) => {
    if (teacherNames[teacherId]) {
      return; // Already fetched
    }
    try {
      const response = await api.get(`/api/teacher/${teacherId}`);
      setTeacherNames((prevState) => ({
        ...prevState,
        [teacherId]: response.data.data.username,
      }));
    } catch (error) {
      console.error(`Error fetching teacher with id ${teacherId}:`, error);
      setTeacherNames((prevState) => ({
        ...prevState,
        [teacherId]: "Unknown",
      }));
    }
  }, [teacherNames]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (currentUser && currentUser._id) {
          const response = await api.get(
            `/api/cart/get-cart/${currentUser._id}`
          );
          console.log(response.data.cart);
          setCartItems(response.data.cart);
        } else {
          toast.error("You are not signed in");
          navigate("/signin");
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!currentUser) {
      toast.error("You are not signed in");
      navigate("/signin");
    } else {
      fetchCartItems();
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    courses.forEach(course => {
      if (course.teacher_id) {
        fetchTeacherName(course.teacher_id);
      }
    });
  }, [courses, fetchTeacherName]);

  const handleCheckout = async () => {
    try {
      if (!currentUser) {
        toast.error("You are not signed in");
        navigate("/signin");
      } else {
        await createOrder(); // Create order after making payment
      }
    } catch (error) {
      console.log("cartpayment:", error);
      toast.error("Error creating the order");
    }
  };

  const createOrder = async () => {
    const calculateTotalPrice = (cartItems: any[]) => {
      return cartItems.reduce((total, item) => total + item.prize, 0);
    };

    const ordersData = {
      studentId: currentUser?._id, // Assuming currentUser is available and contains the student ID
      courseId: cartItems.map((item) => item._id), // Extracting courseId from each cartItem
      price: calculateTotalPrice(cartItems), // Calculate total price based on cartItems
      date: new Date(),
      paymentDone: false,
    };
    console.log("orderdata:", ordersData);
    try {
      api
        .post("/api/order/create-order", { ordersData })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            const orderId = response.data.orderData._id;
            navigate(`/checkout/${orderId}`);
          } else {
            throw new Error("Failed to create order");
          }
        })
        .catch((error) => {
          console.error("Error creating order:", error);
        });
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    if (currentUser) {
      const userId = currentUser._id;

      api
        .delete(`/api/cart/remove-item/${userId}/${itemId}`)
        .then((response) => {
          console.log("Item removed from cart:", response.data);
          setCartItems((prevItems) =>
            prevItems.filter((item) => item._id !== itemId)
          );
        })
        .catch((error) => {
          console.error("Error removing item from cart:", error);
        });
    } else {
      toast.error("You are not signed in");
      navigate("/signin");
    }
  };

  return (
    <div className="cart">
      <Navbar />
      <ToastContainer />
      <div className="cart-container">
        <h1> CART</h1>
        {loading ? (
          <div>Loading...</div>
        ) : cartItems && cartItems.length > 0 ? (
          <div className="cart-table">
            {cartItems.map((course) => (
              <div key={course._id} className="cart-item">
                <div className="cell">
                  {course.course_title} <br />
                  <span>({course.description})</span>
                </div>
                <div className="cell">{course.teacher_id ? teacherNames[course.teacher_id] || "Loading..." : "Unknown"}</div>
                <div className="cell">{course.subject}({course.standard} - {course.syllabus})</div>
                <div className="cell">{course.prize}</div>
                <div className="cell">
                  <div
                    className="removeItemIcon"
                    onClick={() => handleRemoveItem(course._id)}
                  >
                    <DeleteOutlineIcon />
                  </div>
                </div>
              </div>
            ))}
            <div className="chekout-btn">
              <button onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        ) : (
          <div>No items found in the cart.</div>
        )}
      </div>
    </div>
  );
}

export default Cart;

import React, { useEffect, useState } from "react";
import "./Icons.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { UserSliceState, updateUserSuccess } from "../../redux/user/UserSlice";
import { useNavigate } from "react-router-dom";
import api from "../../axios/api";
import { string } from "yup";

interface IconsProps {
  courseId: string; // Define the type for courseId
}

const Icons: React.FC<IconsProps> = ({ courseId }) => {
  const [showWishlistPopup, setShowWishlistPopup] = useState<boolean>(false);
  const [showCartPopup, setShowCartPopup] = useState<boolean>(false);

  const [wishlistAdded, setWishlistAdded] = useState<boolean>(false);
  const [cartAdded, setCartAdded] = useState<boolean>(false);
  const { currentUser }: UserSliceState = useSelector(
    (state: RootState) => state.user
  );
  console.log("currentUser:", currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser && currentUser?.wishlist) {
      const courseInWishlist = currentUser.wishlist.includes(courseId);
      console.log(courseId, courseInWishlist);
      setWishlistAdded(courseInWishlist);
    }
    if (currentUser && currentUser?.cart) {
      const courseInCart = currentUser.cart.includes(courseId);
      console.log(courseId, courseInCart);
      setCartAdded(courseInCart);
    }
  }, [currentUser, courseId]);

  const handleAddToWishlist = async () => {
    try {
      if (wishlistAdded) {
        // Make API call to remove from wishlist
        if (currentUser) {
          const studentId = currentUser._id;
          api
            .delete(`/api/wishlist/remove-wishlist/${studentId}/${courseId}`)
            .then((response) => {
              dispatch(updateUserSuccess(response.data));
              setWishlistAdded(false);
            })
            .catch((error) => {
              // Handle error
              console.error(error);
            });
        } else {
          toast.error("you are not signin");
          navigate("/signin");
        }
      } else {
        // Make API call to add to wishlist
        if (currentUser) {
          const studentId = currentUser._id;
          // Make API call to add to wishlist
          api
            .post(`/api/wishlist/add-wishlist/${studentId}/${courseId}`)
            .then((response) => {
              console.log("res:", response.data);
              dispatch(updateUserSuccess(response.data));
              setWishlistAdded(true);
            })
            .catch((error) => {
              console.log("Error adding course to wishlist:", error);
              // Handle error if necessary
            });
        } else {
          toast.error("you are not signin");
          navigate("/signin");
        }
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      if (cartAdded) {
        if (currentUser) {
          const studentId = currentUser._id;
          // Make API call to remove from cart
          api
            .delete(`/api/cart/remove-item/${studentId}/${courseId}`)
            .then((response) => {
              // Handle success response
              console.log(response.data);
              setCartAdded(false);
              dispatch(updateUserSuccess(response.data));
            })
            .catch((error) => {
              // Handle error
              console.error(error);
            });
        } else {
          toast.error("you are not signin");
          navigate("/signin");
        }
      } else {
        if (currentUser) {
          const studentId = currentUser._id;

          // Make API call to add to cart
          api
            .post(`/api/cart/add-cart/${studentId}/${courseId}`)
            .then((response) => {
              setCartAdded(true);
              dispatch(updateUserSuccess(response.data));
            })
            .catch((error) => {
              console.log("Error adding course to cart:", error);
              // Handle error if necessary
            });
        } else {
          toast.error("you are not signin");
          navigate("/signin");
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="icon">
      <ToastContainer />
      {/* Wishlist Icon */}
      <div
        className="popup wishlistIcon"
        onMouseEnter={() => setShowWishlistPopup(true)}
        onMouseLeave={() => setShowWishlistPopup(false)}
        onClick={handleAddToWishlist}
      >
        <FavoriteBorderIcon
          style={{ color: wishlistAdded ? "#fc036b" : "black" }}
        />

        <span className={`popuptext ${showWishlistPopup ? "show" : ""}`}>
          {" "}
          {wishlistAdded ? "Remove " : "wishlist"}
        </span>
      </div>

      {/* Cart Icon */}
      <div
        className="popup cartIcon"
        onMouseEnter={() => setShowCartPopup(true)}
        onMouseLeave={() => setShowCartPopup(false)}
        onClick={handleAddToCart}
      >
        <ShoppingCartOutlinedIcon
          style={{ color: cartAdded ? "blue" : "black" }}
        />

        <span className={`popuptext ${showCartPopup ? "show" : ""}`}>
          {cartAdded ? "Remove" : "cart"}
        </span>
      </div>
    </div>
  );
};

export default Icons;

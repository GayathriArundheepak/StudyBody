import mongoose, { Schema, Types } from "mongoose";

import Students from "../models/student.model";
import ICartRepositoryInterface from "../interface/repositoryInterface/ICartRepositoryINterface";

class CartRepository implements ICartRepositoryInterface {
  async addToCart(studentId: string, courseId: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        throw new Error("Invalid courseId");
      }
      const student = await Students.findById(studentId).populate("cart");
      if (!student) {
        return {
          success: false,
          message: "Student with cart not found.",
          data: null,
        };
      }

      // Check if the student's cart exists
      if (!student.cart) {
        student.cart = []; // Initialize cart if it doesn't exist
      }

      // Convert courseId to ObjectId
      const courseIdObjectId = new mongoose.Types.ObjectId(courseId);

      if (student.cart.some((item) => item._id.equals(courseIdObjectId))) {
        return {
          success: false,
          message: "Course already in cart",
          data: student,
        };
      } else {
        // Add the cart item to the student's cart array
        student.cart.push(courseIdObjectId);

        // Save the updated student document
        await student.save();
        const studentDetails = await Students.findOne({ _id: studentId });
        return {
          success: true,
          message: "Course added to cart successfully",
          data: studentDetails,
        };
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw new Error(`Failed to add to cart: ${error}`);
    }
  }

  async getCart(studentId: string) {
    try {
      const student = await Students.findById(studentId, { cart: 1 }).populate(
        "cart"
      );
      const cart = student?.cart;
      return cart;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw new Error(`Failed to fetch cart: ${error}`);
    }
  }

  async removeFromCart(studentId: string, courseId: string) {
    try {
      // Find the student by ID
      const student = await Students.findById(studentId);
      console.log("removecart");

      if (!student) {
        return {
          success: false,
          message: "Such a user does not exist",
        };
      }

      // Remove the courseId from the student's cart array
      if (!student.cart || student.cart.length === 0) {
        return {
          success: false,
          message: "Your cart is empty",
        };
      }

      const courseIdObjectId = new mongoose.Types.ObjectId(courseId);

      // Filter out the courseId to remove from the cart array
      // student.cart = student.cart.filter(cartItem => !cartItem.equals(courseIdObjectId));
      // Filter out the courseId to remove from the cart array
      student.cart = student.cart.filter(
        (cartItem) => cartItem.toString() !== courseId
      );

      // Save the updated student document
      await student.save();
      const studentDetails = await Students.findOne({ _id: studentId });
      return {
        success: true,
        message: "Course removed from cart successfully",
        data: studentDetails,
      };
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw new Error(`Failed to remove from cart: ${error}`);
    }
  }

  async clearCart(studentId: string) {
    try {
      const student = await Students.findById(studentId, { cart: 1 }).populate(
        "cart"
      );
      if (!student) {
        throw new Error("Student not found");
      }

      // Clear the cart
      student.cart = [];
      await student.save();

      return student.cart;
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw new Error(`Failed to clear cart: ${error}`);
    }
  }
}

export default CartRepository;

import mongoose, { Schema } from "mongoose";
import Students from "../models/student.model";
import IStudentBody from "../interface/bodies/studentBody";
import IWishlistRepositoryInterface from "../interface/repositoryInterface/IWishlistRepositoryInterface";

class WishlistRepository implements IWishlistRepositoryInterface {
  async addToWishlist(studentId: string, courseId: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        throw new Error("Invalid courseId");
      }

      // Find the student by ID and populate the wishlist
      const student = await Students.findById(studentId).populate("wishlist");

      if (!student) {
        return {
          success: false,
          message: "Student not found",
          data: null,
        };
      }

      // Check if the student's wishlist exists
      if (!student.wishlist) {
        student.wishlist = []; // Initialize wishlist if it doesn't exist
      }

      // Convert courseId to ObjectId
      const courseIdObjectId = new mongoose.Types.ObjectId(courseId);

      // Check if the course is already in the wishlist
      if (
        student.wishlist.some((course) => course._id.equals(courseIdObjectId))
      ) {
        return {
          success: false,
          message: "Course already in wishlist",
          data: student,
        };
      } else {
        // Add the courseId to the student's wishlist array
        student.wishlist.push(courseIdObjectId);
        // Save the updated student document
        await student.save();
        const studentDetails = await Students.findOne({ _id: studentId });
        console.log(studentDetails);
        return {
          success: true,
          message: "Course added to wishlist successfully",
          data: studentDetails,
        };
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      throw new Error(`Failed to add to wishlist: ${error}`);
    }
  }

  async getWishlist(studentId: string) {
    try {
      const student = await Students.findById(studentId, {
        wishlist: 1,
      }).populate("wishlist");
      const wishlist = student?.wishlist;

      return wishlist;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      throw new Error(`Failed to fetch wishlist: ${error}`);
    }
  }

  async removeFromWishlist(studentId: string, courseId: string) {
    try {
      // Find the student by ID
      const student = await Students.findById(studentId);

      if (!student) {
        return {
          success: false,
          message: "Student not found",
          data: null,
        };
      }

      // Check if the wishlist array exists and is not empty
      if (!student.wishlist || student.wishlist.length === 0) {
        return {
          success: false,
          message: "Your wishlist is empty",
          data: null,
        };
      }

      // Convert courseId to ObjectId
      const courseIdObjectId = new mongoose.Types.ObjectId(courseId);

      // Remove the courseId from the student's wishlist array
      const updatedStudent = await Students.findByIdAndUpdate(
        studentId,
        { $pull: { wishlist: courseIdObjectId } }, // Remove the course ID from the wishlist array
        { new: true } // Return the updated document after the update operation
      );
      const studentDetails = await Students.findOne({ _id: studentId });

      if (!updatedStudent) {
        return {
          success: false,
          message: "Failed to update student",
          data: studentDetails,
        };
      }

      return {
        success: true,
        message: "Course removed from wishlist successfully",
        data: studentDetails,
      };
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      return {
        success: false,
        message: `Failed to remove from wishlist: ${error}`,
        data: null,
      };
    }
  }
}

export default WishlistRepository;

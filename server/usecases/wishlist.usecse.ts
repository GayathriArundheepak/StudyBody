import IStudentBody from "../interface/bodies/studentBody";
import { ICourse } from "../interface/course";
import IWishlistUsecaseInterface from "../interface/usecaseInterface/IWishlistUsecaseInterface";
import WishlistRepository from "../repositories/wishlist.repository";

class WishlistUsecase implements IWishlistUsecaseInterface {
  private wishlistRepository: WishlistRepository;

  constructor(wishlistRepository: WishlistRepository) {
    this.wishlistRepository = wishlistRepository;
  }

  async addToWishlist(studentId: string, courseId: string) {
    try {
      const addedWishlist = await this.wishlistRepository.addToWishlist(
        studentId,
        courseId
      );
      return {
        success: addedWishlist.success,
        message: addedWishlist.message,
        data: addedWishlist.data,
      };
    } catch (error) {
      console.error("Error creating wishlist:", error);
      throw new Error(`Failed to create wishlist: ${error}`);
    }
  }
  async getWishlist(studentId: string) {
    try {
      console.log("wishlist");
      const wishlist = await this.wishlistRepository.getWishlist(studentId);
      if (!wishlist || wishlist.length === 0) {
        return {
          success: false,
          message: "wishlist is empty",
        };
      }

      return {
        success: true,
        message: "wishlist fetched",
        wishlist,
      };
    } catch (error) {
      console.error("Error creating wishlist:", error);
      throw new Error(`Failed to create wishlist: ${error}`);
    }
  }

  async removeWishlist(studentId: string, courseId: string) {
    try {
      const removedWishlist = await this.wishlistRepository.removeFromWishlist(
        studentId,
        courseId
      );

      if (removedWishlist) {
        return {
          success: removedWishlist.success,
          message: removedWishlist.message,
          data: removedWishlist?.data,
        };
      } else {
        return {
          success: false,
          message: "course deleting from database have some error",
        };
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      throw new Error(`Failed to remove from wishlist: ${error}`);
    }
  }
}

export default WishlistUsecase;

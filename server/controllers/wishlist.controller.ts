import { Request, Response } from "express";
import CourseUsecase from "../usecases/course.usecase";
import { HttpStatus } from "../enums/HttpStatus.enum";
import errorHandler from "../middlewares/errorHandler";
import WishlistUsecase from './../usecases/wishlist.usecse';
// import Students from "../models/student.model";
import IWishlistControllerInterface from "../interface/controllerInterface/IWishlistControllerInterface";

class WishlistController implements IWishlistControllerInterface {
    private wishlistUsecase: WishlistUsecase;

    constructor(wishlistUsecase: WishlistUsecase) {
        this.wishlistUsecase = wishlistUsecase;
    }

    async addToWishlist(req: Request, res: Response) {
        try {
            const studentId = req.params.studentId;
            const courseId = req.params.courseId;
            
            // Call the use case to add the course to the wishlist
            const response = await this.wishlistUsecase.addToWishlist(studentId, courseId);
            console.log('response',response)
            res.status(HttpStatus.success).send({
                success: response.success,
                message: response.message,
                data:response.data
            });
        } catch (error) {
            errorHandler(error, res);
        }

        
    }
    async getWishlist(req: Request, res: Response) {
        try {
            const studentId = req.params.studentId;
            
            
            // Call the use case to add the course to the wishlist
            const response = await this.wishlistUsecase.getWishlist(studentId);
            console.log(response)
            const statusCode =response?.success? HttpStatus.success:HttpStatus.NotFound
        
            res.status(statusCode).send({
                success:response?.success,
                message:response?.message,
                wishlist:response?.wishlist,
              
            })
            
           
        } catch (error) {
            errorHandler(error, res);
        }

        
    }

    async removeWishlist(req: Request, res: Response) {
        try {
            const studentId = req.params.studentId;
            const courseId = req.params.courseId;
          
            
            // Call the use case to add the course to the wishlist
            const removedCourse = await this.wishlistUsecase.removeWishlist(studentId, courseId);
            
            res.status(HttpStatus.success).send({
                success: removedCourse?.success,
                message: removedCourse?.message,
                data: removedCourse?.data,
            
            });
        } catch (error) {
            errorHandler(error, res);
        }
    }

}

export default WishlistController;

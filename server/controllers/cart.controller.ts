import { Request, Response } from "express";
import CartUsecase from "../usecases/cart.usecase";
import { HttpStatus } from "../enums/HttpStatus.enum";
import errorHandler from "../middlewares/errorHandler";
import ICartControllerInterface from "../interface/controllerInterface/ICartControllerInterface";

class CartController implements ICartControllerInterface {
    private cartUsecase: CartUsecase;

    constructor(cartUsecase: CartUsecase) {
        this.cartUsecase = cartUsecase;
    }

    async addToCart(req: Request, res: Response) {
        try {
            const studentId = req.params.studentId;
            const courseId = req.params.courseId;
            console.log(courseId)
            // Call the use case to add the course to the cart
            const response = await this.cartUsecase.addToCart(studentId, courseId);
            
            res.status(HttpStatus.success).send({
                success: response.success,
                message: response.message,
                data: response.data
            });
        } catch (error) {
            errorHandler(error, res);
        }
    }

    async getCart(req: Request, res: Response) {
        try {
            const studentId = req.params.studentId;
            console.log(studentId)
            // Call the use case to fetch the cart for the student
            const response = await this.cartUsecase.getCart(studentId);
            const statusCode = response?.success ? HttpStatus.success : HttpStatus.NotFound;
        console.log(response)
            res.status(statusCode).send({
                success: response?.success,
                message: response?.message,
                cart: response?.cart,
            });
        } catch (error) {
            errorHandler(error, res);
        }
    }

    async removeFromCart(req: Request, res: Response) {
        try {
            const studentId = req.params.studentId;
            const courseId = req.params.courseId;
          
            // Call the use case to remove the course from the cart
            const removedCourse = await this.cartUsecase.removeFromCart(studentId, courseId);
            
            res.status(HttpStatus.success).send({
                success: removedCourse?.success,
                message: removedCourse?.message,
                data: removedCourse?.data,
            });
        } catch (error) {
            errorHandler(error, res);
        }
    }

    async clearCart(req: Request, res: Response) {
        try {
            const studentId = req.params.studentId;
            
            // Call the use case to clear the cart for the student
            const response = await this.cartUsecase.clearCart(studentId);
    
            // Respond with the appropriate status code and message
            res.status(HttpStatus.success).send({
                success: response.success,
                message: response.message,
                cart: response.cart,
            });
        } catch (error) {
            // Handle errors
            errorHandler(error, res);
        }
    }
    
}
export default CartController;

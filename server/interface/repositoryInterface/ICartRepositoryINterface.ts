import { Types } from "mongoose";

interface ICartRepositoryInterface {
    addToCart(studentId: string, courseId: string): Promise<any>;
    getCart(studentId: string): Promise<any>;
    removeFromCart(studentId: string, courseId: string): Promise<any>;
}

export default ICartRepositoryInterface;

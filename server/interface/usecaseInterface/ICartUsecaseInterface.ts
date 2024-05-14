export default interface ICartUsecaseInterface {
    addToCart(studentId: string, courseId: string): Promise<any>;
    getCart(studentId: string): Promise<any>;
    removeFromCart(studentId: string, courseId: string): Promise<any>;
}

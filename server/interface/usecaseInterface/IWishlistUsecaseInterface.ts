// import { ICourse } from '../interface/course';

export default interface IWishlistUsecaseInterface {
  addToWishlist(studentId: string, courseId: string): Promise<any>;
  getWishlist(studentId: string): Promise<any>;
  removeWishlist(studentId: string, courseId: string): Promise<any>;
}

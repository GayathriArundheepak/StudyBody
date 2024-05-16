interface IWishlistRepositoryInterface {
  addToWishlist(studentId: string, courseId: string): Promise<any>;
  getWishlist(studentId: string): Promise<any>;
  removeFromWishlist(studentId: string, courseId: string): Promise<any>;
}

export default IWishlistRepositoryInterface;

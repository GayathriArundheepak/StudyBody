import ICartUsecaseInterface from '../interface/usecaseInterface/ICartUsecaseInterface';
import CartRepository from '../repositories/cart.repository';

class CartUsecase implements ICartUsecaseInterface {
    private cartRepository: CartRepository;

    constructor(cartRepository: CartRepository) {
        this.cartRepository = cartRepository;
    }

    async addToCart(studentId: string, courseId: string) {
        try {
            const addedCart = await this.cartRepository.addToCart(studentId, courseId);
            return {
                success:addedCart?.success,
                message:addedCart?.message,
                data:addedCart?.data
            };
        } catch (error) {
            console.error("Error adding to cart:", error);
            throw new Error(`Failed to add to cart: ${error}`);
        }
    }

    async getCart(studentId: string) {
        try {
            const cart= await this.cartRepository.getCart(studentId);
            if (!cart) {
                return {
                    success: false,
                    message: 'Cart is empty',
                };
            }

            return {
                success: true,
                message: 'Cart fetched',
                cart
            };
        } catch (error) {
            console.error("Error fetching cart:", error);
            throw new Error(`Failed to fetch cart: ${error}`);
        }
    }

    async removeFromCart(studentId: string, courseId: string) {
        try {
            const removedCart = await this.cartRepository.removeFromCart(studentId, courseId);

            if (removedCart) {
                return {
                    success: removedCart.success,
                    message: removedCart.message,
                    data: removedCart?.data
                }
            } else {
                return {
                    success: false,
                    message: 'Course deletion from database has encountered an error'
                }
            }
        } catch (error) {
            console.error("Error removing from cart:", error);
            throw new Error(`Failed to remove from cart: ${error}`);
        }
    }

    async  clearCart(studentId: string) {
        try {
            const cart = await this.cartRepository.clearCart(studentId);
            return {
                success: true,
                message: 'Cart cleared',
                cart: []
            };
        } catch (error) {
            console.error("Error clearing cart:", error);
            throw new Error(`Failed to clear cart: ${error}`);
        }
    }
    
}

export default CartUsecase;

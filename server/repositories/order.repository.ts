
import Order from '../models/order.model';
import IOrder from '../interface/order';
import mongoose from 'mongoose';

class OrderRepository {
    async createOrder(orderData: IOrder): Promise<IOrder> {
        try {
            console.log('order:')
            const order = await Order.create(orderData);
            console.log('order:',order)
            return order;
        } catch (error) {
            throw new Error('Error creating order');
        }
    }

    async getOrders(): Promise<IOrder[]> {
        try {
            const orders = await Order.find();
            return orders;
        } catch (error) {
            throw new Error('Error fetching orders');
        }
    }

    async findOrder(orderId: mongoose.Types.ObjectId): Promise<IOrder | null> {
        try {
            const orderupdate = await Order.findById(orderId);
            return orderupdate;
        } catch (error) {
            throw new Error('Error finding order');
        }
    }
    async updateOrderPaymentStatus(orderId:mongoose.Types.ObjectId){
       
        // Implement the logic to update an order in MongoDB
        try {
      await Order.updateOne({ _id:orderId }, { $set: { paymentDone: true } });
       const order = await Order.findOne({ _id: orderId });
       console.log(order)
       return order;
        } catch (error) {
          console.error('Error updating order:', error);
          throw error;
        }
      }
    }
    






export default OrderRepository;

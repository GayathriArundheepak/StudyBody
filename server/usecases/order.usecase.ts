import OrderRepository from "../repositories/order.repository";
import IOrder from "../interface/order";
import mongoose from "mongoose";

class OrderUseCase {
  private orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  async createOrder(orderData: IOrder) {
    try {
      const createdOrder = await this.orderRepository.createOrder(orderData);
      if (createdOrder) {
        return {
          success: true,
          message: "Order created successfully",
          createdOrder,
        };
      } else {
        return {
          success: false,
          message: "Order create failed",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Error creating order",
      };
    }
  }

  async getOrders() {
    try {
      const orders = await this.orderRepository.getOrders();
      return {
        success: true,
        message: "Orders retrieved successfully",
        orders: orders, // Include the retrieved orders in the response
      };
    } catch (error) {
      return {
        success: false,
        message: "Error fetching orders",
      };
    }
  }

  async findOrder(orderId: string) {
    try {
      const objectId = new mongoose.Types.ObjectId(orderId);
      const order = await this.orderRepository.findOrder(objectId);
      if (order) {
        return {
          success: true,
          message: "Order found",
          order: order,
        };
      } else {
        return {
          success: false,
          message: "Order not found",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Error finding order",
      };
    }
  }

  async updateOrderPaymentStatus(orderId: string) {
    try {
      console.log("haii 2");
      const objectId = new mongoose.Types.ObjectId(orderId);
      const order = await this.orderRepository.findOrder(objectId);
      if (!order) {
        return {
          success: false,
          message: "Order not found",
        };
      }
      const orderupdate = await this.orderRepository.updateOrderPaymentStatus(
        objectId
      );
      if (orderupdate) {
        return {
          success: true,
          message: "order updated, payment is success",
          order: orderupdate,
        };
      } else {
        return {
          success: false,
          message: "Order not updated",
        };
      }
    } catch (error) {
      console.error("Error updating order payment status:", error);
      throw error; // Rethrow the error to be caught by the controller
    }
  }
}

export default OrderUseCase;

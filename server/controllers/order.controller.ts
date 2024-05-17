import { Request, Response } from "express";
import OrderUseCase from "../usecases/order.usecase";
import IOrder from "../interface/order";
import { HttpStatus } from "../enums/HttpStatus.enum";
import errorHandler from "../middlewares/errorHandler";

class OrderController {
  private orderUseCase: OrderUseCase;

  constructor(orderUseCase: OrderUseCase) {
    this.orderUseCase = orderUseCase;
  }

  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const ordersData: IOrder = req.body.ordersData;
      const response = await this.orderUseCase.createOrder(ordersData);
      const statusCode = response?.success
        ? HttpStatus.success
        : HttpStatus.NotFound;

      res.status(statusCode).send({
        success: response?.success,
        message: response?.message,
        orderData: response.createdOrder,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async getOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await this.orderUseCase.getOrders();
      res.status(HttpStatus.success).json({
        success: true,
        message: "Orders retrieved successfully",
        orders: orders,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async findOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderId = req.params.orderId;
      const order = await this.orderUseCase.findOrder(orderId);
      if (!order) {
        res
          .status(HttpStatus.NotFound)
          .json({ success: false, message: "Order not found" });
      } else {
        res.status(HttpStatus.success).json({
          success: true,
          message: "Order found",
          order: order,
        });
      }
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async updateOrderPaymentStatus(req: Request, res: Response) {
    try {
      const { orderId } = req.body;

      const response = await this.orderUseCase.updateOrderPaymentStatus(
        orderId
      );
      const statusCode = response?.success
        ? HttpStatus.success
        : HttpStatus.NotFound;
      console.log(response);
      res.status(statusCode).send({
        success: response?.success,
        message: response?.message,
        data: response?.order,
      });
    } catch (error) {
      console.error("Error updating order payment status:", error);
      res
        .status(HttpStatus.ServerError)
        .json({
          success: false,
          message: "Error updating order payment status",
        });
    }
  }
}

export default OrderController;

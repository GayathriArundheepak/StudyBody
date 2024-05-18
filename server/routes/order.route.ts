import express, { Request, Response } from "express";
import OrderController from "../controllers/order.controller";
import OrderRepository from "../repositories/order.repository";
import OrderUseCase from "../usecases/order.usecase";
import StudentRepository from "../repositories/student.repository";
import StripePayments from "../utils/Stripe";
import { verifyToken } from "../middlewares/verifyUser";
const orderRouter = express.Router();
const orderRepository = new OrderRepository();
const studentRepository = new StudentRepository();

const stripePayments = new StripePayments(studentRepository);
const orderUsecase = new OrderUseCase(orderRepository);
const orderController = new OrderController(orderUsecase);

orderRouter.post(
  "/checkout-session/:orderId",
  verifyToken,
  (req: Request, res: Response) => {
    stripePayments.checkoutSession(req, res);
  }
);
orderRouter.post(
  "/create-order",
  verifyToken,
  (req: Request, res: Response) => {
    orderController.createOrder(req, res);
  }
);
orderRouter.get("/get-orders", verifyToken, (req: Request, res: Response) => {
  orderController.getOrders(req, res);
});
orderRouter.get(
  "/find-order/:orderId",
  verifyToken,
  (req: Request, res: Response) => {
    orderController.findOrder(req, res);
  }
);
orderRouter.post(
  "/update-order-payment-status",
  verifyToken,
  (req: Request, res: Response) => {
    orderController.updateOrderPaymentStatus(req, res);
  }
);

export default orderRouter;

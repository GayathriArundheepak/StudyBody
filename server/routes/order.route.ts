import express, { Request, Response } from 'express';
import OrderController from '../controllers/order.controller';
import OrderRepository from '../repositories/order.repository';
import OrderUseCase from '../usecases/order.usecase';
import StudentRepository from '../repositories/student.repository';
import StripePayments from '../utils/Stripe';

const orderRouter = express.Router();
const orderRepository = new OrderRepository();
const studentRepository = new StudentRepository();

 const stripePayments = new StripePayments(studentRepository);
const orderUsecase = new OrderUseCase(orderRepository);
const orderController = new OrderController(orderUsecase);

orderRouter.post("/checkout-session/:orderId",(req: Request, res: Response) =>  {stripePayments.checkoutSession(req, res)});
orderRouter.post("/create-order", (req: Request, res: Response) => { orderController.createOrder(req, res)});
orderRouter.get("/get-orders", (req: Request, res: Response) => {orderController.getOrders(req, res)});
orderRouter.get("/find-order/:orderId", (req: Request, res: Response) => {orderController.findOrder(req, res)});
orderRouter.post('/update-order-payment-status', (req: Request, res: Response) => {orderController.updateOrderPaymentStatus(req, res);});


export default orderRouter;

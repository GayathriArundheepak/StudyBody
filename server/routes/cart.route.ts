import express, { Request, Response } from "express";

import CartRepository from "../repositories/cart.repository";
import CartUsecase from "../usecases/cart.usecase";
import { verifyToken } from "../middlewares/verifyUser";
import { checkStudentBlocked } from "../middlewares/checkBlocked";
import CartController from "./../controllers/cart.controller";

const cartRouter = express.Router(); // Change the router name to cartRouter
const cartRepository = new CartRepository();
const cartUsecase = new CartUsecase(cartRepository);
const cartController = new CartController(cartUsecase);

// Route for adding a course to the cart
cartRouter.post(
  "/add-cart/:studentId/:courseId",
  verifyToken,
  (req: Request, res: Response) => {
    cartController.addToCart(req, res);
  }
);

// Route for removing a course from the cart
cartRouter.delete(
  "/remove-item/:studentId/:courseId",
  verifyToken,
  (req: Request, res: Response) => {
    cartController.removeFromCart(req, res);
  }
);

// Route for getting the cart for a student
cartRouter.get("/get-cart/:studentId", (req: Request, res: Response) => {
  cartController.getCart(req, res);
});

// Route for clearing the cart for a student
cartRouter.post("/clear-cart/:studentId", (req: Request, res: Response) => {
  cartController.clearCart(req, res);
});

export default cartRouter;

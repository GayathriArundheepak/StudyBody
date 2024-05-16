import express, { Request, Response } from "express";

import WishlistRepository from "../repositories/wishlist.repository";
import WishlistUsecase from "../usecases/wishlist.usecse";
import { verifyToken } from "../middlewares/verifyUser";
// import checkBlocked from "../middlewares/checkBlocked";
import WishlistController from './../controllers/wishlist.controller';

const wishlistRouter = express.Router(); // Change the router name to wishlistRouter
const wishlistRepository = new WishlistRepository();
const wishlistUsecase = new WishlistUsecase(wishlistRepository);
const wishlistController = new WishlistController(wishlistUsecase);

// Route for creating a new course
wishlistRouter.post("/add-wishlist/:studentId/:courseId", (req: Request, res: Response) => {wishlistController.addToWishlist(req,res)});
wishlistRouter.delete("/remove-wishlist/:studentId/:courseId", (req: Request, res: Response) => {wishlistController.removeWishlist(req,res)});
wishlistRouter.get("/get-wishlist/:studentId", (req: Request, res: Response) => {wishlistController.getWishlist(req,res)});

export default wishlistRouter;

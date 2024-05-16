import { Request, Response } from "express";

interface IWishlistControllerInterface {
  addToWishlist(req: Request, res: Response): Promise<void>;
  getWishlist(req: Request, res: Response): Promise<void>;
  removeWishlist(req: Request, res: Response): Promise<void>;
}

export default IWishlistControllerInterface;

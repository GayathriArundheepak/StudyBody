import { Request, Response } from "express";

interface ICartControllerInterface {
  addToCart(req: Request, res: Response): Promise<void>;
  getCart(req: Request, res: Response): Promise<void>;
  removeFromCart(req: Request, res: Response): Promise<void>;
}

export default ICartControllerInterface;

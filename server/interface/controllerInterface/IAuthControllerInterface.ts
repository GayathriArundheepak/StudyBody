import { Request, Response } from "express";

// Define the interface for the Auth Controller
export default interface IAuthControllerInterface {
    userSignUp(req: Request, res: Response): Promise<void>;
    sendOTP(req: Request, res: Response): Promise<void>;
    verifyOTP(req: Request, res: Response): Promise<void>;
    userSignIn(req: Request, res: Response): Promise<void>;
    userSignOut(req: Request, res: Response): Promise<void>;
    userForgotPassword(req: Request, res: Response): Promise<void>;
}

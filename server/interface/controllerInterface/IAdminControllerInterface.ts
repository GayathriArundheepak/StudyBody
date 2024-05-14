import { Request, Response } from "express";

// Define the interface for the Admin Controller
export default interface IAdminControllerInterface {
    adminProfileUpdeate(req: Request, res: Response): Promise<void>;
    blockUser(req: Request, res: Response): Promise<void>;
    unblockUser(req: Request, res: Response): Promise<void>;
    approveTeacher(req: Request, res: Response): Promise<void>;
    disApproveTeacher(req: Request, res: Response): Promise<void>;
}

import { Request, Response } from "express";

// Define the interface for the Student Controller
export default interface IStudentControllerInterface {
    studentProfileUpdate(req: Request, res: Response): Promise<void>;
    getStudents(req: Request, res: Response): Promise<void>;
    // studentProfilePicUpload(req: Request, res: Response): Promise<void>;
}

import { Request, Response } from "express";

// Define the interface for the Teacher Controller
export default interface ITeacherControllerInterface {
  getTeachers(req: Request, res: Response): Promise<void>;
  teacherProfileUpdeate(req: Request, res: Response): Promise<void>;
  // teacherProfilePicUpload(req: Request, res: Response): Promise<void>;
}

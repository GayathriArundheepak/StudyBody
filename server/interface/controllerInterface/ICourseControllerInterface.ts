import { Request, Response } from "express";

interface ICourseControllerInterface {
    createCourse(req: Request, res: Response): Promise<void>;
    getCourses(req: Request, res: Response): Promise<void>;
    getCoursesByTeacher(req: Request, res: Response): Promise<void>;
    searchCourse(req: Request, res: Response): Promise<void>;
    deleteCourse(req: Request, res: Response): Promise<void>;
}

export default ICourseControllerInterface;

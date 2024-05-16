import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../enums/HttpStatus.enum";
import TeacherRepository from "../repositories/teacher.repository";
import errorHandler from "./errorHandler";
import StudentRepository from "../repositories/student.repository";

const studentRepository = new StudentRepository();

const teacherRepository = new TeacherRepository();

async function checkTeacherBlocked(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // const id = req.body._id; // Assuming you have user information available in the request
    // Assuming `id` needs to be extracted from the request
    const id = req.params._id; // Adjust this line according to your route structure

    const isBlocked = await teacherRepository.IsBlockTeacher(id);

    if (!isBlocked) {
      return res.status(HttpStatus.Forbidden).json({
        success: false,
        message: "Access denied. Your account has been blocked. Contact us",
      });
    }

    // If the user is not blocked, proceed to the next middleware or route handler
    next();
  } catch (error) {
    errorHandler(error, res);
  }
}

async function checkStudentBlocked(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Assuming you have user information available in the request and `id` needs to be extracted from the request
    const id = req.params._id; // Adjust this line according to your route structure

    const isBlocked = await studentRepository.IsBlockStudent(id);

    if (!isBlocked) {
      return res.status(HttpStatus.Forbidden).json({
        success: false,
        message: "Access denied. Your account has been blocked. Contact us",
      });
    }

    // If the user is not blocked, proceed to the next middleware or route handler
    next();
  } catch (error) {
    errorHandler(error, res);
  }
}

export { checkTeacherBlocked, checkStudentBlocked };

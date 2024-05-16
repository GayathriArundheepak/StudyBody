import { Request, Response } from "express";
import StudentUsecase from "../usecases/student.usecase";
import { HttpStatus } from "../enums/HttpStatus.enum";
import IStudentControllerInterface from "../interface/controllerInterface/IStudentCntollerInterface";
import errorHandler from "../middlewares/errorHandler";

class StudentController implements IStudentControllerInterface {
  private _studentUsecase: StudentUsecase;
  constructor(_studentUsecase: StudentUsecase) {
    this._studentUsecase = _studentUsecase;
  }

  async studentProfileUpdate(req: Request, res: Response) {
    try {
      const id: string = req.params._id;

      const response = await this._studentUsecase.studentProfileUpdeate(
        req.body,
        id
      );

      const statusCode = response?.success
        ? HttpStatus.success
        : HttpStatus.NotFound;

      res.status(statusCode).send({
        success: response?.success,
        message: response?.message,
        data: response?.updatedDetails,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async getStudents(req: Request, res: Response) {
    try {
      console.log(req);
      const response = await this._studentUsecase.getStudents();

      const statusCode = response.success
        ? HttpStatus.success
        : HttpStatus.NotFound;
      res.status(statusCode).send({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async getStudentById(req: Request, res: Response): Promise<void> {
    try {
      const studentId: string = req.params.id; // Assuming the student ID is provided as a route parameter
      const response = await this._studentUsecase.getStudentById(studentId);

      const statusCode = response.success
        ? HttpStatus.success
        : HttpStatus.NotFound;
      res.status(statusCode).send({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async updateStudentMylearning(req: Request, res: Response) {
    try {
      console.log("mylearing");
      const { studentId, courseId } = req.body;

      const response = await this._studentUsecase.updateStudentMylearning(
        studentId,
        courseId
      );
      const statusCode = response.success
        ? HttpStatus.success
        : HttpStatus.NotFound;
      res.status(statusCode).send({
        success: response.success,
        message: response.message,
        updatedStudent: response?.updatedStudent,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async getMyLearningCourses(req: Request, res: Response) {
    try {
      const studentId = req.params.studentId;
      console.log("studentid in controller:", studentId);
      const response = await this._studentUsecase.getMyLearningCourses(
        studentId
      );

      const statusCode = response.success
        ? HttpStatus.success
        : HttpStatus.NotFound;
      res.status(statusCode).send({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }
  async getUsers(req: Request, res: Response) {
    try {
      console.log(req.params);
      const currentPage: number =
        parseInt(req.params.currentPage as string) || 2; // Default to page 1 if not provided
      const limit: number = parseInt(req.params.limit as string) || 2; // Default limit to 10 if not provided
      console.log(limit);
      // Calculate skip value for pagination
      const skip = (currentPage - 1) * limit;

      // Fetch users data based on pagination parameters
      const response = await this._studentUsecase.getUsers(skip, limit);
      const statusCode = response.success
        ? HttpStatus.success
        : HttpStatus.NotFound;

      res.status(statusCode).send({
        success: response.success,
        message: response.message,
        data: response?.data,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }
}

export default StudentController;

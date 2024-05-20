import express, { Request, Response } from "express";
import StudentController from "../controllers/student.controller";
import StudentRepository from "../repositories/student.repository";
import StudentUsecase from "../usecases/student.usecase";
// import multer from 'multer';
import { verifyToken } from "../middlewares/verifyUser";

const studentRouter = express.Router();
const studentRepository = new StudentRepository();
const studentUsecase = new StudentUsecase(studentRepository);
const studentController = new StudentController(studentUsecase);

studentRouter.get("/studentsList",  verifyToken,(req: Request, res: Response) => {
  studentController.getStudents(req, res);
});
studentRouter.get("/:id", verifyToken, (req: Request, res: Response) => {
  studentController.getStudentById(req, res);
});
studentRouter.put(
  "/updateProfile/:_id",
  verifyToken,
  (req: Request, res: Response) => {
    studentController.studentProfileUpdate(req, res);
  }
);
studentRouter.post(
  "/update-students-mylearning", verifyToken,
  (req: Request, res: Response) => {
    studentController.updateStudentMylearning(req, res);
  }
);
studentRouter.get(
  "/mylearning/:studentId", verifyToken,
  verifyToken,
  (req: Request, res: Response) => {
    studentController.getMyLearningCourses(req, res);
  }
);
studentRouter.get(
  "/:currentPage/:itemsPerPAge", verifyToken,
  async (req: Request, res: Response) => {
    await studentController.getUsers(req, res);
  }
);

export default studentRouter;

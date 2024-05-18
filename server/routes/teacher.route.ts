import express, { Request, Response } from "express";
import TeacherController from "../controllers/teacher.controller";
import TeacherRepository from "../repositories/teacher.repository";
import TeacherUsecase from "../usecases/teacher.usecase";
import { verifyToken } from "../middlewares/verifyUser";
import { checkTeacherBlocked } from "../middlewares/checkBlocked";
// import multer from 'multer';

const teacherRouter = express.Router();
const teacherRepository = new TeacherRepository();
const teacherUsecase = new TeacherUsecase(teacherRepository);
const teacherController = new TeacherController(teacherUsecase);

teacherRouter.get("/teachersList", (req: Request, res: Response) => {
  teacherController.getTeachers(req, res);
});

teacherRouter.put(
  "/updateProfile/:_id",
  verifyToken,
  checkTeacherBlocked,
  (req: Request, res: Response) => {
    teacherController.teacherProfileUpdeate(req, res);
  }
);
teacherRouter.get("/:id", (req: Request, res: Response) => {
  teacherController.getTeacherById(req, res);
});

export default teacherRouter;

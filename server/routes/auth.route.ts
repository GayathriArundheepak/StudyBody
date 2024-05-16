import express, { Request, Response } from "express";
import AuthController from "../controllers/auth.controller";
import StudentRepository from "../repositories/student.repository";
import UserUsecase from "../usecases/auth.usecase";
import TeacherRepository from "../repositories/teacher.repository";
import OtpRepository from "../repositories/otp.repository";
import AdminRepository from "../repositories/admin.repository";

const authRouter = express.Router();
const studentRepository = new StudentRepository();
const teacherRepository = new TeacherRepository();
const adminRepository = new AdminRepository();
const otpRepository = new OtpRepository();
const authUsecase = new UserUsecase(
  studentRepository,
  teacherRepository,
  adminRepository,
  otpRepository
);
const authController = new AuthController(authUsecase);

authRouter.post("/register", (req: Request, res: Response) => {
  authController.userSignUp(req, res);
});
authRouter.post("/login", (req: Request, res: Response) => {
  authController.userSignIn(req, res);
});
authRouter.get("/signout", (req: Request, res: Response) => {
  authController.userSignOut(req, res);
});
authRouter.post("/forgotPassword", (req: Request, res: Response) => {
  authController.userForgotPassword(req, res);
});
authRouter.post("/otp-resend", (req: Request, res: Response) => {
  authController.sendOTP(req, res);
});
authRouter.post("/otp-verification", (req: Request, res: Response) => {
  authController.verifyOTP(req, res);
});

export default authRouter;

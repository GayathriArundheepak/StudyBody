import express, {Request,Response}from "express";
import AdminController from "../controllers/admin.controller";
import AdminRepository from "../repositories/admin.repository";
import StudentRepository from './../repositories/student.repository';
import AdminUsecase from '../usecases/admin.usecase';
import TeacherRepository from "../repositories/teacher.repository";
import CourseRepository from "../repositories/course.repository";



const adminRouter = express.Router();
const adminRepository =new AdminRepository();
const studentRepository =new StudentRepository();
const teacherRepository =new TeacherRepository();
const courseRepository =new CourseRepository();
const adminUsecase=new AdminUsecase(adminRepository,studentRepository,teacherRepository,courseRepository);
const adminController= new AdminController(adminUsecase)

adminRouter.put('/block-user/:userType/:_id',(req:Request, res:Response)=>{adminController.blockUser(req,res)})
adminRouter.put('/unblock-user/:userType/:_id',(req:Request, res:Response)=>{adminController.unblockUser(req,res)})
adminRouter.put('/approve-teacher/:_id',(req:Request, res:Response)=>{adminController.approveTeacher(req,res)})
adminRouter.put('/disApprove-teacher/:_id',(req:Request, res:Response)=>{adminController.disApproveTeacher(req,res)})
adminRouter.put('/updateProfile/:_id',(req:Request, res:Response)=>{adminController.adminProfileUpdeate(req,res)})

export default adminRouter;
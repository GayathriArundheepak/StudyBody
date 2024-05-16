import express, { Request, Response } from "express";
import CourseController from "../controllers/course.controller";
import CourseRepository from "../repositories/course.repository";
import StudentRepository from "../repositories/student.repository";
import CourseUsecase from "../usecases/course.usecase";
import { verifyToken } from "../middlewares/verifyUser";
import ConversationRepository from "../repositories/conversation.repository";
// import checkBlocked from "../middlewares/checkBlocked";

const courseRouter = express.Router();
const courseRepository = new CourseRepository();
const conversationRepository = new ConversationRepository();
// const studentRepository = new StudentRepository();
const courseUsecase = new CourseUsecase(courseRepository,conversationRepository);
const courseController = new CourseController(courseUsecase);

// Route for creating a new course
courseRouter.post("/create-course/:_id", (req: Request, res: Response) => {courseController.createCourse(req,res)});
courseRouter.put("/update-course/:_id/:courseId", (req: Request, res: Response) => {courseController.updateCourse(req,res)});
courseRouter.post('/coursesList', (req:Request, res:Response)=>{courseController.getCourses(req,res)});
courseRouter.get('/teachers_coursesList/:_id', (req:Request, res:Response)=>{courseController.getCoursesByTeacher(req,res)});
courseRouter.delete("/delete-course/:_id", (req: Request, res: Response) =>{courseController.deleteCourse(req, res)});
courseRouter.post("/update-course-students-list", (req: Request, res: Response) => { courseController.updateCourseStudentsList(req, res)});
courseRouter.post("/create-review/:_id", (req: Request, res: Response) => {courseController.createReview(req, res);});
courseRouter.post("/add-materials/:courseId/:teacherId", (req: Request, res: Response) => {courseController.addMaterials(req, res);});
courseRouter.get("/materials/:courseId", (req: Request, res: Response) => {courseController.getMaterials(req, res)});
courseRouter.get("/fetch-course/:courseId", (req: Request, res: Response) => {courseController.getCoursesById(req, res)});

courseRouter.post("/add-subjects", (req: Request, res: Response) => {courseController.addSubject(req, res)});
courseRouter.get('/subjects/:syllabus/:standard', (req, res) => courseController.getSubjects(req,res));

courseRouter.get('/search-course', (req:Request, res:Response)=>{courseController.searchCourse(req,res)});
courseRouter.get('/filter-course', (req:Request, res:Response)=>{courseController.filterCourse(req,res)});

courseRouter.put('/approve-course/:_id',(req:Request, res:Response)=>{courseController.approveCourse(req,res)})
courseRouter.put('/disApprove-course/:_id',(req:Request, res:Response)=>{courseController.disApproveCourse(req,res)})

export default courseRouter;

import { Request, Response } from "express";
import CourseUsecase from "../usecases/course.usecase";
import { HttpStatus } from "../enums/HttpStatus.enum";
import errorHandler from "../middlewares/errorHandler";
import ICourseControllerInterface from "../interface/controllerInterface/ICourseControllerInterface";
class CourseController implements ICourseControllerInterface {

   
    private courseUsecase: CourseUsecase;

    constructor(courseUsecase: CourseUsecase) {
        this.courseUsecase = courseUsecase;
    }

    async createCourse(req: Request, res: Response): Promise<void> {
        try {
            console.log('courseCreate')
            const id:string=req.params._id;
            const courseData = req.body; // Assuming the request body contains the course data
            console.log(courseData)
            const response= await this.courseUsecase.createCourse(courseData,id);
                        
            const statusCode =response?.success? HttpStatus.success:HttpStatus.NotFound
            res.status(statusCode).send({
                success:response?.success,
                message:response?.message,
                courseList:response?.newCourse,
              
            })
        } catch (error) {
            errorHandler(error, res);
        }
    }
    async updateCourse(req: Request, res: Response): Promise<void> {
        try {
            console.log('courseudate')
            const id:string=req.params._id;
            const courseId:string=req.params.courseId;
            const courseData = req.body; // Assuming the request body contains the course data
            console.log(courseData)
            const response= await this.courseUsecase.updateCourse(courseData,id,courseId);
                        
            const statusCode =response?.success? HttpStatus.success:HttpStatus.NotFound
            res.status(statusCode).send({
                success:response?.success,
                message:response?.message,
                courseList:response?.updatedCourse,
              
            })
        } catch (error) {
            errorHandler(error, res);
        }
    }
    async getCourses(req: Request, res: Response): Promise<void> {
        try {
            const courseData = req.body; // Assuming the request body contains the course data
            console.log(courseData)
            const response = await this.courseUsecase.getCourses(courseData);
            console.log(response)
            
            const statusCode =response?.success? HttpStatus.success:HttpStatus.NotFound
        
                                res.status(statusCode).send({
                                    success:response?.success,
                                    message:response?.message,
                                    courseList:response?.courseList,
                                  
                                })
        } catch (error) {
            errorHandler(error, res);
        }
    }
    async getCoursesByTeacher(req: Request, res: Response): Promise<void> {
        try {
            const id:string=req.params._id;
            const response = await this.courseUsecase.getCoursesByTeacher(id);
            console.log(response)
            const statusCode =response?.success? HttpStatus.success:HttpStatus.NotFound
        
                                res.status(statusCode).send({
                                    success:response?.success,
                                    message:response?.message,
                                    courseList:response?.courseList,
                                  
                                })
        } catch (error) {
            errorHandler(error, res);
        }
    }
    async getCoursesById(req: Request, res: Response): Promise<void> {
        try {
            const courseId:string=req.params.courseId;
            console.log('courseId',courseId)
            console.log('req.params:',req.params)
            const response = await this.courseUsecase.getCoursesById(courseId);
            console.log(response)
            const statusCode =response?.success? HttpStatus.success:HttpStatus.NotFound
        
                                res.status(statusCode).send({
                                    success:response?.success,
                                    message:response?.message,
                                    courseList:response?.courseList,
                                  
                                })
        } catch (error) {
            errorHandler(error, res);
        }
    }


   
    async searchCourse(req: Request, res: Response){
        try {
            const searchData: string | undefined = req.query.query as string | undefined;
            console.log(req.query)
            console.log(searchData)
            if (searchData !== undefined) {
    
            const response = await this.courseUsecase.searchCourse(searchData);
            const statusCode =response?.success? HttpStatus.success:HttpStatus.NotFound
        
            res.status(statusCode).send({
                success:response?.success,
                message:response?.message,
                courseList:response?.courseList,
              
            })
            }
        } catch (error) {
            errorHandler(error, res);
        }
    }
    async filterCourse(req: Request, res: Response){
        try {
            const searchData: string | undefined = req.query.query as string | undefined;
            console.log(req.query)
            console.log(searchData)
            if (searchData !== undefined) {
    
            const response = await this.courseUsecase.filterCourse(searchData);
            const statusCode =response?.success? HttpStatus.success:HttpStatus.NotFound
        
            res.status(statusCode).send({
                success:response?.success,
                message:response?.message,
                courseList:response?.filteredCourses,
            })
            }
        } catch (error) {
            errorHandler(error, res);
        }
    }

    async deleteCourse(req: Request, res: Response): Promise<void> {
        try {
            const courseId = req.params._id; // Assuming the course ID is passed as a parameter in the request
            const deletedCourse = await this.courseUsecase.deleteCourse(courseId);
            console.log('deletecourse')
            res.status(HttpStatus.success).send({
                success: true,
                message: "Course deleted successfully",
                data: deletedCourse
            });
        } catch (error) {
            errorHandler(error, res);
        }
    }

    async updateCourseStudentsList(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body)
            const { courseId, studentId } = req.body;
    console.log('haii studentsList')
    
            const response = await this.courseUsecase.updateCourseStudentsList(courseId, studentId);
            const statusCode = response.success ? HttpStatus.success : HttpStatus.NotFound;
    
            res.status(statusCode).send({
                success: response.success,
                message: response.message,
                courseDetails:response.courseDetails
            });
        } catch (error) {
            errorHandler(error, res);
        } 
    }
    
    async createReview(req: Request, res: Response): Promise<void> {
        try {
            console.log('CreateReview')
            const courseId:string=req.params._id;
            const ReviewData = req.body; // Assuming the request body contains the course data
            
            const response= await this.courseUsecase.createReview(courseId,ReviewData);
                        
            const statusCode =response?.success? HttpStatus.success:HttpStatus.NotFound
            res.status(statusCode).send({
                success:response.success,
                message:response.message,
                Review:response?.updatedCourse
              
            })
        } catch (error) {
            errorHandler(error, res);
        }
    } 
    
    async addMaterials(req: Request, res: Response): Promise<void> {
        try {
            const courseId: string = req.params.courseId;
            const teacherId: string = req.params.teacherId;
            const materials  = req.body.materials;
            console.log(req.body)
            console.log(courseId)
           

            const response = await this.courseUsecase.addMaterials(courseId,teacherId,materials);
    
            const statusCode = response.success ? HttpStatus.success : HttpStatus.NotFound;
            res.status(statusCode).send({
                success: response.success,
                message: response.message,
                updatedCourse: response.updatedCourse
            });
        } catch (error) {
            errorHandler(error, res);
        }
    }
    async getMaterials(req: Request, res: Response): Promise<void> {
        try {
          const courseId: string = req.params.courseId;
          console.log('haii')
          // Call the use case to fetch materials for the given courseId
          const response = await this.courseUsecase.getMaterials(courseId);
          const statusCode = response.success ? HttpStatus.success : HttpStatus.NotFound;
          res.status(statusCode).send({
              success: response.success,
              message: response.message,
              materials: response.materials
          });
        } catch (error) {
          errorHandler(error, res);
        }
      }
      async approveCourse(req : Request , res : Response){
        console.log(req.params)
try{

  const id:string=req.params._id;
 
 
  const response =await this.courseUsecase.approveCourse(id)
                  const statusCode =response.success? HttpStatus.success:HttpStatus.NotFound
    
                            res.status(statusCode).send({
                                success:response.success,
                                message:response.message,
                                data:response.Isapprovedcourse
                              
                            })
}catch(error){
    errorHandler(error, res);
}
    }
      async disApproveCourse(req : Request , res : Response){
        console.log(req.params)
try{

  const id:string=req.params._id;
 
 
  const response =await this.courseUsecase.disApproveCourse(id)
                  const statusCode =response.success? HttpStatus.success:HttpStatus.NotFound
    
                            res.status(statusCode).send({
                                success:response.success,
                                message:response.message,
                                data:response.Isapprovedcourse
                              
                            })
}catch(error){
    errorHandler(error, res);
}
    }

    async addSubject(req: Request, res: Response): Promise<void> {
        try {
            console.log('haii')
            const { syllabus, standard,subject } = req.body;
            const response = await this.courseUsecase.addSubject(syllabus, standard,subject);
            console.log(response)
            const statusCode =response.success? HttpStatus.success:HttpStatus.NotFound
    
                            res.status(statusCode).send({
                                success:response.success,
                                message:response.message,   
                            })
        } catch (error) {
            errorHandler(error, res);
        }
    }
    
    async getSubjects(req: Request, res: Response): Promise<void> {
        try {
          const { syllabus, standard } = req.params;
          console.log(syllabus,standard)
          const response = await this.courseUsecase.getSubjects(syllabus,standard);
          const statusCode =response.success? HttpStatus.success:HttpStatus.NotFound
    
          res.status(statusCode).send({
              success:response.success,
              message:response.message, 
              subjects:response?.subjects  
          })
        } catch (error) {
            errorHandler(error, res);
        }
      }
}

export default CourseController;

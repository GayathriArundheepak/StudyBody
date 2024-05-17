import {Request,Response} from "express"
import TeacherUsecase from "../usecases/teacher.usecase";
import { HttpStatus } from "../enums/HttpStatus.enum";
import ITeacherControllerInterface from "../interface/controllerInterface/ITeacherControllerInterface";
import errorHandler from "../middlewares/errorHandler";



class TeacherController implements ITeacherControllerInterface{
    private teacherUsecase:TeacherUsecase;
    constructor(teacherUsecase:TeacherUsecase){
        this.teacherUsecase=teacherUsecase;
    }

    async getTeachers(req: Request, res: Response) {
        try {
 
            const response = await this.teacherUsecase.getTeachers();
            
            
            const statusCode = response.success ? HttpStatus.success : HttpStatus.NotFound;
            res.status(statusCode).send({
                success: response.success,
                message: response.message,
                data: response.data,
            });
        } catch (error) {
            errorHandler(error, res);
        }
    }

    async teacherProfileUpdeate(req : Request , res : Response){
        console.log('profile')
     
        try{
            const id:string=req.params._id;
        console.log(req.body)
         const formData = req.body
            const response= await this.teacherUsecase.teacherProfileUpdeate(formData,id);
          
                      const statusCode =response.success? HttpStatus.success:HttpStatus.NotFound
        
                                res.status(statusCode).send({
                                    success:response.success,
                                    message:response.message,
                                    data:response.data
                                  
                                })
        
        }catch(error){
            errorHandler(error, res);
        
        }
            }   
            
            async getTeacherById(req: Request, res: Response): Promise<void> {
                try {
                  const teacherId: string = req.params.id; // Assuming the teacher ID is provided as a route parameter
                  const response = await this.teacherUsecase.getTeacherById(teacherId);
            
                  const statusCode = response.success ? HttpStatus.success : HttpStatus.NotFound;
                  res.status(statusCode).send({
                    success: response.success,
                    message: response.message,
                    data: response.data,
                  });
                } catch (error) {
                  errorHandler(error, res);
                }
              }
 
}

export default TeacherController
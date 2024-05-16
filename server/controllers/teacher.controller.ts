import { Request, Response } from "express";
import TeacherUsecase from "../usecases/teacher.usecase";
import { HttpStatus } from "../enums/HttpStatus.enum";
import ITeacherControllerInterface from "../interface/controllerInterface/ITeacherControllerInterface";
import errorHandler from "../middlewares/errorHandler";

class TeacherController implements ITeacherControllerInterface {
  private _teacherUsecase: TeacherUsecase;
  constructor(_teacherUsecase: TeacherUsecase) {
    this._teacherUsecase = _teacherUsecase;
  }

  async getTeachers(req: Request, res: Response) {
    try {
      const response = await this._teacherUsecase.getTeachers();

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

  async teacherProfileUpdeate(req: Request, res: Response) {
    console.log("profile");

    try {
      const id: string = req.params._id;
      console.log(req.body);
      const formData = req.body;
      const response = await this._teacherUsecase.teacherProfileUpdeate(
        formData,
        id
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

  // async teacherProfilePicUpload(req : Request , res : Response)   {
  //     try{
  //         if (!req.file) {
  //             return res.status(HttpStatus.BadRequest).send({
  //                 success: false,
  //                 message: 'No file received'
  //             });
  //         }
  //         const file: Express.Multer.File = req.file

  //         const id:string=req.params._id;
  //         console.log(id)
  //         const response= await this.teacherUsecase.teacherProfilePicUpload(file,id);
  //         const statusCode =response?.success? HttpStatus.success:HttpStatus.NotFound

  //         res.status(statusCode).send({
  //             success:response?.success,
  //             message:response?.message,

  //         })
  //     }catch(error){
  //         console.log(error)
  //         res.status(HttpStatus.ServerError).send({
  //          success:false,
  //          message:"Server error"
  //         })
  //     }
  // }
}

export default TeacherController;

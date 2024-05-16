// IStudentUsecaseInterface.ts

import { Express } from "express";
import IStudentBody from "../bodies/studentBody";

interface IStudentUsecaseInterface {
  studentProfileUpdeate(body: IStudentBody, id: string): Promise<any>;
  getStudents(): Promise<any>;
  studentProfilePicUpload(file: Express.Multer.File, id: string): Promise<any>;
  // Define other methods if needed
}

export default IStudentUsecaseInterface;

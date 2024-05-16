// ITeacherUsecaseInterface.ts

import { Express } from "express";
import ITeacherBody from "../bodies/teacherBody";

interface ITeacherUsecaseInterface {
  teacherProfileUpdeate(body: ITeacherBody, id: string): Promise<any>;
  getTeachers(): Promise<any>;
  // Define other methods if needed
}

export default ITeacherUsecaseInterface;

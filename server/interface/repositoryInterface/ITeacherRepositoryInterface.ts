import { Document } from "mongoose";
import ITeacherBody from '../bodies/teacherBody';

interface ITeacherRepositoryInterface {
  authenticateUser(email: string): Promise<Document<any, any, any> | null>;
  teacherSignUp(details: ITeacherBody): Promise<Document<any, any, any>>;
  otpApproval(email: string): Promise<Document<any, any, any> | null>;
  checktApproval(email: string): Promise<Document<any, any, any> | null>;
  teacherChangePassword(email: string, password: string): Promise<Document<any, any, any> | null>;
  teacherIdCheck(id: string): Promise<Document<any, any, any> | null>;
  teacherProfileUpdeate(updateBody: ITeacherBody, id: string): Promise<Document<any, any, any> | null>;
  blockTeacher(id: string): Promise<Document<any, any, any> | null>;
  unblockTeacher(id: string): Promise<Document<any, any, any> | null>;
  disApprovelTeacher(id: string): Promise<Document<any, any, any> | null>;
  approveTeacher(id: string): Promise<Document<any, any, any> | null>;
  getTeachers(): Promise<Document<any, any, any>[]>;
  teacherProfilePicUpload(filePath: string, id: string): Promise<Document<any, any, any> | null>;
  IsBlockTeacher(id: string);
}

export default ITeacherRepositoryInterface;

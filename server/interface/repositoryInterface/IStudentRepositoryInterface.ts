import IStudentBody from "../bodies/studentBody";
import IStudent from "../student";

interface IStudentRepositoryInterface {
  authenticateUser(email: string): Promise<IStudent | null>;
  studentSignUp(details: IStudentBody): Promise<IStudent>;
  studentChangePassword(email: string, password: string): Promise<void>;
  otpApproval(email: string): Promise<void>;
  checktApproval(email: string): Promise<boolean>;
  studentIdCheck(id: string): Promise<IStudent | null>;
  studentProfileUpdeate(updateBody: IStudentBody, id: string);
  studentProfilePicUpload(
    filePath: string,
    id: string
  ): Promise<IStudent | null>;
  blockStudent(id: string): Promise<IStudent | null>;
  unblockStudent(id: string): Promise<IStudent | null>;
  getStudents(): Promise<IStudent[]>;
}

export default IStudentRepositoryInterface;

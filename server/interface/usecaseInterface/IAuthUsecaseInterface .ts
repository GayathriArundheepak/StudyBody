// IAuthUsecaseInterface.ts
import IStudentBody from '../bodies/studentBody';
import IOTP from "../otp";
import ITeacherBody from "../bodies/teacherBody";
import IAdminBody from "../bodies/adminBody";


interface IAuthUsecaseInterface {
    userSignUp(body: IStudentBody | ITeacherBody): Promise<any>;
    sendOTP(body: IOTP): Promise<any>;
    verifyOTP(body: any): Promise<any>;
    userSignIn(body: IStudentBody | ITeacherBody | IAdminBody): Promise<any>;
    userForgotPassword(body: IStudentBody | ITeacherBody | IAdminBody): Promise<any>;
    // Add other methods if needed
}

export default IAuthUsecaseInterface;

import AdminRepository from "../repositories/admin.repository";
import StudentRepository from "../repositories/student.repository";
import TeacherRepository from "./../repositories/teacher.repository";
import IAdminUsecaseInterface from "../interface/usecaseInterface/IAdminUsecaseInterface";
import IAdminBody from "../interface/bodies/adminBody";
import bcrypt from "bcrypt";
import CourseRepository from "../repositories/course.repository";
import { UserType } from "../enums/Usertype.enum";

class AdminUsecase implements IAdminUsecaseInterface {
  private _adminRepository: AdminRepository;
  private _studentRepository: StudentRepository;
  private _teacherRepository: TeacherRepository;
  private _courseRepository: CourseRepository;

  constructor(
    _adminRepository: AdminRepository,
    _studentRepository: StudentRepository,
    _teacherRepository: TeacherRepository,
    _courseRepository: CourseRepository
  ) {
    (this._adminRepository = _adminRepository),
      (this._studentRepository = _studentRepository);
    this._teacherRepository = _teacherRepository;
    this._courseRepository = _courseRepository;
  }

  // student managenent
  // block student
  async blockUser(id: string, userType: string) {
    try {
      if (userType === UserType.Student) {
        const studentExist = await this._studentRepository.studentIdCheck(id);
        if (studentExist) {
          const IsBlockStudent = await this._studentRepository.blockStudent(id);

          return {
            success: true,
            message: "student blocked success",
          };
        } else {
          return {
            success: false,
            message: "student not exist",
          };
        }
      } else if (userType === UserType.Teacher) {
        const teacherExist = await this._teacherRepository.teacherIdCheck(id);
        if (teacherExist) {
          const IsBlockTeacher = await this._teacherRepository.blockTeacher(id);

          return {
            success: true,
            message: "teacher blocked success",
          };
        } else {
          return {
            success: false,
            message: "teacher not exist",
          };
        }
      } else {
        return {
          success: false,
          message: "user not exist",
        };
      }
    } catch (error) {
      console.log(error);

      throw new Error(`Failed to execute block student :${error}`);
    }
  }
  // unblock student
  async unblockUser(id: string, userType: string) {
    try {
      if (userType === UserType.Student) {
        const studentExist = await this._studentRepository.studentIdCheck(id);
        if (studentExist) {
          await this._studentRepository.unblockStudent(id);
          return {
            success: true,
            message: "student unblocked success",
          };
        } else {
          return {
            success: false,
            message: "student not exist",
          };
        }
      } else if (userType === UserType.Teacher) {
        const teacherExist = await this._teacherRepository.teacherIdCheck(id);
        if (teacherExist) {
          await this._teacherRepository.unblockTeacher(id);
          return {
            success: true,
            message: "teacher unblocked success",
          };
        } else {
          return {
            success: false,
            message: "teacher not exist",
          };
        }
      } else {
        return {
          success: false,
          message: "user not exist",
        };
      }
    } catch (error) {
      console.log(error);

      throw new Error(`Failed to execute unblock teacher :${error}`);
    }
  }

  async approveTeacher(id: string) {
    try {
      const teacherExist = await this._teacherRepository.teacherIdCheck(id);
      if (teacherExist) {
        const IsapprovedTeacher = await this._teacherRepository.approveTeacher(
          id
        );

        return {
          success: true,
          message: "teacher approved successfully",
        };
      } else {
        return {
          success: false,
          message: "teacher not exist",
        };
      }
    } catch (error) {
      console.log(error);

      throw new Error(`Failed to execute block student :${error}`);
    }
  }

  async disApproveTeacher(id: string) {
    try {
      const teacherExist = await this._teacherRepository.teacherIdCheck(id);
      if (teacherExist) {
        await this._teacherRepository.disApprovelTeacher(id);
        return {
          success: true,
          message: "teacher removed successfully",
        };
      } else {
        return {
          success: false,
          message: "teacher not exist",
        };
      }
    } catch (error) {
      console.log(error);

      throw new Error(`Failed to execute unblock teacher :${error}`);
    }
  }

  async adminProfileUpdeate(body: IAdminBody, id: string) {
    try {
      console.log(id);
      console.log(body);
      const adminExist = await this._adminRepository.adminIdCheck(id);

      if (adminExist) {
        const password = body.password;

        if (password) {
          const hashedPassword: string = await bcrypt.hash(
            password as string,
            10
          );
          const updateBody: IAdminBody = { ...body, password: hashedPassword };
          await this._adminRepository.adminProfileUpdeate(updateBody, id);
          return {
            success: true,
            message: "profile updated",
          };
        } else {
          const { password, ...updateBody } = body;
          const adminDetails = await this._adminRepository.adminProfileUpdeate(
            updateBody,
            id
          );
          if (adminDetails) {
            return {
              success: true,
              message: "profile updated",
              data: adminDetails,
            };
          } else {
            return {
              success: false,
              message: "this user does not exist 1",
            };
          }
        }
      } else {
        return {
          success: false,
          message: "this user does not exist 1",
        };
      }
    } catch (error) {
      console.log(error);

      throw new Error(`Failed to execute admin sign-up:${error}`);
    }
  }
}
export default AdminUsecase;

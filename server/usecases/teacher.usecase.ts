import bcrypt from "bcrypt";
import TeacherRepository from "../repositories/teacher.repository";
import ITeacherBody from "../interface/bodies/teacherBody";
import teacherRouter from "./../routes/teacher.route";
import ITeacherUsecaseInterface from "../interface/usecaseInterface/ITeacherUsecaseInterface";

class TeacherUsecase implements ITeacherUsecaseInterface {
  private teacherRepository: TeacherRepository;

  constructor(teacherRepository: TeacherRepository) {
    this.teacherRepository = teacherRepository;
  }

  async teacherProfileUpdeate(body: ITeacherBody, id: string) {
    try {
      console.log(id);
      console.log(body);
      const teacherExist = await this.teacherRepository.teacherIdCheck(id);

      if (teacherExist) {
        const password = body.password;

        if (password) {
          const hashedPassword: string = await bcrypt.hash(
            password as string,
            10
          );
          const updateBody: ITeacherBody = {
            ...body,
            password: hashedPassword,
          };
          await this.teacherRepository.teacherProfileUpdeate(updateBody, id);
          return {
            success: true,
            message: "profile updated",
          };
        } else {
          const { password, ...updateBody } = body;
          const teacherDetails =
            await this.teacherRepository.teacherProfileUpdeate(updateBody, id);
          if (teacherDetails) {
            return {
              success: true,
              message: "profile updated",
              data: teacherDetails,
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

      throw new Error(`Failed to execute teacher sign-up:${error}`);
    }
  }

  async getTeachers() {
    try {
      console.log("haii getteacher usecase");
      const teachersDetails = await this.teacherRepository.getTeachers();

      console.log(teachersDetails);
      if (teachersDetails) {
        return {
          success: true,
          message: " teachersDetails   found",
          data: teachersDetails,
        };
      } else {
        return {
          success: false,
          message: " teachersDetails  not found",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: " teachersDetails  not found",
      };
    }
  }

  async getTeacherById(id: string) {
    try {
      const teacher = await this.teacherRepository.getTeacherById(id);
      if (teacher) {
        return {
          success: true,
          message: "Teacher found",
          data: teacher,
        };
      } else {
        return {
          success: false,
          message: "Teacher not found",
        };
      }
    } catch (error) {
      console.error("Error getting Teacher:", error);
      return {
        success: false,
        message: "Failed to get Teacher",
      };
    }
  }
}
export default TeacherUsecase;

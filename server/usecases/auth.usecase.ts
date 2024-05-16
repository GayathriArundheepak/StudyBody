import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import StudentRepository from "../repositories/student.repository";
import TeacherRepository from "../repositories/teacher.repository";
import OtpRepository from "../repositories/otp.repository";
import IAuthUsecaseInterface from "../interface/usecaseInterface/IAuthUsecaseInterface ";
import IStudentBody from "../interface/bodies/studentBody";
import IOTP from "../interface/otp";
import JwtAuthService from "../config/jwtAuthService";
import ITeacherBody from "../interface/bodies/teacherBody";
import AdminRepository from "./../repositories/admin.repository";
import IAdminBody from "../interface/bodies/adminBody";
import { UserType } from "../enums/Usertype.enum";
const JWT_SECRET = process.env.JWT_SECRET as string;
const jwtAuthService = new JwtAuthService(JWT_SECRET);

class authUsecase implements IAuthUsecaseInterface {
  private _studentRepository: StudentRepository;
  private _teacherRepository: TeacherRepository;
  private _adminRepository: AdminRepository;
  private _otpRepository: OtpRepository;
  constructor(
    _studentRepository: StudentRepository,
    _teacherRepository: TeacherRepository,
    _adminRepository: AdminRepository,
    _otpRepository: OtpRepository
  ) {
    this._studentRepository = _studentRepository;
    this._teacherRepository = _teacherRepository;
    this._otpRepository = _otpRepository;
    this._adminRepository = _adminRepository;
  }
  async userSignUp(body: IStudentBody | ITeacherBody) {
    try {
      let user;
      let userType;
      if (body.userType === UserType.Student) {
        user = await this._studentRepository.authenticateUser(body.email);
        userType = UserType.Student;
        console.log(userType);
      } else if (body.userType === UserType.Teacher) {
        user = await this._teacherRepository.authenticateUser(body.email);
        userType = UserType.Teacher;
      }

      if (!user && typeof body.password === "string") {
        const hashedPassword: string = bcrypt.hashSync(body.password, 10);
        if (userType === UserType.Student) {
          const { username, email, gender, date_of_birth } =
            body as IStudentBody;
          const studentDetails = await this._studentRepository.studentSignUp({
            username,
            email,
            password: hashedPassword,
            gender,
            date_of_birth,
          });
          if (studentDetails) {
            const otpResponse = await this.sendOTP({ email });

            return {
              success: true,
              message:
                "Student registered successfully, OTP sent for verification",
            };
          } else {
            return {
              success: false,
              message: "student details not readable  ",
            };
          }
        } else if (userType === UserType.Teacher) {
          const { username, email, gender } = body as ITeacherBody;
          const teacherDetails = await this._teacherRepository.teacherSignUp({
            username,
            email,
            password: hashedPassword,
            gender,
          });
          if (teacherDetails) {
            const otpResponse = await this.sendOTP({ email });
            return {
              success: true,
              message: " registered successfully, OTP sent for verification",
            };
          } else {
            return {
              success: false,
              message: " details not readable  ",
              data: userType,
            };
          }
        }
      } else {
        return {
          success: false,
          message: ` user already registered as  ${userType} `,
        };
      }
    } catch (error) {
      console.log(error);

      throw new Error(`Failed to execute student sign-up:${error}`);
    }
  }

  async sendOTP(body: IOTP) {
    try {
      const email = body.email;
      console.log(email);
      const otp: string = `${Math.floor(1000 + Math.random() * 9000)}`;

      // Create a transporter
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: "gayathri.a1804@gmail.com",
          pass: "ugwonwxiwyvjqvnk",
        },
      });

      const sendOTPEmail = (email: string, otp: string) => {
        const mailOptions = {
          from: "gayathri.a1804@gmail.com",
          to: email,
          subject: "OTP Verification",
          text: `Your OTP for login is: ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("Error sending email:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        });
      };
      sendOTPEmail(email, otp);
      // Hash the OTP using bcrypt
      const hashedOTP = bcrypt.hashSync(otp, 10);
      console.log(` hashedotp ${hashedOTP}`);
      // Save the hashed OTP and email to the 'details' object
      const details = {
        email: email,
        otp: hashedOTP,
      };

      const otpDetails = await this._otpRepository.storeOtp(details);
      console.log(otpDetails);
      if (!otpDetails) {
        return {
          success: false,
          message: "otp can't stored",
        };
      }
      return {
        success: true,
        message: "otp send to the email  ",
        data: otp,
      };
    } catch (error) {
      throw new Error(`Failed to execute sent otp:${error}`);
    }
  }

  async verifyOTP(body: { email: string; otp: string }) {
    try {
      const { email, otp } = body;

      // Retrieve the hashed OTP from the repository
      const storedOtp = await this._otpRepository.getHashedOTPByEmail(email);

      if (!storedOtp) {
        // No OTP found for the given email
        return {
          success: false,
          message: "Invalid credentials",
        };
      }

      // Compare the provided OTP with the stored hashed OTP
      const matchOtp = await bcrypt.compare(otp, storedOtp);

      if (matchOtp) {
        // OTP matched, proceed with further actions

        // Authenticate the user based on the email
        const user = await this._studentRepository.authenticateUser(email);

        if (user) {
          // User found, approve OTP using student repository
          await this._studentRepository.otpApproval(email);
        } else {
          // User not found, approve OTP using teacher repository
          await this._teacherRepository.otpApproval(email);
        }

        return {
          success: true,
          message: "OTP matched successfully",
        };
      } else {
        // Provided OTP does not match stored OTP
        return {
          success: false,
          message: "Invalid credentials",
        };
      }
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to execute OTP verification: ${error}`);
    }
  }

  async userSignIn(body: IStudentBody | ITeacherBody | IAdminBody) {
    try {
      let user;

      let userType;
      let isApproved;
      if (body.userType === UserType.Student) {
        user = await this._studentRepository.authenticateUser(body.email);
        isApproved = await this._studentRepository.checktApproval(body.email);
        userType = UserType.Student;
      } else if (body.userType === UserType.Teacher) {
        user = await this._teacherRepository.authenticateUser(body.email);
        isApproved = await this._teacherRepository.checktApproval(body.email);
        console.log("isApproval:", isApproved);
        userType = UserType.Teacher;
      } else {
        user = await this._adminRepository.authenticateUser(body.email);
        isApproved = await this._adminRepository.checktApproval(body.email);
        userType = UserType.Admin;
      }

      if (user && isApproved && typeof body.password === "string") {
        const matchPassword = await bcrypt.compare(
          body.password,
          user.password as string
        );
        if (matchPassword) {
          const token = await jwtAuthService.generateToken({ id: user._id });

          return {
            success: true,
            message: "signIn successfully  ",
            data: user,
            token,
            userType,
          };
        } else {
          return {
            success: false,
            message: "Invalid  credentials  ",
          };
        }
      } else {
        return {
          success: false,
          message: "user is not verified,or not exist  ",
          data: null,
        };
      }
    } catch (error) {
      console.log(error);

      throw new Error(`Failed to execute student sign-In:${error}`);
    }
  }

  async userForgotPassword(body: IStudentBody | ITeacherBody | IAdminBody) {
    try {
      let user;
      let userType;
      if (body.userType === UserType.Student) {
        user = await this._studentRepository.authenticateUser(body.email);
        userType = UserType.Student;
      } else if (body.userType === UserType.Teacher) {
        user = await this._teacherRepository.authenticateUser(body.email);
        userType = UserType.Teacher;
      } else {
        user = await this._adminRepository.authenticateUser(body.email);
        userType = UserType.Admin;
      }

      if (user && typeof body.password === "string") {
        const hashedPassword: string = bcrypt.hashSync(body.password, 10);
        if (userType === UserType.Student) {
          const { email, password } = body as IStudentBody;
          const otpResponse = await this.sendOTP({ email });
          const hashedPassword: string = await bcrypt.hash(
            password as string,
            10
          );
          await this._studentRepository.studentChangePassword(
            email,
            hashedPassword
          );

          return {
            success: true,
            message: "password changed",
            // data:otpResponse?.data
          };
        } else if (userType === UserType.Teacher) {
          const { email, password } = body as ITeacherBody;
          const otpResponse = await this.sendOTP({ email });
          const hashedPassword: string = await bcrypt.hash(
            password as string,
            10
          );
          await this._teacherRepository.teacherChangePassword(
            email,
            hashedPassword
          );

          return {
            success: true,
            message: "password changed",
            // data:otpResponse?.data
          };
        } else {
          return {
            success: false,
            message:
              "This email Id already used or this student is already exist ",
          };
        }
      } else {
        return {
          success: false,
          message: `The ${userType} not exist`,
        };
      }
    } catch (error) {
      console.log(error);

      throw new Error(`Failed to execute student sign-up:${error}`);
    }
  }
}
export default authUsecase;

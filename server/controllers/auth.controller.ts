import { Request, Response } from "express";
import AuthUsecase from "../usecases/auth.usecase";
import { HttpStatus } from "../enums/HttpStatus.enum";
import IAuthControllerInterface from "../interface/controllerInterface/IAuthControllerInterface";
import errorHandler from "../middlewares/errorHandler";

class AuthController implements IAuthControllerInterface {
  private _authUsecase: AuthUsecase;
  constructor(_authUsecase: AuthUsecase) {
    this._authUsecase = _authUsecase;
  }

  async userSignUp(req: Request, res: Response) {
    try {
      console.log(req.body);
      const response = await this._authUsecase.userSignUp(req.body);

      const statusCode = response?.success
        ? HttpStatus.success
        : HttpStatus.NotFound;
      console.log(response);
      res.status(statusCode).send({
        success: response?.success,
        message: response?.message,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async sendOTP(req: Request, res: Response) {
    try {
      console.log(req.body);
      const response = await this._authUsecase.sendOTP(req.body);
      const statusCode = response?.success
        ? HttpStatus.success
        : HttpStatus.NotFound;

      res.status(statusCode).send({
        success: response?.success,
        message: response?.message,
        data: response?.data,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async verifyOTP(req: Request, res: Response) {
    try {
      const response = await this._authUsecase.verifyOTP(req.body);
      const statusCode = response?.success
        ? HttpStatus.success
        : HttpStatus.NotFound;

      res.status(statusCode).send({
        success: response?.success,
        message: response?.message,
        // data:response?.data,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async userSignIn(req: Request, res: Response) {
    try {
      console.log(req.body);
      const response = await this._authUsecase.userSignIn(req.body);
      console.log(response);
      const statusCode = response.success
        ? HttpStatus.success
        : HttpStatus.Unauthorized;
      if (response.success) {
        const expiryDate: Date = new Date(Date.now() + 3600000);
        res.cookie("access_token", response?.token, {
          httpOnly: true,
          expires: expiryDate,
        });
      }
      res.status(statusCode).send({
        success: response.success,
        message: response.message,
        data: response?.data,
        userType: response?.userType,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async userSignOut(req: Request, res: Response) {
    try {
      res.clearCookie("access_token");

      res.status(HttpStatus.success).send({
        success: true,
        message: "user signout sucessfully",
        userType: "student",
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async userForgotPassword(req: Request, res: Response) {
    try {
      const response = await this._authUsecase.userForgotPassword(req.body);

      const statusCode = response?.success
        ? HttpStatus.success
        : HttpStatus.NotFound;

      res.status(statusCode).send({
        success: response?.success,
        message: response?.message,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }
}
export default AuthController;

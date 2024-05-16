import { Request, Response } from "express";
import AdminUsecase from "../usecases/admin.usecase";

import { HttpStatus } from "../enums/HttpStatus.enum";
import IAdminControllerInterface from "../interface/controllerInterface/IAdminControllerInterface";
import errorHandler from "../middlewares/errorHandler";

class AdminController implements IAdminControllerInterface {
  private _adminUsecase: AdminUsecase;
  constructor(_adminUsecase: AdminUsecase) {
    this._adminUsecase = _adminUsecase;
  }

  async adminProfileUpdeate(req: Request, res: Response) {
    try {
      const id: string = req.params._id;
      console.log(req.body);
      const formData = req.body;
      const response = await this._adminUsecase.adminProfileUpdeate(
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

  async blockUser(req: Request, res: Response) {
    console.log(req.params);
    try {
      const id: string = req.params._id;
      const userType: string = req.params.userType;

      const response = await this._adminUsecase.blockUser(id, userType);
      const statusCode = response.success
        ? HttpStatus.success
        : HttpStatus.NotFound;

      res.status(statusCode).send({
        success: response.success,
        message: response.message,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async unblockUser(req: Request, res: Response) {
    try {
      const id: string = req.params._id;
      const userType: string = req.params.userType;

      const response = await this._adminUsecase.unblockUser(id, userType);
      const statusCode = response.success
        ? HttpStatus.success
        : HttpStatus.NotFound;

      res.status(statusCode).send({
        success: response.success,
        message: response.message,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }
  async approveTeacher(req: Request, res: Response) {
    console.log(req.params);
    try {
      const id: string = req.params._id;

      const response = await this._adminUsecase.approveTeacher(id);
      const statusCode = response.success
        ? HttpStatus.success
        : HttpStatus.NotFound;

      res.status(statusCode).send({
        success: response.success,
        message: response.message,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }
  async approvecourse(req: Request, res: Response) {
    console.log(req.params);
    try {
      const id: string = req.params._id;

      const response = await this._adminUsecase.approveTeacher(id);
      const statusCode = response.success
        ? HttpStatus.success
        : HttpStatus.NotFound;

      res.status(statusCode).send({
        success: response.success,
        message: response.message,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async disApproveTeacher(req: Request, res: Response) {
    try {
      const id: string = req.params._id;

      const response = await this._adminUsecase.disApproveTeacher(id);
      const statusCode = response.success
        ? HttpStatus.success
        : HttpStatus.NotFound;

      res.status(statusCode).send({
        success: response.success,
        message: response.message,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }
}

export default AdminController;

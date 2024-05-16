import { Request, Response } from "express";
import ConversationUsecase from "../usecases/conversation.usecase";
import { HttpStatus } from "../enums/HttpStatus.enum";
import errorHandler from "../middlewares/errorHandler";
// import ICartControllerInterface from "../interface/controllerInterface/ICartControllerInterface";
// implements ICartControllerInterface
class ConversationController {
  private _conversationUsecase: ConversationUsecase;

  constructor(_conversationUsecase: ConversationUsecase) {
    this._conversationUsecase = _conversationUsecase;
  }

  async createNewConversation(req: Request, res: Response): Promise<void> {
    try {
      console.log("createNewConversation");
      const { senderId, receiverId } = req.body;
      const response = await this._conversationUsecase.createNewConversation(
        senderId,
        receiverId
      );

      const statusCode = response?.success
        ? HttpStatus.success
        : HttpStatus.NotFound;
      res.status(statusCode).send({
        success: response?.success,
        message: response?.message,
        conversation: response?.data,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }
  async getConversationsByUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const response = await this._conversationUsecase.getConversationsByUserId(
        userId
      );

      const statusCode = response?.success
        ? HttpStatus.success
        : HttpStatus.NotFound;
      res.status(statusCode).send({
        success: response?.success,
        message: response?.message,
        conversations: response?.conversations,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async findConversationByUserIds(req: Request, res: Response): Promise<void> {
    try {
      const { firstUserId, secondUserId } = req.params;
      const response =
        await this._conversationUsecase.findConversationByUserIds(
          firstUserId,
          secondUserId
        );
      const statusCode = response?.success
        ? HttpStatus.success
        : HttpStatus.NotFound;
      res.status(statusCode).send({
        success: response?.success,
        message: response?.message,
        conversations: response?.data,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }
}
export default ConversationController;

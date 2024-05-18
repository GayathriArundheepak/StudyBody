import express, { Request, Response } from "express";
import MessageRepository from "../repositories/message.repository";
import MessageUsecase from "../usecases/messageUsecase";
import MessageController from "../controllers/message.controller";
import { verifyToken } from "../middlewares/verifyUser";
const messageRouter = express.Router();
const messageRepository = new MessageRepository();
const messageUsecase = new MessageUsecase(messageRepository);
const messageController = new MessageController(messageUsecase);

messageRouter.post("/", verifyToken, (req: Request, res: Response) => {
  messageController.addMessage(req, res);
});

messageRouter.get(
  "/:conversationId",
  verifyToken,
  (req: Request, res: Response) => {
    messageController.getMessagesByConversationId(req, res);
  }
);

export default messageRouter;

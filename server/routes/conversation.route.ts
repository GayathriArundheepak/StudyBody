import express, { Request, Response } from "express";

import ConversationRepository from "../repositories/conversation.repository";
import ConversationUsecase from "../usecases/conversation.usecase";
import { verifyToken } from "../middlewares/verifyUser";
import {
  checkTeacherBlocked,
  checkStudentBlocked,
} from "../middlewares/checkBlocked";
import ConversationController from "./../controllers/conversation.Controller";

const conversationRouter = express.Router(); // Change the router name to cartRouter
const conversationRepository = new ConversationRepository();
const conversationUsecase = new ConversationUsecase(conversationRepository);
const conversationController = new ConversationController(conversationUsecase);

conversationRouter.post("/", (req: Request, res: Response) => {
  conversationController.createNewConversation(req, res);
});
conversationRouter.get(
  "/:userId",
  verifyToken,

  (req: Request, res: Response) => {
    conversationController.getConversationsByUserId(req, res);
  }
);
conversationRouter.get(
  "/find/:firstUserId/:secondUserId",
  verifyToken,

  (req: Request, res: Response) => {
    conversationController.findConversationByUserIds(req, res);
  }
);
export default conversationRouter;

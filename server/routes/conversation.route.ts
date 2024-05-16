import express, { Request, Response } from "express";

import ConversationRepository from "../repositories/conversation.repository";
import ConversationUsecase from "../usecases/conversation.usecase";
import { verifyToken } from "../middlewares/verifyUser";
// import checkBlocked from "../middlewares/checkBlocked";
import ConversationController from "./../controllers/conversation.Controller";

const conversationRouter = express.Router(); // Change the router name to cartRouter
const conversationRepository = new ConversationRepository();
const conversationUsecase = new ConversationUsecase(conversationRepository);
const conversationController = new ConversationController(conversationUsecase);

conversationRouter.post("/", (req: Request, res: Response) => {
  conversationController.createNewConversation(req, res);
});
conversationRouter.get("/:userId", (req: Request, res: Response) => {
  conversationController.getConversationsByUserId(req, res);
});
conversationRouter.get(
  "/find/:firstUserId/:secondUserId",
  (req: Request, res: Response) => {
    conversationController.findConversationByUserIds(req, res);
  }
);
export default conversationRouter;
// conversationController.addToCart(req, res)

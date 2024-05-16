import Messages from "../models/message.model";
import IMessage from "../interface/message";

class MessageRepository {
  async addMessage(messageData: IMessage) {
    try {
      const newMessage = new Messages(messageData);
      const savedMessage = await newMessage.save();
      return savedMessage;
    } catch (error) {
      throw new Error(`Failed to add message: ${error}`);
    }
  }

  async getMessagesByConversationId(conversationId: string) {
    try {
      const messages = await Messages.find({ conversationId });
      return messages;
    } catch (error) {
      throw new Error(
        `Failed to get messages for conversation ${conversationId}: ${error}`
      );
    }
  }
}

export default MessageRepository;

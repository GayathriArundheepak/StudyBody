import MessageRepository from "../repositories/message.repository";

class MessageUsecase {
  private _messageRepository: MessageRepository;

  constructor(_messageRepository: MessageRepository) {
    this._messageRepository = _messageRepository;
  }

  async addMessage(messageData: any) {
    try {
      const message = await this._messageRepository.addMessage(messageData);
      return {
        success: true,
        message: "Message added successfully",
        data: message,
      };
    } catch (error) {
      throw new Error(`Failed to add message: ${error}`);
    }
  }

  async getMessagesByConversationId(conversationId: string) {
    try {
      const messages =
        await this._messageRepository.getMessagesByConversationId(
          conversationId
        );
      return {
        success: true,
        message: "Messages retrieved successfully",
        messages: messages,
      };
    } catch (error) {
      throw new Error(
        `Failed to get messages for conversation ID ${conversationId}: ${error}`
      );
    }
  }
}

export default MessageUsecase;

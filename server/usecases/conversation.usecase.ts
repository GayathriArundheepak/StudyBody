import ConversationRepository from "../repositories/conversation.repository";

class ConversationUsecase {
  private conversationRepository: ConversationRepository;

  constructor(conversationRepository: ConversationRepository) {
    this.conversationRepository = conversationRepository;
  }

  async createNewConversation(senderId: string, receiverId: string) {
    try {
      // Check if a course with the same course_title already exists
      const conversation =
        await this.conversationRepository.createNewConversation(
          senderId,
          receiverId
        );
      return {
        success: true,
        message: "conversation created",
        data: conversation,
      };
    } catch (error) {
      throw new Error(`Failed to create conversation: ${error}`);
    }
  }

  async getConversationsByUserId(userId: string) {
    try {
      const conversations =
        await this.conversationRepository.getConversationsByUserId(userId);
      return {
        success: true,
        message: "Conversations retrieved successfully",
        conversations: conversations,
      };
    } catch (error) {
      throw new Error(`Failed to get conversations by user ID: ${error}`);
    }
  }

  async findConversationByUserIds(firstUserId: string, secondUserId: string) {
    try {
      const conversation =
        await this.conversationRepository.findConversationByUserIds(
          firstUserId,
          secondUserId
        );
      return {
        success: true,
        message: "conversation fetched",
        data: conversation,
      };
    } catch (error) {
      throw new Error(
        `Failed to find conversation between ${firstUserId} and ${secondUserId}: ${error}`
      );
    }
  }
}

export default ConversationUsecase;

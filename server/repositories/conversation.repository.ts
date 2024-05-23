import mongoose, { ObjectId, Schema, Types } from "mongoose";
import Conversations from "../models/conversation.model";
import IConversation from "../interface/conversation";
// implements ICartRepositoryInterface

class ConversationRepository {
  async createNewConversation(senderId: string, receiverId: string) {
    try {
      const newConversation = new Conversations({
        members: [senderId, receiverId],
      });

      const savedConversation = await newConversation.save();

      return savedConversation;
    } catch (error) {
      throw new Error(`Failed to create conversation: ${error}`);
    }
  }

  
  async createNewCommunity(
    teacherId: string,
    course_title: string,
    studentIds: ObjectId[]
  ) {
    try {
      // Create a new conversation object for the community chat
      const newCommunity = new Conversations({
        members: [teacherId, ...studentIds],
        conversationName: course_title,
        isGroup: true,
      });

      // Save the community chat to the database
      const savedCommunity = await newCommunity.save();

      return savedCommunity;
    } catch (error) {
      throw new Error(`Failed to create community chat: ${error}`);
    }
  }

  async getConversationsByUserId(userId: string): Promise<IConversation[]> {
    console.log("getconv");
    try {
      const conversations = await Conversations.find({
        members: { $in: [userId] },
      });
      return conversations;
    } catch (error) {
      throw new Error(
        `Failed to get conversations for user ${userId}: ${error}`
      );
    }
  }
  async findConversationByUserIds(
    firstUserId: string,
    secondUserId: string
  ): Promise<IConversation | null> {
    try {
      const conversation = await Conversations.findOne({
        members: { $all: [firstUserId, secondUserId], $size: 2 }, // Ensure there are exactly two members
      });
      return conversation;
    } catch (error) {
      throw new Error(
        `Failed to find conversation between ${firstUserId} and ${secondUserId}: ${error}`
      );
    }
  }

  async addMemberToConversation(communityId: string, memberId: string) {
    try {
      // Find the conversation by its ID
      const conversation = await Conversations.findById(communityId);

      if (!conversation) {
        // Conversation not found
        return null;
      }

      // Check if the member already exists in the conversation's members list
      if (conversation.members.includes(memberId)) {
        // Member already exists in the conversation
        return conversation;
      }

      // Add the new member to the conversation's members list
      conversation.members.push(memberId);

      // Save the updated conversation
      const updatedConversation = await conversation.save();

      return updatedConversation;
    } catch (error) {
      // Handle any errors
      console.error("Error adding member to conversation:", error);
      throw new Error("Failed to add member to conversation");
    }
  }
}

export default ConversationRepository;

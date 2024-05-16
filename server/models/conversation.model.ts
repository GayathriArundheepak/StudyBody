import mongoose from "mongoose";
import IConversation from "../interface/conversation";

const { Schema } = mongoose;

const ConversationSchema = new Schema(
  
  {
    conversationName:{
       type:String,
    },
    isGroup:{
       type:Boolean,
       default:false,
    },
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

const ConversationModel = mongoose.model<IConversation>("Conversation", ConversationSchema);

export default ConversationModel;

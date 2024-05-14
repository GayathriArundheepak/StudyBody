import mongoose, {  Schema } from 'mongoose';
import IMessage from '../interface/message';

const MessageSchema: Schema = new Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);

export default MessageModel;

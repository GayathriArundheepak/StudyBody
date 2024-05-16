interface IMessage {
  conversationId: string;
  sender: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
export default IMessage;

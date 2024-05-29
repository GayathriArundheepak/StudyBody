import "./Conversation.scss";
import { useSelector } from "react-redux";
import {
  UserSliceState,
} from "../../redux/user/UserSlice";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import api from "../../axios/api";
import IConversation from "../../interface/messanger/Conversation";
import IUser from "../../interface/user/User";

interface ConversationProps {
  conversation: IConversation;
}

const Conversation: React.FC<ConversationProps> = ({ conversation }) => {
  const { currentUser }: UserSliceState = useSelector(
    (state: RootState) => state.user
  );
  const userType: string =
    useSelector((state: RootState) => state.user.userType) || "student";
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const friendId = conversation.members.find(
          (m) => m !== currentUser?._id
        );
        if (friendId) {
          const res = await api.get(`/api/student/${friendId}`);
          setUser(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  const renderConversationName = () => {
    if (conversation.conversationName) {
      return conversation.conversationName; // Display group chat name if available
    } else if (user) {
      return user.username; // Display friend's username for one-on-one chat
    } else {
      return ""; // Handle loading state or error state
    }
  };

  const renderProfilePic = () => {
    if (conversation.conversationName) {
      // Display group chat icon
      return "/images/groupicon.jpg";
    } else if (user && user.profilePic) {
      return user.profilePic; // Display friend's profile picture for one-on-one chat
    } else {
      return "default-profile-pic-url"; // Display default profile picture for loading or error state
    }
  };

  return (
    <div className="conversation">
      <img className="conversationImg" src={renderProfilePic()} alt="" />
      <span className="conversationName">{renderConversationName()}</span>
    </div>
  );
};

export default Conversation;

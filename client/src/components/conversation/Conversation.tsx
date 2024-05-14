import './Conversation.scss'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStart, updateUserSuccess, UserSliceState } from '../../redux/user/UserSlice';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import api  from '../../axios/api'

interface IConversation {
  members: string[];
  conversationName?: string; // Make conversationName optional for group chats
  isGroup :boolean
}

interface ConversationProps {
  conversation: IConversation;
}

interface User {
  profilePic?: string | null;
  username?: string;
  email: string;
  password?: string;
  newPassword?: string;
  gender?: string;
  date_of_birth?: Date;
  userType?: string;
  wishlist?: string[];
}

const Conversation: React.FC<ConversationProps> = ({ conversation }) => {
  const { currentUser }: UserSliceState = useSelector((state: RootState) => state.user);
  const userType: string = useSelector((state: RootState) => state.user.userType) || 'student';
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const friendId = conversation.members.find((m) => m !== currentUser?._id);
        if (friendId) {
          const res = await api.get(`/api/student/${friendId}`);
          setUser(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [currentUser, conversation]);

  const renderConversationName = () => {
    if (conversation.conversationName) {
      return conversation.conversationName; // Display group chat name if available
    } else if (user) {
      return user.username; // Display friend's username for one-on-one chat
    } else {
      return ''; // Handle loading state or error state
    }
  };

  const renderProfilePic = () => {
    if (conversation.conversationName) {
      // Display group chat icon
      return 'https://t3.ftcdn.net/jpg/07/14/57/10/360_F_714571052_6cbdJRbvbZVrqqJ9ujvPOMAfunjd92bH.jpg';
    } else if (user && user.profilePic) {
      return user.profilePic; // Display friend's profile picture for one-on-one chat
    } else {
      return 'default-profile-pic-url'; // Display default profile picture for loading or error state
    }
  };

  return (
    <div className='conversation'>
      <img className='conversationImg' src={renderProfilePic()} alt="" />
      <span className='conversationName'>{renderConversationName()}</span>
    </div>
  );
};

export default Conversation;

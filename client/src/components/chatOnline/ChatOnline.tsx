import { useEffect, useRef, useState } from "react";
import "./ChatOnline.scss";
import api from "../../axios/api";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { UserSliceState } from "../../redux/user/UserSlice";
import Success from "../success/Success";
import { io, Socket } from "socket.io-client";

interface Friend {
  _id: string;
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
interface User {
  userId: string;
  socketId: string;
}

interface Conversation {
  _id: string;
  members: string[];
  conversationName: string;
  isGroup: boolean;
}
interface ChatOnlineProps {
  onlineUsers: Friend[]; // Specify the type of onlineUsers
  selectedCourseStudents: Friend[];
  setCurrentChat: (conversation: Conversation | null) => void;
}
// setCurrentChat
function ChatOnline({
  onlineUsers,
  selectedCourseStudents,
  setCurrentChat,
}: ChatOnlineProps) {
  const { currentUser }: UserSliceState = useSelector(
    (state: RootState) => state.user
  );
  const userType: string =
    useSelector((state: RootState) => state.user.userType) || "student";
  const currentId = currentUser?._id;
  const [friends, setFriends] = useState<Friend[]>([]);
  const [onlineFriends, setOnlineFriends] = useState<Friend[]>([]);
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    //  return setSocket(io("ws://localhost:8900"));
    socket.current = io("ws://localhost:8900");
  }, []);
  useEffect(() => {
    console.log("socket", socket);
    socket?.current?.emit("addUser", currentUser?._id);
    socket?.current?.on("getUsers", (users) => {
      setOnlineFriends(
        friends.filter((f) => users.some((u: User) => u.userId === f._id))
      );
    });
  }, [currentUser]);
  useEffect(() => {
    setFriends(selectedCourseStudents);
  }, [selectedCourseStudents]);

  useEffect(() => {
    // setOnlineFriends(friends.filter((f) => onlineUsers.some((u) => u._id === f._id)));
    setOnlineFriends(friends);
  }, [
    friends,
    //  onlineUsers
  ]);

  const handleClick = async (user: Friend) => {
    try {
      const res = await api.get(
        `/api/conversations/find/${currentId}/${user._id}`
      );

      if (res.data.conversations === null) {
        const senderId = currentId;
        const receiverId = user._id;

        // Create a new conversation
        const createConversationRes = await api.post("/api/conversations", {
          senderId,
          receiverId,
        });

        if (createConversationRes.data.success) {
          // If conversation creation is successful, fetch the conversation again
          const newRes = await api.get(
            `/api/conversations/find/${currentId}/${user._id}`
          );
          setCurrentChat(newRes.data.conversations);
        } else {
          console.error("Failed to create conversation");
        }
      } else {
        // If conversation already exists, set it as current chat
        setCurrentChat(res.data.conversations);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(onlineFriends,'onlinef')
  return (
    <div className="chatOnline">
      {onlineFriends.map((user) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(user)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={user?.profilePic ?? ""}
              alt="profile pic"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">
            {user._id === currentUser?._id ? "You" : user.username}
          </span>
        </div>
      ))}
    </div>
  );
}
export default ChatOnline;

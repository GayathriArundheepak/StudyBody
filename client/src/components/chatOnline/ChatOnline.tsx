import { useEffect, useRef, useState } from "react";
import "./ChatOnline.scss";
import api from "../../axios/api";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { UserSliceState } from "../../redux/user/UserSlice";
import { io, Socket } from "socket.io-client";
import IConversation from "../../interface/messanger/Conversation";
import IFriend from "../../interface/messanger/Friend";
import IOnlineUser from "../../interface/messanger/OnlineUser";



interface ChatOnlineProps {
  // onlineUsers: IOnlineUser[]; // Specify the type of onlineUsers
  selectedCourseStudents: IFriend[];
  setCurrentChat: (conversation: IConversation | null) => void;
}
// setCurrentChat
function ChatOnline({
  selectedCourseStudents,
  setCurrentChat,
}: ChatOnlineProps) {
  const { currentUser }: UserSliceState = useSelector(
    (state: RootState) => state.user
  );
    const socket = useRef<Socket | null>(null);
  const currentId = currentUser?._id;
  const [friends, setFriends] = useState<IFriend[]>([]);
  const [onlineFriends, setOnlineFriends] = useState<IFriend[]>([]);

  useEffect(() => {
    setFriends(selectedCourseStudents);
  }, [selectedCourseStudents]);
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.emit("addUser", currentUser?._id);
      socket.current.on("getUsers", (users) => {
        setOnlineFriends(
          friends.filter((f) => users.some((u: IOnlineUser) => u.userId === f._id))
        );
      });
    }
  }, [currentUser, friends]);

  const handleClick = async (user: IFriend) => {
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

  console.log(onlineFriends,'onlinef')
  return (
    <div className="chatOnline-page">
      {friends.map((user, index) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(user)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={user?.profilePic ?? ""}
              alt="profile pic"
            />
            <div className={`chatOnlineBadge ${onlineFriends.some((f) => f._id === user._id) ? "online" : "offline"}`}></div>
          </div>
          <span className="chatOnlineName">
            {user._id === currentUser?._id
              ? "You"
              : `${user.username} ${index === 0 ? "(Teacher)" : ""}`}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ChatOnline;

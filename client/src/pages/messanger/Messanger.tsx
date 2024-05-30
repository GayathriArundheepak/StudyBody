import Conversation from "../../components/conversation/Conversation";
import Navbar from "../../components/navbar/Navbar";
import "./Messanger.scss";
import Message from "../../components/message/Message";
// import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useSelector } from "react-redux";
import {
 
  UserSliceState,
} from "../../redux/user/UserSlice";
import { RootState } from "../../redux/store";
import { useEffect, useRef, useState } from "react";
import api from "../../axios/api";
import Community from "../../components/community/community";
import { io, Socket } from "socket.io-client";
import IConversation from "../../interface/messanger/Conversation";
import IMessageData from "../../interface/messanger/MessageData";


const Messanger: React.FC = () => {
  const { currentUser }: UserSliceState = useSelector(
    (state: RootState) => state.user
  );
  const [conversations, setConversations] = useState([]);

  const [currentChat, setCurrentChat] = useState<IConversation | null>(null);
  const [messages, setMessages] = useState<(IMessageData | null)[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<IMessageData | null>(
    null
  );
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  console.log("socket", socket);
  useEffect(() => {
    socket.current = io("ws:43.205.115.45:8900");
    socket.current.on("getMessage", (data) => {
      if (currentChat?.isGroup) {
        setArrivalMessage({
          conversationId: data.conversationId || "",
          sender: data.senderId,
          text: data.text,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      setArrivalMessage({
        conversationId: data.conversationId || "",
        sender: data.senderId,
        text: data.text,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return () => {
      if (socket.current) {
        socket.current.emit("removeUser", currentUser?._id); // Custom event to handle user removal
        socket.current.disconnect();
        socket.current = null;
      }
    }
  },[currentUser,currentChat?.isGroup]);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (currentChat?.isGroup) {
      socket?.current?.emit("addGroup", currentChat?._id);
    } else {
      socket?.current?.emit("addUser", currentUser?._id);
    }
   
  });

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await api.get("/api/conversations/" + currentUser?._id);
        setConversations(res.data.conversations);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();

  }, [currentUser?._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await api.get("/api/messages/" + currentChat?._id);
        // console.log("messages:",res.data.messages)
        setMessages(res.data.messages);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const message = {
      sender: currentUser?._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };

    const receiverId = currentChat?.members.find(
      (member) => member !== currentUser?._id
    );
    // console.log('receiverId',receiverId,newMessage)
    // socket?.current?.emit("sendMessage", {
    //   senderId: currentUser?._id,
    //   receiverId,
    //   text: newMessage,
    // });
    // Determine if it's a group conversation based on the presence of conversationName
    if (currentChat?.isGroup) {
      // For group conversation
      socket?.current?.emit("sendMessage", {
        senderId: currentUser?._id,
        groupId: currentChat?._id, // Group chat ID
        text: newMessage,
        isGroup: currentChat?.isGroup,
      });
    } else {
      // For one-to-one conversation
      socket?.current?.emit("sendMessage", {
        senderId: currentUser?._id,
        receiverId, // Receiver's ID
        text: newMessage,
        isGroup: currentChat?.isGroup, // If it's a group, isGroup will be false, else true
      });
    }

    try {
      const res = await api.post("/api/messages", message);
      setMessages([...messages, res.data.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="messanger">
      <Navbar />
      <div className="messanger-container">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder=" search for friends"
              className="chatMenuInput"
            />
            {conversations.map((c) => (
              <div className="" onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages &&
                    messages.map((m) => (
                      <div ref={scrollRef}>
                        <Message
                          message={m}
                          own={m?.sender === currentUser?._id}
                        />
                      </div>
                    ))}
                </div>

                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    name=""
                    id=""
                    placeholder="write somthing"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <Community setCurrentChat={setCurrentChat} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messanger;
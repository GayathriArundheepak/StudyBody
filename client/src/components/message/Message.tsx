import { format } from "timeago.js";
import "./Message.scss";
import { UserSliceState } from "../../redux/user/UserSlice";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../../axios/api";
import IMessageData from "../../interface/messanger/MessageData";
import IUser from "../../interface/user/User";


interface MessageProps {
  message: IMessageData | null; // Change the type to IMessageData | null
  own: boolean;
}

const Message: React.FC<MessageProps> = ({ message, own }) => {
  const { currentUser }: UserSliceState = useSelector(
    (state: RootState) => state.user
  );
  const [user, setUser] = useState<IUser | null>(null);
  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const id = message?.sender;
  useEffect(() => {
    const getUser = async () => {
      console.log("senderid:", id);
      try {
        const res = await api.get(`/api/student/${id}`);
        setUser(res.data.data);
        console.log("user:", res.data.data);
        setIsTeacher(false)
      } catch (studentError) {
        console.log("Student fetch failed, trying teacher endpoint:", studentError);
        try {
          const teacherRes = await api.get(`/api/teacher/${id}`);
          setUser(teacherRes.data.data);
          setIsTeacher(true)
          console.log("teacher:", teacherRes.data.data);
        } catch (teacherError) {
          console.log("Teacher fetch failed as well:", teacherError);
        }
      }
    };

    if (!own) {
      getUser();
    }
  }, [id, own]);
  const defaultProfilePic =
    "/images/DefaultProfilePic.webp";
  const profilePic = own
    ? currentUser?.profilePic || defaultProfilePic
    : user?.profilePic || defaultProfilePic;
  const username = !own && (user?.username );

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {own ? (
          <>
            <p className="messageText">{message?.text}</p>

            {profilePic && (
              <img className="messageImg" src={profilePic} alt="profile pic" />
            )}
          </>
        ) : (
          <>
            <p className="username">{username}</p> <br />
           { isTeacher && <span className="isTeacher">(Teacher)</span>}
            {profilePic && (
              <img className="messageImg" src={profilePic} alt="profile pic" />
            )}
            <p className="messageText">{message?.text}</p>
          </>
        )}
      </div>

      <div className="messageBottom">
        {message?.createdAt && format(message.createdAt)}
      </div>
    </div>
  );
};

export default Message;

import { format } from "timeago.js";
import './Message.scss';
import { UserSliceState } from "../../redux/user/UserSlice";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from '../../axios/api'
interface MessageData {
  conversationId: string;
  sender: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}


interface MessageProps {
  message: MessageData | null; // Change the type to MessageData | null
  own: boolean;
}

interface User{
  profilePic?: string | null;
  username?: string;
  email: string  ;
  password?: string ;
  newPassword?: string;
  gender?: string ;
  date_of_birth?: Date;
  userType?: string;
  wishlist?:string[];

}
  const Message: React.FC<MessageProps> = ({message, own }) => {
    const { currentUser }: UserSliceState = useSelector((state: RootState) => state.user);
    const [user, setUser] = useState<User | null>(null);
    const id= message?.sender;
    useEffect(()=>{
 
      const getUser =async()=>{
        console.log("senderid:", id)
        try{
          const res = await api.get(`/api/student/${id}`);
     setUser(res.data.data)
     console.log('user:',user)
        }catch(error){
          console.log(error)
        }
      }
      if (!own) {
       getUser();
      }
    },[id])
    const defaultProfilePic = 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png';
    const profilePic = own ? (currentUser?.profilePic || defaultProfilePic) : (user?.profilePic || defaultProfilePic);
    const username = !own && (user?.username || 'Teacher');

  return (
    <div className={own ? "message own" : "message"}>
<div className="messageTop">
  {own ? (
    <>
      <p className='messageText'>{message?.text}</p>
   
      {profilePic && <img className='messageImg' src={profilePic} alt="profile pic" />}
    </>
  ) : (
    <>
      {/* <p className='username'>{username}</p> */}
      {profilePic && <img className='messageImg' src={profilePic} alt="profile pic" />}
      <p className='messageText'>{message?.text}</p>
    </>
  )}
</div>


        <div className="messageBottom">
        {message?.createdAt && format(message.createdAt)}
        </div>
    </div>
  )
}

export default Message
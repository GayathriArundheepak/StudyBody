import React, { useRef, useEffect } from "react";
import './VideoChat.scss';
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { UserSliceState } from "../../redux/user/UserSlice";
import { RootState } from "../../redux/store";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

function randomID(len: number) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

const VideoChat = () => {
  const videoElementRef = useRef<HTMLDivElement>(null);
  const { currentUser }: UserSliceState = useSelector(
    (state: RootState) => state.user
  );
  const roomID = getUrlParams().get("roomID") || randomID(5);

  useEffect(() => {
    const myMeeting = async (element: any) => {
      const appID = 920074593;
      const serverSecret = process.env.REACT_APP_ZEGO_SECRET;

      if (serverSecret !== undefined) {
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomID,
          Date.now().toString(),
          currentUser?.username
        );
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        await zp.joinRoom({
          container: element,
          sharedLinks: [
            {
              name: "Personal link",
              url:
                window.location.protocol +
                "//" +
                window.location.host +
                window.location.pathname +
                "?roomID=" +
                roomID,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
        });
      }
    };

    if (videoElementRef.current) {
      myMeeting(videoElementRef.current);
    }
  }, [roomID, currentUser]);

  return (
    <div className="videoChat">
      <Navbar />
      <div className="videoChat-right">
        <Sidebar />
      </div>
      <div className="videoChat-container">

      <div ref={videoElementRef} />;
      </div>
    </div>
  );
};

export default VideoChat;

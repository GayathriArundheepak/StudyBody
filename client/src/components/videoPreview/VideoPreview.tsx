import React, { useState } from 'react';
import './VideoPreview.scss';
interface VideoPreviewProps {
  videoUrl: string;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoUrl }) => {
  const [showVideo, setShowVideo] = useState(false);

  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  return (
    <div>
      <button onClick={toggleVideo}>Preview Video</button>
      {showVideo && (
        <div className="video-modal-overlay">
          <div className="video-modal">
            <button onClick={toggleVideo} className="close-button">Close</button>
            <video controls>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPreview;

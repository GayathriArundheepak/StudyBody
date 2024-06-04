import React, { useState, useEffect } from "react";
import "./Materials.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../axios/api";
import { RootState } from "../../redux/store";
import { UserSliceState } from "../../redux/user/UserSlice";
import Navbar from "../navbar/Navbar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ICourseMaterial from "../../interface/course/CourseMaterial";


const Materials: React.FC = () => {
  const [materials, setMaterials] = useState<ICourseMaterial[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const { currentUser }: UserSliceState = useSelector(
    (state: RootState) => state.user
  );
  const { courseId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser && courseId) {
          const response = await api.get(`/api/course/materials/${courseId}`);
          console.log("ml:", response.data);
          setMaterials(response.data.materials);
          setSubject(response.data.materials.Subject);
          // Set default video if materials exist
          // if (response.data.materials.length > 0) {
          //   const defaultVideo = response.data.materials[0].video?.url || '';
          //   setSelectedVideo(defaultVideo);
          // }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentUser, courseId]);
  
  const handleVideoSelect = (videoUrl: string) => {
    console.log(videoUrl); // Check if the correct video URL is logged
    setSelectedVideo(videoUrl);
  };
useEffect(()=>{

},[selectedVideo])
  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop() || "download";
    link.click();
  };

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
  return (
    <div className="materials">
      <Navbar />

      <div className="left-section">
        <div className="video-player">
          {selectedVideo ? (
            <video  key={selectedVideo} width="891" height="500" controls>
              <source src={selectedVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <iframe src="" title="Video Player" className="video-iframe" />
          )}
        </div>
      </div>

      <div className="right-section">
        <div className="materials-container">
          <h2 className="my-learning-heading">My Learning</h2>
          <p>{subject}</p>
          {materials.map((material, index) => (
            <div key={index} className="material-item">
              <div
                className="material-header"
                onClick={() => toggleDropdown(index)}
              >
                <h3>{material.note?.headline || material.video?.headline}</h3>
                <div className="dropdown-button-container">
                  <KeyboardArrowDownIcon />
                </div>
              </div>
              {openDropdown === index && (
                <div className="dropdown-content">
                  {material.note && (
                    <div className="material-note">
                      <h4 className="headline">Notes of {material.note.headline}</h4>
                      <button
                        className="material-button"
                        onClick={() => handleDownload(material.note!.url)}
                      >
                        Download Note
                      </button>
                    </div>
                  )}
                  {material.video && (
                    <div className="material-video">
                      <h4 className="headline"> Video of {material.video.headline}</h4>
                      <button
                        className="material-button"
                        onClick={() => handleVideoSelect(material.video!.url)}
                      >
                        Play Video
                      </button>
                      <button
                        className="material-button"
                        onClick={() => handleDownload(material.video!.url)}
                      >
                        Download Video
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Materials;

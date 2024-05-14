import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../axios/api';
import { RootState } from '../../redux/store';
import { UserSliceState } from '../../redux/user/UserSlice';
import Navbar from '../navbar/Navbar';

interface Material {
  headline: string;
  url: string;
}

interface CourseMaterial {
  note?: Material;
  video?: Material;
}

const Materials: React.FC = () => {
  const [materials, setMaterials] = useState<CourseMaterial[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string>('');
  const [selectedNote, setSelectedNote] = useState<string>('');
  const { currentUser }: UserSliceState = useSelector((state: RootState) => state.user);
  const { courseId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser && courseId) {
          const response = await api.get(`/api/course/materials/${courseId}`);
          setMaterials(response.data.materials);

          // Set default video if materials exist
          if (response.data.materials.length > 0) {
            const defaultVideo = response.data.materials[0].video?.url || '';
            setSelectedVideo(defaultVideo);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentUser, courseId]);

  const handleVideoSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVideo(event.target.value);
  };

  const handleNoteSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedNote(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="materials-container">
        <div className="left-section">
          <div className="video-player">
            {selectedVideo && (
              <iframe src={selectedVideo} title="Video Player" className="video-iframe" />
            )}
          </div>
        </div>

        <div className="right-section">
          <h2 className="my-learning-heading">My Learning</h2>
          <div className="select-container">
            <select value={selectedVideo} onChange={handleVideoSelect} className="video-select">
              <option value="">Select Video</option>
              {materials.map((material, index) => (
                material.video && (
                  <option key={`${index}-video`} value={material.video.url}>
                    {material.video.headline}
                  </option>
                )
              ))}
            </select>
            <select value={selectedNote} onChange={handleNoteSelect} className="note-select">
              <option value="">Select Note</option>
              {materials.map((material, index) => (
                material.note && (
                  <option key={`${index}-note`} value={material.note.url}>
                    {material.note.headline}
                  </option>
                )
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Materials;

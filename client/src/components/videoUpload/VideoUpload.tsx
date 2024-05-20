import React, { useState, ChangeEvent } from 'react';
import AWS from 'aws-sdk';
import { ToastContainer, toast } from "react-toastify";
interface VideoUploadProps {
  onVideoUrlChange: (newVideoUrl: string) => void;
}

function VideoUpload({ onVideoUrlChange }: VideoUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const S3_BUCKET = process.env.REACT_APP_S3_BUCKET!;
  const REGION = process.env.REACT_APP_REGION!;
  const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY!;
  const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY!;

  const uploadVideo = async () => {
    if (!file) return;

    AWS.config.update({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
      region: REGION,
    });

    const s3 = new AWS.S3();

    const params: AWS.S3.PutObjectRequest = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    try {
      setIsUploading(true);
      setUploadSuccess(false);

      s3.upload(params)
        .on('httpUploadProgress', (evt) => {
          if (evt.total) {
            setProgress(Math.round((evt.loaded * 100) / evt.total));
          }
        })
        .send((err: AWS.AWSError, data: AWS.S3.ManagedUpload.SendData) => {
          setIsUploading(false);
          if (err) {
            console.error('Error uploading video:', err);
            toast.error('Error uploading video.');
          } else {
            console.log('Video uploaded successfully:', data);
            toast.success('Video uploaded successfully');
            const videoUrl =data.Location;
            onVideoUrlChange(videoUrl); // Send video URL to parent component
            setUploadSuccess(true);
          }
        });
    } catch (error) {
      console.error('Error uploading video:', error);
      toast.error('Error uploading video.');
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
    }
  };

  const handleUpload = () => {
    uploadVideo();
  };

  const handleReset = () => {
    setFile(null);
    setProgress(0);
    setUploadSuccess(false);
  };

  return (
    <div>
        <ToastContainer/>
    {!file && (
      <>
        <button className="upload-button"  onClick={() => document.getElementById('video-input')?.click()}>
         Select  your video
        </button>
        <input
          id="video-input"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </>
    )}

    {file && !uploadSuccess && (
        
      <button className="upload-button" onClick={handleUpload} disabled={isUploading}>
        {isUploading ? `Uploading... ${progress}%` : 'Upload'}
      </button>
      
    )}

    {uploadSuccess && (
      <button className="upload-button" onClick={handleReset}>
        Redo upload
      </button>
    )}
  </div>
  );
}

export default VideoUpload;

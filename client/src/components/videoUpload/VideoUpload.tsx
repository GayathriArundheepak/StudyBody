import React, { useState, ChangeEvent } from 'react';
import AWS from 'aws-sdk';

interface VideoUploadProps {
    onVideoUrlChange: (newVideoUrl: string) => void;
}

function VideoUpload({ onVideoUrlChange }: VideoUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [showButtons, setShowButtons] = useState(false);

    const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
    const REGION = process.env.REACT_APP_REGION;
    const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
    const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;

    const uploadVideo = async () => {
        if (!file || !S3_BUCKET || !REGION || !ACCESS_KEY || !SECRET_ACCESS_KEY) return;

        AWS.config.update({
            accessKeyId: ACCESS_KEY,
            secretAccessKey: SECRET_ACCESS_KEY,
            region: REGION
        });

        const s3 = new AWS.S3();

        const params: AWS.S3.PutObjectRequest = {
            Bucket: S3_BUCKET,
            Key: file.name,
            Body: file,
        };

        try {
            const data = await s3.upload(params).promise();
            console.log('Video uploaded successfully:', data);
            alert('Video uploaded successfully.');
            const videoUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${file.name}`;
            onVideoUrlChange(videoUrl); // Send video URL to parent component
        } catch (error) {
            console.error('Error uploading video:', error);
            alert('Error uploading video.');
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setFile(file);
            setShowButtons(true);
        }
    };

    const handleUpload = () => {
        uploadVideo();
        setShowButtons(false);
    };

    const handleCancel = () => {
        setFile(null);
        setShowButtons(false);
    };

    return (
        <div>
            <label htmlFor="video-input">
              
            </label>
            <input id="video-input" type="file" onChange={handleFileChange} />

            {showButtons && (
                <div>
                    <button className="upload-button" onClick={handleUpload}>Upload</button>
                    <button className="upload-button" onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default VideoUpload;

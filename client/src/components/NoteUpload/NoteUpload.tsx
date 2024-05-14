import React, { useState, ChangeEvent, useEffect } from 'react';
import AWS from 'aws-sdk';

interface NoteUploadProps {
    onNoteUrlChange: (newNoteUrl: string) => void;
}

function NoteUpload({ onNoteUrlChange }: NoteUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [showButtons, setShowButtons] = useState(false);

    // useEffect(() => {
    //     // Check if environment variables are set
    //     if (!process.env.REACT_APP_S3_BUCKET || !process.env.REACT_APP_REGION || !process.env.REACT_APP_ACCESS_KEY || !process.env.REACT_APP_SECRET_ACCESS_KEY) {
    //         console.error('Missing environment variables for S3 configuration');
    //     }
    // }, []);

    const uploadNote = async () => {
        if (!file) {
            console.error('No file selected');
            return;
        }

        const { REACT_APP_S3_BUCKET, REACT_APP_REGION, REACT_APP_ACCESS_KEY, REACT_APP_SECRET_ACCESS_KEY } = process.env;

        if (!REACT_APP_S3_BUCKET || !REACT_APP_REGION || !REACT_APP_ACCESS_KEY || !REACT_APP_SECRET_ACCESS_KEY) {
            console.error('Missing environment variables for S3 configuration');
            return;
        }

        AWS.config.update({
            accessKeyId: REACT_APP_ACCESS_KEY,
            secretAccessKey: REACT_APP_SECRET_ACCESS_KEY,
            region: REACT_APP_REGION
        });

        const s3 = new AWS.S3();

        const params: AWS.S3.PutObjectRequest = {
            Bucket: REACT_APP_S3_BUCKET,
            Key: file.name,
            Body: file,
        };

        try {
            const data = await s3.upload(params).promise();
            console.log('Note uploaded successfully:', data);
            alert('Note uploaded successfully.');
            const noteUrl = `https://${REACT_APP_S3_BUCKET}.s3.${REACT_APP_REGION}.amazonaws.com/${file.name}`;
            onNoteUrlChange(noteUrl); // Send note URL to parent component
        } catch (error) {
            console.error('Error uploading note:', error);
            alert('Error uploading note. Please try again later.');
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
        uploadNote();
        setShowButtons(false);
    };

    const handleCancel = () => {
        setFile(null);
        setShowButtons(false);
    };

    return (
        <div>
            <label htmlFor="note-input">
                {/* Display note viewer here */}
            </label>
            <input id="note-input" type="file" onChange={handleFileChange} />

            {showButtons && (
                <div>
                    <button className="upload-button" onClick={handleUpload}>Upload</button>
                    <button className="upload-button" onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default NoteUpload;

import React, { useState } from "react";
import AWS from "aws-sdk";
import { useSelector } from "react-redux";
import "./ImageUpdate.scss";


function ImageUpdate({ formData, setFormData }) {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(
    currentUser ? currentUser.profilePic || "" : ""
  );
  const [showButtons, setShowButtons] = useState(false);

  const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
  const REGION = process.env.REACT_APP_REGION;
  const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
  const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;
  console.log(process.env.REACT_APP_S3_BUCKET);

  const uploadFile = async () => {
    AWS.config.update({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
      region: REGION,
    });

    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    try {
      const data = await s3.upload(params).promise();
      console.log("File uploaded successfully:", data);
      alert("File uploaded successfully.");
      // Set the imageUrl state with the URL of the uploaded image
      const imageUrl = data.Location;
      setImageUrl(imageUrl);
      setFormData({ ...formData, profilePic: imageUrl });
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setShowButtons(true);
  };

  const handleUpload = () => {
    uploadFile();
    setShowButtons(false);
  };

  const handleCancel = () => {
    setFile(null);
    setShowButtons(false);
  };
  const defaultProfilePic = "/images/DefaultProfilePic.jpg";

  const profilePicSrc = (currentUser?.profilePic?.trim() !== '' ? currentUser.profilePic : defaultProfilePic);


  return (
    <div>
      <label htmlFor="file-input">
      <img
      src={imageUrl ? imageUrl : profilePicSrc}
      alt={imageUrl ? "User profile picture" : "Default profile picture"}
    />
      </label>
      <input
        id="file-input"
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {showButtons && (
        <div>
          <button className="upload-button" onClick={handleUpload}>
            Upload
          </button>
          <button className="upload-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageUpdate;

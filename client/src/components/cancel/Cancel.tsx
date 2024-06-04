import React from "react";
import "./Cancel.scss";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";

const Cancel: React.FC = () => {
  return (
    <div className="cancel-">
      <div className="icon-container">
        <ClearSharpIcon className="cancel-icon" />
      </div>
      <h2>Payment Cancelled</h2>
    </div>
  );
};

export default Cancel;

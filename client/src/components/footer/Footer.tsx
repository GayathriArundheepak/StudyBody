import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./Footer.scss";

const Footer: React.FC = () => {
  const userType: string =
    useSelector((state: RootState) => state.user.userType) || "student";

  return (
    <footer className="footer">
      {userType === "student" && (
        <>
          <div className="footerSection footerDescription">
            <h1>StudyBuddy</h1>
            <p>
              StudyBuddy is an innovative learning platform designed to empower
              students and educators worldwide. Providing personalized learning experiences, StudyBuddy
              offers a comprehensive suite of tools and resources to support
              academic success.
            </p>
          </div>
          <div className="footerSection footerLinks">
            <h6>Quick Links</h6>
            <ul>
              <li>About</li>
              <li>Course</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="footerSection footerContact">
            <h6>Contact Us</h6>
            <p>123-456-7890</p>
            <p>contact@studybuddy.com</p>
          </div>
          <div className="footerSection location">
            <h6>Location</h6>
            <p>123 Main Street, Anytown, USA</p>
          </div>
          <div className="footerSection socialMediaIcons">
            {/* Add your social media icons here */}
          </div>
        </>
      )}
      <div className="footerSection copyright">
        <p>© StudyBuddy Corporation 2024 All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

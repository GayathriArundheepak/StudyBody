import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <>
      <div className='footer'>
        <div className="footerDescription">
          <h1>StudyBuddy</h1>
          <p>
          StuddyBuddy is an innovative learning platform designed to empower students and educators worldwide.
           With a focus on collaboration, engagement, and personalized learning experiences, StuddyBuddy provides a comprehensive suite of tools and resources to support academic success.
         </p>
        </div>
        <div className="footerLinks">
          <h6>Quick Links</h6>
          <ul>
            <li>About</li>
            <li>Course</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="footerContact">
          <h6>Contact us</h6>
          <p>37q64872568</p>
          <p>zvnszfngl@gmail.com</p>
        </div>
        <div className="location">
          <p>Links</p>
        </div>
      </div>
      <div className='copyright'>
        <p>Copyright © StudyBuddy Corporation 2024 All Rights Reserved</p>
        <div className="socialMediaIcons">
          {/* Add your social media icons here */}
        </div>
      </div>
    </>
  );
}

export default Footer;

import React from "react";
import "./About.scss";
// import aboutImage from '../../images/about.png';

const About: React.FC = () => {
  return (
    <section id="about">
      <div className="container-fluid">
        <div className="row">
        <img src="/images/aboutUs.jpg" alt="about" className="aboutUs-image" />

          <div className="col-lg-6 col-md-6 col-12">
            <h1>ABOUT US</h1>
            <p>
            Welcome to StudyBudy, your trusted learning companion for students from 1st to 12th standard. At StudyBudy, 
            we are committed to transforming the educational experience by providing a comprehensive and engaging learning
             platform tailored to the unique needs of each student. Our innovative approach combines live classes, interactive
              lessons, and a vast array of study materials to ensure that students not only excel academically but also develop a
               lifelong love for learning. With a focus on personalized education, our platform adapts to the pace and style of
                every learner, fostering an environment where students can thrive and achieve their full potential. 
            Join us at StudyBudy and embark on a journey of academic excellence and personal growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

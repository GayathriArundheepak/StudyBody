import React from "react";
import "./Banner.scss";

const Banner: React.FC = () => {
  return (
    <section className="banner">
      <div className="container">
        <h1>Welcome to StuddyBuddy Learning App</h1>
        <p>Unlock your potential with our diverse range of courses</p>
        <button className="btn">Explore Courses</button>
      </div>
    </section>
  );
};

export default Banner;

import BarChartBox from "../barChartBox/BarChartBox";
import TopBox from "../topBox/TopBox";
import "./StudentDashboard.scss";
import Stack from "@mui/material/Stack";
import { Gauge } from "@mui/x-charts/Gauge";
import LineChatBox from "../lineChartBox/LineChatBox";
import Banner from "../banner/Banner";
import ClassList from "../courseList/ClassList";
import { useRef, useState } from "react";
import About from "../about/About";

const StudentDashboard = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  // const scrollToAbout = () => {
  //   if (aboutRef.current) {
  //     aboutRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  return (
    <div className="studentDashboard">
      <div className="box box1">
        <Banner/>
      </div>
      <div className="box box2" id="about" ref={aboutRef}>
    <About/>
      </div>
    
    </div>
  );
};

export default StudentDashboard;

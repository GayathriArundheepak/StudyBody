import BarChartBox from "../barChartBox/BarChartBox";
import TopBox from "../topBox/TopBox";
import "./StudentDashboard.scss";
import Stack from "@mui/material/Stack";
import { Gauge } from "@mui/x-charts/Gauge";
import LineChatBox from "../lineChartBox/LineChatBox";
import Banner from "../banner/Banner";
import ClassList from "../courseList/ClassList";
import { useRef, useState } from "react";
import HorizontalSlide from "../horizondalSlide/HorizontalSlide";
import About from "../about/About";

const StudentDashboard = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="studentDashboard">
      <div className="box box1">
        <Banner/>
      </div>
      <div className="box box2" id="about" ref={aboutRef}>
    <About/>
      </div>
      {/* <div className="box box1">
        Target of week:
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 1, md: 3 }}
        >
          <Gauge
            width={100}
            height={100}
            value={50}
            valueMin={10}
            valueMax={100}
          />
        </Stack>
        Target of Month:
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 1, md: 3 }}
        >
          <Gauge
            width={100}
            height={100}
            value={70}
            valueMin={10}
            valueMax={400}
          />
        </Stack>
        Target of year:
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 1, md: 3 }}
        >
          <Gauge
            width={100}
            height={100}
            value={290}
            valueMin={10}
            valueMax={4800}
          />
        </Stack>
      </div> */}
      {/* <LineChatBox /> */}
    </div>
  );
};

export default StudentDashboard;

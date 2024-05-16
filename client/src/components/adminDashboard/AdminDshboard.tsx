import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BarChartBox from "../barChartBox/BarChartBox";
import PieAnimation from "../pieChartBox/PieChartBox";
import PieChartBox from "../pieChartBox/PieChartBox";
import TopBox from "../topBox/TopBox";
import "./AdminDashboard.scss";
import Stack from "@mui/material/Stack";
import { Gauge } from "@mui/x-charts/Gauge";
import { LineChart } from "@mui/x-charts/LineChart";
import { axisClasses } from "@mui/x-charts";
import api from "../../axios/api";
import { RootState } from "../../redux/store";
import { UserSliceState } from "../../redux/user/UserSlice";
import Course from "../../interface/course/Course";
import LineChatBox from "../lineChartBox/LineChatBox";

const AdminDashboard = () => {
  return (
    <div className="adminDashboard">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <BarChartBox />
      </div>
      <div className="box box1">
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
      </div>
      <LineChatBox />
    </div>
  );
};

export default AdminDashboard;

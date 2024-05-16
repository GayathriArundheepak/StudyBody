import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { axisClasses } from "@mui/x-charts";
import api from "../../axios/api";
import { RootState } from "../../redux/store";
import { UserSliceState } from "../../redux/user/UserSlice";
import Course from "../../interface/course/Course";
import { useSelector } from "react-redux";
const chartSetting = {
  yAxis: [
    {
      label: "Revenue (INR)",
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.label}.${axisClasses.left}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

function LineChatBox() {
  const { currentUser }: UserSliceState = useSelector(
    (state: RootState) => state.user
  );
  const userType: string =
    useSelector((state: RootState) => state.user.userType) || "student";
  const [revenueData, setRevenueData] = useState<
    { month: string; revenue: number }[]
  >([]);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        let courseData;

        if (userType === "admin") {
          const response = await api.get("/api/course/search-course", {
            params: {
              query: "",
            },
          });
          courseData = response.data.courseList;
        } else if (userType === "teacher") {
          const response = await api.get(
            `/api/course/teachers_coursesList/${currentUser?._id}`
          );
          courseData = response.data.courseList;
        }

        const revenueByMonth: { [key: string]: number } = {};
        courseData.forEach((course: Course) => {
          const createdAtDate = new Date(course.createdAt);
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          const monthIndex = createdAtDate.getMonth();
          const month = monthNames[monthIndex];
          if (course.commission !== undefined && course.prize !== undefined) {
            const commissionAmount = (course.commission / 100) * course.prize;
            const totalCommissionAmount =
              commissionAmount * course.students_list.length;
            if (!revenueByMonth[month]) {
              revenueByMonth[month] = 0;
            }
            revenueByMonth[month] += totalCommissionAmount;
          }
        });

        // Transform the revenueByMonth into the format required for dataset
        const dataset = Object.keys(revenueByMonth).map((month) => ({
          month,
          revenue: revenueByMonth[month],
        }));

        setRevenueData(dataset);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [userType, currentUser?._id]);
  return (
    <div className="revenueLineChart">
      <p>Revenue </p>
      <LineChart
        xAxis={[{ scaleType: "band", data: revenueData.map((d) => d.month) }]}
        series={[
          {
            data: revenueData.map((d) => d.revenue),
            area: true,
          },
        ]}
        {...chartSetting}
      />
    </div>
  );
}

export default LineChatBox;

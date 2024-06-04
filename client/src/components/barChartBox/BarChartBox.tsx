import "./BarChartBox.scss";
import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { useSelector } from "react-redux";
import api from "../../axios/api";
import Course from "../../interface/course/Course";
import { RootState } from "../../redux/store";
import { UserSliceState } from "../../redux/user/UserSlice";

const chartSetting = {
  yAxis: [
    {
      label: " Number of courses",
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

function BarChartBox() {
  const { currentUser }: UserSliceState = useSelector(
    (state: RootState) => state.user
  );
  const userType: string =
    useSelector((state: RootState) => state.user.userType) || "student";
  const [courseData, setCourseData] = useState<
    { month: string; ICSE?: number; CBSE?: number; STATE?: number }[]
  >([]);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        let syllabuses = ["ICSE", "CBSE", "STATE"];
        let courseDataBySyllabus;

        if (userType === "admin") {
          courseDataBySyllabus = await Promise.all(
            syllabuses.map(async (syllabus) => {
              const response = await api.get("/api/course/search-course", {
                params: {
                  query: syllabus,
                },
              });
              console.log(`${syllabus} data:`, response.data);
              return { syllabus, data: response.data.courseList };
            })
          );
        } else if (userType === "teacher") {
          const response = await api.get(
            `/api/course/teachers_coursesList/${currentUser?._id}`
          );
          syllabuses = ["ICSE", "CBSE", "STATE"]; // Assuming the teacher has courses in these syllabuses
          const teacherCourses = response.data.courseList;
          console.log(response.data);
          console.log("teacherCourses", teacherCourses);
          courseDataBySyllabus = syllabuses.map((syllabus) => ({
            syllabus,
            data: teacherCourses.filter(
              (course: Course) => course.syllabus === syllabus
            ),
          }));
        }

        const courseCountByMonth: { [key: string]: { [key: string]: number } } =
          {};
        courseDataBySyllabus?.forEach(({ syllabus, data }) => {
          data.forEach((course: Course) => {
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
            if (!courseCountByMonth[month]) {
              courseCountByMonth[month] = {};
            }
            if (!courseCountByMonth[month][syllabus]) {
              courseCountByMonth[month][syllabus] = 0;
            }
            courseCountByMonth[month][syllabus]++;
          });
        });

        console.log("Course count by month:", courseCountByMonth);

        // Transform the courseCountByMonth into the format required for dataset
        const dataset = Object.keys(courseCountByMonth).map((month) => ({
          month,
          ...courseCountByMonth[month],
        }));

        console.log("Dataset:", dataset);
        setCourseData(dataset);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [userType, currentUser?._id]);

  return (
    <div className="barCharBox">
      <BarChart
        dataset={courseData}
        xAxis={[{ scaleType: "band", dataKey: "month" }]}
        series={[
          { dataKey: "ICSE", label: "ICSE", valueFormatter },
          { dataKey: "CBSE", label: "CBSE", valueFormatter },
          { dataKey: "STATE", label: "STATE", valueFormatter },
        ]}
        {...chartSetting}
      />
    </div>
  );
}

const valueFormatter = (value: number | null) => `${value}`;

export default BarChartBox;

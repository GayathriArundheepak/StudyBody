import './BarChartBox.scss';
import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import api from '../../axios/api';
import Course from '../../interface/course/Course';

const chartSetting = {
  yAxis: [
    {
      label: 'Students Enrolled',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.label}.${axisClasses.left}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

function BarChartBox() {
  const [courseData, setCourseData] = useState<{ month: string; ICSE?: number; CBSE?: number; STATE?: number }[]>([]);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const syllabuses = ['ICSE', 'CBSE', 'STATE'];
        const courseDataBySyllabus = await Promise.all(syllabuses.map(async (syllabus) => {
          const response = await api.get('/api/course/search-course', {
            params: {
              query: syllabus
            }
          });
          console.log(`${syllabus} data:`, response.data);
          return { syllabus, data: response.data.courseList };
        }));

        const courseCountByMonth: { [key: string]: { [key: string]: number } } = {};
        console.log('haii')
        courseDataBySyllabus.forEach(({ syllabus, data }) => {
          data.forEach((course:Course) => {
            const createdAtDate = new Date(course.createdAt);
            console.log(createdAtDate )
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const monthIndex = createdAtDate.getMonth();
            console.log(monthIndex)
            const month = monthNames[monthIndex];
            console.log('mm',month)
            if (!courseCountByMonth[month]) {
              courseCountByMonth[month] = {};
            }
            if (!courseCountByMonth[month][syllabus]) {
              courseCountByMonth[month][syllabus] = 0;
            }
            courseCountByMonth[month][syllabus]++;
          });
        });

        console.log('Course count by month:', courseCountByMonth);

        // Transform the courseCountByMonth into the format required for dataset
        const dataset = Object.keys(courseCountByMonth).map(month => ({
          month,
          ...courseCountByMonth[month],
        }));

        console.log('Dataset:', dataset);
        setCourseData(dataset);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
  }, []);

  return (
    <div className="barCharBox">
      <BarChart
        dataset={courseData}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[
          { dataKey: 'ICSE', label: 'ICSE', valueFormatter },
          { dataKey: 'CBSE', label: 'CBSE', valueFormatter },
          { dataKey: 'STATE', label: 'STATE', valueFormatter },
        ]}
        {...chartSetting}
      />
    </div>
  );
}

const valueFormatter = (value: number | null) => `${value}`;

export default BarChartBox;

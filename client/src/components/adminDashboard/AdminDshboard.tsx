import BarChartBox from '../chartBox/BarChartBox';
import PieAnimation from '../pieChartBox/PieChartBox';
import PieChartBox from '../pieChartBox/PieChartBox';
import TopBox from '../topBox/TopBox';
import './AdminDashboard.scss';
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';
import { LineChart } from '@mui/x-charts/LineChart';

const AdminDashboard =() => {
  return (
    <div className="adminDashboard">
      <div className="box box1">
        <TopBox/>
      </div>
      <div className="box box2">
      <BarChartBox />
      </div>
      <div className="box box1">
  
 Target of week:
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
 
      <Gauge width={100} height={100} value={50} valueMin={10} valueMax={100} />
    </Stack>
    Target of Month:
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
      <Gauge width={100} height={100} value={70} valueMin={10} valueMax={400} />
    </Stack>
    Target of year:
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
      <Gauge width={100} height={100} value={290} valueMin={10} valueMax={4800} />
    </Stack>
      </div>
      
      <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
          area: true,
        },
      ]}
      width={500}
      height={300}
    />
    </div>
  );
}
export default AdminDashboard;

import { useSelector } from 'react-redux';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const TradingAreaChart = ({ data }) => {
  const filteredData = Array.isArray(data) ? data.map((value,index) => ({ value: value, name: ``})) : [];
  // const filteredData = [
  //   { value: 1, name: '' },
  //   { value: 1, name: '' },
  //   { value: 2, name: '' },
  //   { value: 3, name: '' },
  //   { value: 4, name: '' },
  //   { value: 1, name: '' },
  // ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={500}
        data={filteredData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="40%" stopColor="#90ed7d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#90ed7d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          style={{
            fontSize: '0.8rem',
            fontFamily: 'sans-serif',
          }}
          axisLine={false}
          dataKey="name"
        />
        <YAxis
          style={{
            fontSize: '0.8rem',
            fontFamily: 'sans-serif',
          }}
          axisLine={false}
          tickLine
        />
        <Tooltip />
        <Area
          dataKey="value"
          stroke="#82ca9d"
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TradingAreaChart;
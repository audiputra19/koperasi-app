import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { type FC } from "react";

type MonthlyData = {
  month: string;
  [key: string]: string | number;
};

interface ReusableBarChartProps {
  data: MonthlyData[];
  items: string[];
  colors?: string[];
  height?: number;
  title?: string;
}

const defaultColors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const BarChartComponent: FC<ReusableBarChartProps> = ({
  data,
  items,
  colors = defaultColors,
  height = 360,
  title = "Perbandingan Item per Bulan",
}) => {
  return (
    <div>
      <h2 className="text-sm text-gray-400 font-bold mb-2">{title}</h2>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 80, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend layout="vertical" align="right" verticalAlign="middle" />
            {items.map((item, index) => (
              <Bar
                key={item}
                dataKey={item}
                fill={colors[index % colors.length]}
                radius={[4, 4, 0, 0]}
                barSize={24}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartComponent;

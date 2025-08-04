import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { type FC } from "react";

type PieData = {
    name: string;
    value: number;
};

interface ReusablePieChartProps {
    data: PieData[];
    title?: string;
    colors?: string[];
    height?: number;
    showLegend?: boolean;
}

const defaultColors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const PieChartComponent: FC<ReusablePieChartProps> = ({
    data,
    title = "Pie Chart",
    colors = defaultColors,
    height = 280,
    showLegend = true,
}) => {
    return (
        <div>
            <h2 className="text-sm text-gray-400 font-bold">{title}</h2>
            <div style={{ height }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                        >
                            {data.map((_, index) => (
                                <Cell key={index} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `${value.toLocaleString()}`} />
                        {showLegend && <Legend />}
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PieChartComponent;

import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Area,
    CartesianGrid,
    Brush
} from 'recharts';
import type {CoinChartProps} from "@/types/coinChart.types.ts";


const CustomTooltip = ({active, payload, label}: any) => {
    if (active && payload && payload.length) {
        const date = new Date(label);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        return (
            <div className="bg-gray-900 border border-blue-500 rounded-lg shadow-xl p-3">
                <p className="text-sm font-bold text-blue-400">{formattedDate}</p>
                <p className="text-lg font-bold text-white">
                    ${payload[0].value.toFixed(2)}
                </p>
            </div>
        );
    }
    return null;
};

const CustomCursor = ({points, height}: any) => {
    return (
        <line
            x1={points[0].x}
            y1={0}
            x2={points[0].x}
            y2={height}
            stroke="#3b82f6"
            strokeWidth={1}
            strokeDasharray="3 3"
        />
    );
};

export default function CoinChart({data}: CoinChartProps) {
    const yValues = data.map(item => item.y);
    const maxY = Math.max(...yValues);
    const minY = Math.min(...yValues);

    return (
        <div className="w-full h-[300px]  rounded-xl p-4">
            <ResponsiveContainer>
                <ComposedChart data={data} margin={{top: 5, right: 20, bottom: 5, left: 10}}>
                    <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="100%" stopColor="#1e3a8a" stopOpacity={0.1}/>
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#374151"
                        horizontal={true}
                        vertical={false}
                    />

                    <XAxis
                        dataKey="x"
                        axisLine={false}
                        tickLine={false}
                        tick={{fill: '#9CA3AF', fontSize: 12}}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                        })}
                        padding={{left: 20, right: 20}}
                    />

                    <YAxis
                        domain={[minY * 0.98, maxY * 1.02]}
                        orientation="right"
                        axisLine={false}
                        tickLine={false}
                        tick={{fill: '#9CA3AF', fontSize: 12}}
                        tickFormatter={(value) => `$${value.toFixed(0)}`}
                    />

                    <Tooltip
                        content={<CustomTooltip/>}
                        cursor={<CustomCursor/>}
                    />

                    <Area
                        type="monotone"
                        dataKey="y"
                        fill="url(#colorGradient)"
                        strokeWidth={0}
                        isAnimationActive={true}
                        animationDuration={1000}
                    />

                    <Line
                        type="monotone"
                        dataKey="y"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{r: 6, fill: '#60a5fa'}}
                        isAnimationActive={true}
                        animationDuration={1000}
                    />

                    <Brush
                        dataKey="x"
                        height={20}
                        stroke="#4b5563"
                        fill="#1f2937"
                        travellerWidth={8}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', {month: 'short'})}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
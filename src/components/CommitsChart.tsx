import { commitsByDate } from "../types";
import { format, parseISO } from "date-fns";
import { useDateIntevall } from "../contexts/DateFilterContext";
import "../styles/CommitsChart.css";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export default function Chart(props: { data: commitsByDate[] }) {
  // Source: https://recharts.org/en-US/api/LineChart
  // Source: https://recharts.org/en-US/examples/SimpleLineChart
  // Source: https://www.youtube.com/watch?v=e4en8kRqwe8

  const graphColor = "#8884d8";

  const [start, end] = useDateIntevall();
  const filteredData = props.data.slice(start, end + 1);

  function CustomTooltip({ active, payload, label }: any) {
    if (active) {
      return (
        <div className="tooltip">
          <h4 className="date">
            {format(parseISO(label), "eeee, d. MMM, yyyy")}
          </h4>
          <p className="numCommits">
            Commits: {JSON.stringify(payload[0].value, null, 2)}
          </p>
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={filteredData}
          margin={{
            top: 5,
            right: 50,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="fill-color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={graphColor} stopOpacity={0.7} />
              <stop offset="100%" stopColor={graphColor} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={(str) => {
              return format(parseISO(str), "MMM, d");
            }}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="commits"
            stroke={graphColor}
            fill="url(#fill-color)"
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

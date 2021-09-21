import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Api_commits, commitsByDate } from "./types";
import { getCommitsFromGitlab } from "./api/ApisCalls";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useWindowDimensions from "./hooks/useWindowSize";
import "./Commits.css";
// import { format } from "path";
import { format, parseISO } from "date-fns";

export default function Commits() {
  // list of object containing date and number of commits that date
  // that will be passed to the chart for ploting
  const [chartsData, setChartsData] = useState<commitsByDate[]>([
    { date: "2021-09-10", commits: 0 },
  ]);
  //unused and unfinished hook to store the commits directly from api
  const [apiCommits, setCommits] = useState<Api_commits>();

  const { height, width } = useWindowDimensions();
  let containerWidth = width;
  // const commitsRef = useRef<HTMLDivElement>(null);

  function updateCommitData(commits: Api_commits[]) {
    let localCommits: commitsByDate[] = [];
    for (let commit of commits) {
      const date = commit.committed_date.slice(0, 10);
      if (localCommits.some((commit) => commit.date === date)) {
        localCommits = localCommits.map((commit) => {
          if (commit.date === date) {
            return {
              ...commit,
              commits: commit.commits + 1,
            };
          }
          return commit;
        });
      } else {
        let commitDate: commitsByDate = {
          date: date,
          commits: 1,
        };
        localCommits.push(commitDate);
      }
    }
    localCommits.reverse();
    setChartsData(localCommits);
  }

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const commits = await getCommitsFromGitlab();
        updateCommitData(commits);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCommits();
  }, []);

  // useLayoutEffect(() => {
  //   if (null !== commitsRef.current) {
  //     containerWidth = commitsRef.current.clientWidth;
  //   }
  // });

  let props = {
    data: chartsData,
    width: containerWidth,
  };

  return (
    <div className="commits">
      <p></p>
      <Chart {...props} />
    </div>
  );
}

function Chart(props: { data: commitsByDate[]; width: number }) {
  // Source: https://recharts.org/en-US/api/LineChart
  // Source: https://recharts.org/en-US/examples/SimpleLineChart
  // Source: https://www.youtube.com/watch?v=e4en8kRqwe8

  let containerWidth = useRef<number>(0);
  let chartRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (null !== chartRef.current) {
      containerWidth.current = chartRef.current.clientWidth;
    }
  });

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
    <div className="chart" ref={chartRef}>
      <LineChart
        width={containerWidth.current}
        height={300}
        data={props.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="commits"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
}

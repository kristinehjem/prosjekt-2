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
  AreaChart,
  Area,
} from "recharts";
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

  let props = {
    data: chartsData,
  };

  return (
    <div className="commits">
      <p></p>
      <Chart {...props} />
    </div>
  );
}

function Chart(props: { data: commitsByDate[] }) {
  // Source: https://recharts.org/en-US/api/LineChart
  // Source: https://recharts.org/en-US/examples/SimpleLineChart
  // Source: https://www.youtube.com/watch?v=e4en8kRqwe8

  const graphColor = "#8884d8";

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
          data={props.data}
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

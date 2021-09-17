import { GITLAB_TOKEN } from "./tokens";
import React, { useEffect, useState } from "react";
import { Api_commits, commitsByDate }from './types'
import { getCommitsFromGitlab } from './api/ApisCalls'
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

export default function Commits() {
  // list of object containing date and number of commits that date
  // that will be passed to the chart for ploting
  const [commitsData, changeCommitsData] = useState<commitsByDate>({});

  // Dummy data for testing ploting -v
  const data = [
    {
      name: "Page A",
      commits: 2400,
    },
    {
      name: "Page B",
      commits: 1398,
    },
    {
      name: "Page C",
      commits: 9800,
    },
    {
      name: "Page D",
      commits: 3908,
    },
    {
      name: "Page E",
      commits: 4800,
    },
    {
      name: "Page F",
      commits: 3800,
    },
    {
      name: "Page G",
      commits: 4300,
    },
  ];

  function updateCommitData(commits: Api_commits[]) {
    for (let commit of commits) {
      const date = commit.committed_date.slice(0, 10);
      if (date in commitsData) {
        changeCommitsData((prevCommitsData) => {
          return { ...prevCommitsData, date: (prevCommitsData[date] += 1) };
        });
      } else {
        changeCommitsData((prevCommitsData) => {
          return { ...prevCommitsData, [date]: 1 };
        });
      }
    }
    console.log(commitsData);
  }

useEffect(() => {
  const fetchCommits = async () => {
    try{
      const commits = await getCommitsFromGitlab();
      updateCommitData(commits);
    } catch(e) {
      console.log(e);
    }
  }
  fetchCommits();
}, []);

  return (
    <div>
      <p></p>
      <Chart data={data} />
    </div>
  );
}

function Chart(props: { data: any[]}) {
  // Source: https://recharts.org/en-US/api/LineChart
  // Source: https://recharts.org/en-US/examples/SimpleLineChart

  return (
    <LineChart
      width={500}
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
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="commits"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}

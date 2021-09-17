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
  const [chartsData, setChartsData] = useState<commitsByDate[]>([{date: "2021-09-10", commits: 0}]);
  //unused and unfinished hook to store the commits directly from api
  const [apiCommits, setCommits] = useState<Api_commits>();

  function updateCommitData(commits: Api_commits[]) {
    let localCommits: commitsByDate[] = [];
    for (let commit of commits) {
      const date = commit.committed_date.slice(0, 10);
      if ((localCommits.some(commit => commit.date === date))) {
        localCommits = localCommits.map(commit => {
          if (commit.date === date) {
            return {
              ...commit,
              commits: commit.commits + 1,
          }
        } return commit;
      })
      } else {
        let commitDate: commitsByDate = {
          date: date,
          commits: 1,
        }
        localCommits.push(commitDate)
      }
    }
    localCommits.reverse();
    setChartsData(localCommits); 
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
      <Chart data={chartsData} />
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
      <XAxis dataKey="date" />
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

import { GITLAB_TOKEN } from "./tokens";
import React, { useState } from "react";
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
import { type } from "os";

const url = "https://gitlab.stud.idi.ntnu.no/api/v4/projects/11800";

interface api_commits {
  id: string;
  short_id: string;
  created_at: string;
  parent_ids: string[];
  title: string;
  message: string;
  author_name: string;
  author_email: string;
  authored_date: string;
  committer_name: string;
  committer_email: string;
  committed_date: string;
  web_url: string;
}

export default function Commits() {
  const [commits, changeCommits] = useState<any[]>([]);

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

  function setCommits(list: any[]): void {
    console.log(list);
    //() => changeCommits(list);
  }

  function getCommits() {
    let filteredData: string[];

    try {
      fetch(url + "/repository/commits", {
        headers: new Headers({
          Authorization: "Bearer " + GITLAB_TOKEN,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data); // Loging only for testing purposes
          changeCommits(data);
        });
    } catch {
      console.log("Failed fetching commits");
    }
  }

  console.log(commits);

  return (
    <div>
      <button onClick={() => getCommits()}>click</button>
      <p></p>
      <Chart data={data} />
    </div>
  );
}

//function presentCommits() {
//  getCommits().then((commits) => {
//    console.log(commits);
//  });
//}

function Chart(props: { data: any[] }) {
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

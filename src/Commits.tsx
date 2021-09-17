import { GITLAB_TOKEN } from "./tokens";
import React, { useEffect, useState } from "react";
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
import { stringify } from "querystring";

const url = "https://gitlab.stud.idi.ntnu.no/api/v4/projects/5834";
//const url = "https://gitlab.stud.idi.ntnu.no/api/v4/projects/11800";

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

// i'nterface num_commits {
//   date: string;
//   numCommits: number;
// }'

export default function Commits() {
  const [commits, changeCommits] = useState<any[]>([]); // Probably useless now

  // list of object containing date and number of commits that date
  // that will be passed to the chart for ploting
  const [commitsData, changeCommitsData] = useState<{ [key: string]: number }>({
    "2021-09-14": 1,
  });

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

  async function getCommits() {
    try {
      const res = await fetch(url + "/repository/commits", {
        headers: new Headers({
          Authorization: "Bearer " + GITLAB_TOKEN,
        }),
      })
        return res.json();
          //console.log(data); // Loging only for testing purposes
          // changeCommits(data);
          //updateCommitData(data);
    } catch {
      console.log("Failed fetching commits");
    }
  }

  function updateCommitData(commits: api_commits[]) {
    for (let commit of commits) {
      const date = commit.committed_date.slice(0, 10);
      console.log(date)
      if (date in commitsData) {
        changeCommitsData((prevCommitsData) => {
          return { ...prevCommitsData, date: (prevCommitsData[date] += 1) };
        });
      } else {
        // This part works
        changeCommitsData((prevCommitsData) => {
          return { ...prevCommitsData, [date]: 1 };
        });
      }
    }
  }

  useEffect(() => {
    const fetchCommits = async () => {
      const commits = await getCommits();
      updateCommitData(commits);
    }
    fetchCommits();
  })

  return (
    <div>
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

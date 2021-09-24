import React, { useEffect, useState } from "react";
import { Api_commits, commitsByDate } from "../types";
import { getCommitsFromGitlab } from "../api/ApisCalls";
import Chart from "./CommitsChart";
import "../styles/Commits.css";

function getDates(startDateStr: string) {
  // Takes dates on the format '2000-01-01'
  let currentDate = new Date(startDateStr + "T00:00:00");
  const stopDate = new Date();
  let allDates: commitsByDate[] = [];

  while (currentDate <= stopDate) {
    let date: commitsByDate = {
      date: currentDate.toISOString().slice(0, 10),
      commits: 0,
    };
    allDates.push(date);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return allDates;
}

export default function Commits() {
  // list of object containing date and number of commits that date
  // that will be passed to the chart for ploting
  const [chartsData, setChartsData] = useState<commitsByDate[]>([
    { date: "2021-09-10", commits: 0 },
  ]);
  //unused and unfinished hook to store the commits directly from api
  const [apiCommits, setCommits] = useState<Api_commits>();

  function updateCommitData(commits: Api_commits[]) {
    const firstCommitDate = commits.slice(-1)[0].committed_date.slice(0, 10);

    let localCommits: commitsByDate[] = getDates(firstCommitDate);
    for (let commit of commits) {
      const date = commit.committed_date.slice(0, 10);
      localCommits = localCommits.map((commit) => {
        if (commit.date === date) {
          return {
            ...commit,
            commits: commit.commits + 1,
          };
        }
        return commit;
      });
    }
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

  const props = {
    data: chartsData,
  };

  return (
    <div className="commits">
      <p></p>
      <Chart {...props} />
    </div>
  );
}

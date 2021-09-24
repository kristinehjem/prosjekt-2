import React, { useEffect, useState } from "react";
import { Api_commits, commitsByDate } from "../types";
import { getCommitsFromGitlab } from "../api/ApisCalls";
import Chart from "./CommitsChart";
import DateSlider from "./DateSlider";
import "../styles/Commits.css";

function getDates(startDateStr: string) {
  /**
   * Retuns an array of objects with all dates from start date untill
   * today with number of commits that day equal to 0
   *
   * @param startDateStr - First date in the array as a string on the
   * format "YYYY-MM-DD"
   *
   * @returns List of objects from start date untill today on the
   * format [{date: "2000-01-01", commits: 0}, ...]
   */
  let currentDate = new Date(startDateStr);
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

  function updateCommitData(apiCommits: Api_commits[]) {
    /**
     * Function taking api respons from commits and updating state
     * of chartsData
     *
     * @param commits - Resons from GitLab API. Array of Api_commits
     */
    const firstCommitDate = apiCommits.slice(-1)[0].committed_date.slice(0, 10);

    // Array of commitsByDate that is used to update state of chatsData
    let newChartsDataState: commitsByDate[] = getDates(firstCommitDate);

    for (let apiCommit of apiCommits) {
      const date = apiCommit.committed_date.slice(0, 10);
      newChartsDataState = newChartsDataState.map((chartDataObject) => {
        // Increment number of commits that day if the chartDataObject
        // is equal to the date of the commit returned from the api
        if (chartDataObject.date === date) {
          return {
            ...chartDataObject,
            commits: chartDataObject.commits + 1,
          };
        }
        return chartDataObject;
      });
    }
    setChartsData(newChartsDataState);
  }

  useEffect(() => {
    let isMounted = true
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
      <Chart {...props} />
      <DateSlider {...props} />
    </div>
  );
}

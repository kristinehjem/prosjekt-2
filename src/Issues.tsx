import "./Issues.css";
import React, { MouseEvent, useEffect, useState } from 'react';
import { getIssuesFromGitlab } from "./api/ApisCalls"
import { Issue } from "./types";

export default function Issues() {

  const [issues, setIssues] = useState<Issue[] | []>([]);
  const [issuesFilter, setIssuesFilter] = useState<String>("");
  useEffect(() => {
    const fetchIssuesList = async () => {
      const response = await getIssuesFromGitlab()
      setIssues(response);
      console.log(response);
      console.log("hey");
    }
    fetchIssuesList();
    let initialFilter = localStorage.getItem('issuesFilter')
    if (initialFilter == null) {
      localStorage.setItem('initialFilter', 'all');
      setIssuesFilter('all');
    } else {
      setIssuesFilter(initialFilter);
    }
  }, [])
  
  console.log(issues);
  
  let issueItems = issues.map((issue) =>
    <div className="issue" onClick={showIssueDescription}>{issue.title}</div>
  );
  return (
    <div className="wrapper">
      <h1>Issues</h1>
      <div className="issueList">
        {issueItems}
      </div>
    </div>

  );

  function showIssueDescription(event: MouseEvent<HTMLDivElement>) {
    console.log(event);

  }
}


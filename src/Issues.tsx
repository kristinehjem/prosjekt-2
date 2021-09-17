import "./Issues.css";
import React, { MouseEvent, useEffect, useState } from 'react';
import { getIssuesFromGitlab } from "./api/ApisCalls"
import { Issue } from "./types";

export default function Issues() {

  const [issues, setIssues] = useState<Issue[] | []>([]);
  const [issuesFilter, setIssuesFilter] = useState<String>("");
  const [filteredIssues, setFilteredIssues] = useState<Issue[] | []>([]);

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
      localStorage.setItem('issuesFilter', 'all');
      setIssuesFilter('all');
    } else {
      setIssuesFilter(initialFilter);
    }
  }, [])

  useEffect(() => {
    let _filteredIssues = []
    if (issuesFilter == 'all') {
      _filteredIssues = issues;
    }
    else {
      _filteredIssues = issues
      _filteredIssues = _filteredIssues.filter(issue => {
        return issue.state == issuesFilter
      })
    }
    console.log("filteredIssues", _filteredIssues);
    setFilteredIssues(_filteredIssues)
  }, [issuesFilter, issues])

  let issueItems = filteredIssues.map((issue) =>
    <div className="issue" onClick={showIssueDescription}>{issue.title}</div>
  );
  return (
    <div className="wrapper">
      <h1>Issues</h1>
      <button onClick={() => changeFilter('all')}>Show all</button>
      <button onClick={() => changeFilter('opened')}>Show open</button>
      <button onClick={() => changeFilter('closed')}>Show closed</button>
      <div className="issueList">
        {issueItems}
      </div>
    </div>

  );

  function showIssueDescription(event: MouseEvent<HTMLDivElement>) {
    console.log(event);

  }

  function changeFilter(filter: string) {
    setIssuesFilter(filter);
    localStorage.setItem('issuesFilter', filter);
  }
}


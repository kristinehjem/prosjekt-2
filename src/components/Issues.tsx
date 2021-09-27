import "../styles/Issues.css";
import React, { MouseEvent, useEffect, useState } from 'react';
import { getIssuesFromGitlab } from "../api/ApisCalls"
import { Issue } from "../types";
import  IssueCard  from "./IssueCard"


export default function Issues() {

  const [issues, setIssues] = useState<Issue[] | []>([]);
  const [issuesFilter, setIssuesFilter] = useState<String>("");
  const [filteredIssues, setFilteredIssues] = useState<Issue[] | []>([]);

  useEffect(() => {
    const fetchIssuesList = async () => {
      const response = await getIssuesFromGitlab()
      setIssues(response);
    }
    fetchIssuesList();
    let initialFilter = sessionStorage.getItem('issuesFilter')
    if (initialFilter === null) {
      sessionStorage.setItem('issuesFilter', 'all');
      setIssuesFilter('all');
    } else {
      setIssuesFilter(initialFilter);
    }
  }, [])

  useEffect(() => {
    let _filteredIssues = []
    if (issuesFilter === 'all') {
      _filteredIssues = issues;
    }
    else {
      _filteredIssues = issues
      _filteredIssues = _filteredIssues.filter(issue => {
        return issue.state === issuesFilter
      })
    }
    setFilteredIssues(_filteredIssues)
  }, [issuesFilter, issues])

  // checking in sessionStorage for the previous selected option
  let selectOption = ""; 
  if (sessionStorage.getItem("issuesFilter") === "all"){
    selectOption = "Show All";
  }
  if (sessionStorage.getItem("issuesFilter") === "opened"){
    selectOption = "Show open";
  }
  if (sessionStorage.getItem("issuesFilter") === "closed"){
    selectOption = "Show closed";
  }

  let issueItems = filteredIssues.map((issue) =>
    <div className="issue">
      <IssueCard title = {issue.title} description = {issue.description} issueNumber ={issue.iid} labels = {issue.labels}/>
    </div>
  );
  return (
    <div className="wrapper">
      <h1>Issues</h1>
      <div className = "selectFilter">
      <select data-testid="selectFilterIssue" onChange={changeFilter}>
        <option value="" selected disabled hidden>{selectOption}</option>
        <option value= 'all'  >Show all</option>
        <option value = 'opened' >Show open</option>
        <option value ='closed' >Show closed</option>
      </select>
      </div>
      <div className="issueList">
        {issueItems}
      </div>
    </div>

  );

  function changeFilter(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log(event.target.value);
    setIssuesFilter(event.target.value);
    sessionStorage.setItem('issuesFilter', event.target.value);
  }
}


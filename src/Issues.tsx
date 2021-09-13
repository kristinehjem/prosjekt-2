import { GITLAB_TOKEN } from "./tokens";
import "./Issues.css";
import React, { MouseEvent } from 'react';

export default function Issues() {
  let issues: string[] = ["issue 1sssssssssss sssssssssssssss", "issue 2", "issue 3", "issue 4", "issue 5", "issue 6", "issue 7"]
  let issueItems = issues.map((issue) =>
  <div className = "issue" onClick = {showIssueDescription}>{issue}</div>
  );
  return (
    <div className = "wrapper">
      <h1>Issues</h1>
      <div className = "issueList">
        {issueItems}
      </div>
    </div>
    
  );
  
function showIssueDescription(event: MouseEvent<HTMLDivElement>) {
  console.log(event);
  
}
}


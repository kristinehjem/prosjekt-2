import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./IssueCard.css"
import { fontWeight } from '@mui/system';

//code from https://mui.com/components/cards/

export default function IssueCard(props: {title: string, description: string, issueNumber: number, labels: string[]}) {
    let issueLabels = props.labels.map((label)=>
    <div className="label">{label}</div>)
    

  return (
    <Card className ="issueCard" sx={{ width: 150, height: 200 }}>
      <CardContent>
        <Typography sx={{ fontSize: 12}} color="text.secondary" gutterBottom>
          #{props.issueNumber}
        </Typography>
        <Typography sx={{ fontSize: 16, fontWeight: 'medium'}} component="div">
          {props.title}
        </Typography>
        <Typography className="labels" sx={{ mb: 1.5 }} color="text.secondary" component="div">
          {issueLabels}
        </Typography>
      </CardContent>
      
    </Card>
  );
}

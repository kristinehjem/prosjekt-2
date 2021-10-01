//import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "../styles/IssueCard.css"

//code from https://mui.com/components/cards/

export default function IssueCard(props: {title: string, description: string, issueNumber: number, labels: string[]} ) {
  let issueLabels = props.labels.map((label)=>
    <div className="label">{label}</div>)
  

  return (
    <div>
    <Card className ="issueCard">
      <CardContent>
        <Typography sx={{ fontSize: 14, fontFamily: 'Montserrat'}} color="text.secondary" gutterBottom>
          #{props.issueNumber}
        </Typography>
        <Typography sx={{fontFamily: 'Montserrat', fontWeight: 500, fontSize: 16}} component="div">
          {props.title}
        </Typography>
        <Typography className="labels" sx={{ mb: 1.5, fontFamily: 'Montserrat'}} component="div">
          {issueLabels}
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
}

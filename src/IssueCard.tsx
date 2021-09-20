import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./IssueCard.css"



export default function IssueCard(props: {title: string, description: string, issueNumber: number, labels: string[]}) {
  return (
    <Card sx={{ width: 150, height: 200 }}>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          #{props.issueNumber}
        </Typography>
        <Typography sx={{ fontSize: 16 }} component="div">
          {props.title}
        </Typography>
        <Typography className="labels" sx={{ mb: 1.5 }} color="text.secondary">
          {props.labels}
        </Typography>
      </CardContent>
    </Card>
  );
}
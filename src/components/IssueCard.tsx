//import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "../styles/IssueCard.css"
import { fontWeight } from '@mui/system';
import ShowIssueDescription from './IssueModal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState, MouseEvent } from 'react';

//code from https://mui.com/components/cards/

export default function IssueCard(props: {title: string, description: string, issueNumber: number, labels: string[]}) {
    let issueLabels = props.labels.map((label)=>
    <div className="label">{label}</div>)
    let [open, setOpen] = useState<boolean>(false);

    const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
    
    function handleShow() {
      setOpen(open = !open);
    }

  return (
    <div onClick={handleShow} >
    <Card className ="issueCard" sx={{ width: "100%", height: "100%" }}>
      <CardContent>
        <Typography sx={{ fontSize: 12}} color="text.secondary" gutterBottom>
          #{props.issueNumber}
        </Typography>
        <Typography component="div">
          {props.title}
        </Typography>
        <Typography className="labels" sx={{ mb: 1.5 }} color="text.secondary" component="div">
          {issueLabels}
        </Typography>
      </CardContent>
    </Card>
    {open ? <ShowIssueDescription description = {props.description} issueNumber = {props.issueNumber}/> : null}

    </div>
  );
}

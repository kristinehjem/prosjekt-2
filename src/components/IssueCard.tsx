import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "../styles/IssueCard.css"

//code from https://mui.com/components/cards/

export default function IssueCard(props: {title: string, description: string, issueNumber: number, labels: string[]}) {
    let issueLabels = props.labels.map((label, i)=>
    <div key={i} className="label">{label}</div>)
    

  return (
    <Card className ="issueCard" sx={{ width: "100%", height: "100%" }}>
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

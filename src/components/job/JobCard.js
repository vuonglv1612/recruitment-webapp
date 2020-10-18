import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LinesEllipsis from 'react-lines-ellipsis'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: 10
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  pos: {
    marginBottom: 5,
  },
});

export default function JobCard({ job }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
      <Typography variant="h3" className={classes.title} color="textSecondary" gutterBottom>
      <LinesEllipsis text={"📢 " + job.title} maxLine='1' ellipsis='...' trimRight basedOn='letters'/>
        </Typography>
      
        <Typography variant="h5" component="h2">💲 {job.salary}
        </Typography>
        <Typography className={classes.pos} color="textSecondary"><LinesEllipsis text={"🏠 " + job.address} maxLine='1' ellipsis='...' trimRight basedOn='letters'/>
        </Typography>
        <Typography className={classes.pos} variant="body2" component="p">
        <LinesEllipsis text={job.description} maxLine='2' ellipsis='...' trimRight basedOn='letters'/></Typography>
        <Box component="span">
          {
            job.tags.map((tag) => {
              return <Chip style={{marginLeft: 5}} label={tag}/>
            })
          }
        </Box>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="secondary" size="small">Xem chi tiết</Button>
      </CardActions>
    </Card>
  );
}

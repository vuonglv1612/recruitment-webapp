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
import { Link } from "react-router-dom";

const removeMd = require('remove-markdown');

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    padding: 10,
    // borderBottom: "0.5px solid gray",
    // borderTop: "1px solid gray",
    backgroundColor: theme.palette.background.light
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
  titileLink: {
    color: theme.palette.text.secondary
  },
  pos: {
    marginBottom: 5
  },
  tag: {
    backgroundColor: theme.palette.text.highlight
  },
  link: {
    color: "#FFF"
  }
}));

export default function JobCard({ job }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
      <Typography variant="h3" className={classes.title} color="textSecondary" gutterBottom>
      <Link className={classes.titileLink} to={"/jobs/" + job.slug} key={job.slug}><LinesEllipsis text={"📢 " + job.title} maxLine='1' ellipsis='...' trimRight basedOn='letters'/></Link>
        </Typography>
      
        <Typography variant="h5" component="h2">💲 {job.salary}
        </Typography>
        <Typography className={classes.pos} color="textSecondary" component="div"><LinesEllipsis text={"🏠 " + job.address} maxLine='1' ellipsis='...' trimRight basedOn='letters'/>
        </Typography>
        <Typography className={classes.pos} variant="body2" component="div">
        <LinesEllipsis text={removeMd(job.brief)} maxLine='2' ellipsis='...' trimRight basedOn='letters'/></Typography>
        <Box component="span">
          {
            job.tags.map((tag) => {
              return <Chip key={tag} className={classes.tag} style={{marginLeft: 5}} label={tag}/>
            })
          }
        </Box>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="secondary" size="small"><Link className={classes.link} to={"/jobs/" + job.slug} key={job.slug}>Xem chi tiết</Link></Button>
      </CardActions>
    </Card>
  );
}

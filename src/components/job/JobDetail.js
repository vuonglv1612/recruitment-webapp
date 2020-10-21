import React, { useEffect, useState } from 'react';
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
import ReactMarkdown from 'react-markdown'
import { useParams } from "react-router-dom";
import { Container, Grid, CardMedia, Divider } from '@material-ui/core';
import Loader from 'src/components/Loader';
import { connect } from "react-redux";
import axios from 'axios';
import * as CONSTANTS from 'src/constants/detailJob';



const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    padding: 10
    // borderBottom: "0.5px solid gray",
    // borderTop: "1px solid gray",
    // backgroundColor: theme.palette.background.light
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  titileLink: {
    color: theme.palette.text.secondary
  },
  description: {
    marginTop: 15,
    fontSize: 18
  },
  tag: {
    backgroundColor: theme.palette.text.highlight
  },
  applyButton: {
    color: "#FFF",
    width: "100%",
    backgroundColor: "red"
  },
  applyButtonCaption: {
    color: "#FFFFFF"
  },
  headerBanner: {
    height: "30vh",
    backgroundPosition: "center"
  },
  companyBox: {
    backgroundColor: theme.palette.background.light,
  },
  companyImage: {
    height: 200
  }
}));


function JobDetail({ authState }) {
  const classes = useStyles();
  var { slug } = useParams()
  const [job, setJob] = useState({})
  const [employer, setEmployer] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const identities = authState.identities
  const userType = identities?.user_type
  
  useEffect(() => {
    setLoading(true)
    let job = {}
    let employer = {}
    axios.get(CONSTANTS.API_GET_JOB + slug).then((response) => {
      job = response.data
      axios.get(CONSTANTS.API_GET_EMPLOYER + job?.employer_id).then((response) => {
        employer = response.data
        setJob(job)
        setEmployer(employer)
        setLoading(false)
      })
    }).catch((err) => {setError(err.response.data.detail); setLoading(false);})
  }, [slug]);

  return (<>
    {loading ? <Loader /> : null}
    <Container className={classes.root}>
      <Grid
        container
        spacing={3}
      >
        <Grid item xs={12}>
          <CardMedia className={classes.headerBanner} image="/static/images/detaijob_header.jpg" />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}>
        <Grid item
          md={3}>
          <Grid item xs={12}>
            <Card className={classes.companyBox} >
              <CardMedia
                className={classes.companyImage}
                image="/static/images/bigcityboy.jpg"
                title="Company Image"
              />
              <CardContent>
                <Typography gutterBottom variant="h3" component="h2">{employer?.name}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">{employer?.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item
          md={9}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h3" className={classes.title} color="textSecondary" gutterBottom>📢 {job?.title}
              </Typography>

              <Box component="span">
                {
                  job?.tags?.map((tag) => {
                    return <Chip className={classes.tag} style={{ marginLeft: 5 }} label={tag} />
                  })
                }
              </Box>
              <Typography className={classes.pos} color="textSecondary"><LinesEllipsis text={"🏠 " + job?.address} maxLine='1' ellipsis='...' trimRight basedOn='letters' />
                <Typography variant="h5" component="h2">💲 {job?.salary}
                </Typography>
              </Typography>
              <Divider />
              <Typography className={classes.description} variant="body2" component="p">
                <ReactMarkdown>{job?.description}</ReactMarkdown></Typography>
            </CardContent>
            { userType !== "employer" ? <CardActions>
              <Button className={classes.applyButton} variant="contained" size="small"><Link className={classes.applyButtonCaption} to={"/"} >Ứng tuyển</Link></Button>
            </CardActions> : null }
          </Card>
        </Grid>
      </Grid>
    </Container>
  </>
  );
}

function mapStateToProps(state) {
  return {
      authState: state.authState,
  };
}


export default connect(mapStateToProps)(JobDetail);

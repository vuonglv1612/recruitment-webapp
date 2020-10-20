import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Page from 'src/components/Page';
import JobCard from '../../components/job/JobCard';
import axios from 'axios';
import * as CONSTANTS from 'src/constants/home';
import Loader from 'src/components/Loader';


const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.dark,
    minHeight: 500,
    paddingBottom: theme.spacing(3),
    // paddingTop: theme.spacing(3),
  },
  content: {
    backgroundColor: "#FFF",
    borderRadius: "0px 0px 5px 5px",
    padding: theme.spacing(2)
  },
  jobCounter: {
    color: theme.palette.text.secondary,
    textAlign: "left",
    fontWeight: "bold",
    marginBottom: 10
  },
  jobCard: {
    padding: 5,
  }
}));

const Home = () => {
  console.log(CONSTANTS.GET_ALL_JOB_API);
  const classes = useStyles();
  const numOfJobs = 100;
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    axios({
      method: "GET",
      url: CONSTANTS.GET_ALL_JOB_API,
    })
      .then((response) => {
        setResponse(response?.data)
        console.log(response.data);
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }, []);
  return (
    <Page
      className={classes.root}
      title="Trang chủ"
    >
      {loading ? <Loader /> : null}
      <Container maxWidth="lg" className={classes.content}>
        <Grid
          container
          spacing={3}
        >

          <Grid
            item
            xs={12}
          >
            <Grid
              item
              xs={12}
            >
              {response?.total ? <Typography variant="h3" className={classes.jobCounter}>
                <Typography variant="h3" component="span" style={{ color: "red", fontWeight: "bold" }}>{response?.total}</Typography> việc làm IT tại Việt Nam cho bạn
            </Typography> : null }
            </Grid>
            <Grid
              item
              xs={12}
            >
              {response?.jobs.map((data) => {
                return <Grid key={data.id}
                  item
                  xs={12}
                  className={classes.jobCard}
                ><JobCard job={data} /></Grid>
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Home;

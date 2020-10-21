import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useParams } from "react-router-dom";
import Page from 'src/components/Page';
import ApplyCard from '../../components/apply/ApplyCard';
import axios from 'axios';
import * as CONSTANTS from 'src/constants/recruitingjob';
import Loader from 'src/components/Loader';
import {connect} from 'react-redux';


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
  applyCounter: {
    color: theme.palette.text.secondary,
    textAlign: "left",
    fontWeight: "bold",
    marginBottom: 10
  },
  applyCard: {
    padding: 5,
  }
}));

const JobAppliesView = ({ authState }) => {
    var { job_id } = useParams()
  const classes = useStyles();
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const identities = authState.identities
  const api = CONSTANTS.job_applied_api(job_id)
  console.log(api)
  useEffect(() => {
    setLoading(true)
    axios({
      method: "GET",
      url: api,
      headers: {
        Authorization: 'Bearer ' + identities?.access_token
      }
    })
      .then((response) => {
        setResponse(response?.data)
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
              {response?.total != null ? <Typography variant="h3" className={classes.applyCounter}>
              Công việc này đang có <Typography variant="h3" component="span" style={{ color: "red", fontWeight: "bold" }}>{response?.total}</Typography> ứng tuyển
            </Typography> : null }
            </Grid>
            <Grid
              item
              xs={12}
            >
              {response?.applies.map((apply) => {
                return <Grid key={apply?.id}
                  item
                  xs={12}
                  className={classes.applyCard}
                ><ApplyCard apply={apply} /></Grid>
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};


function mapStateToProps(state) {
  return {
      authState: state.authState,
  };
}


export default connect(mapStateToProps)(JobAppliesView);

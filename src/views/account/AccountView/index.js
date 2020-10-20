import React, { useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import { connect } from 'react-redux';
import { useNavigate} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = ({ authState }) => {
  const classes = useStyles();
  const navigation = useNavigate()
  useEffect(() => {
    if(authState?.identities?.logged_on){
      navigation("/", { replace: true })
    }
  })
  return (
    <Page
      className={classes.root}
      title="Cá nhân"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Profile user={authState.identities} />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails user={authState.identities}/>
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


export default connect(mapStateToProps)(Account);

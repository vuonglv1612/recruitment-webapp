import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


function Copyright() {
  return (
   <>
      <Typography>
      Copyright © Lê Văn Vương - D13CNPM4 - 18810310326
      </Typography>
      <Typography>
      Font-end: ReactJS
      </Typography>
      <Typography>
      Back-end: Python(FastAPI)
      </Typography>
      <Typography>
      Database: PostgreSQL
      </Typography>
    </>

  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    minHeight: 100,
    position: "absolute",
    bottom: 0,
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    color: "white",
    padding: 10
  },
}));

export default function MainFooter() {
  const classes = useStyles();

  return (
    <div>
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Copyright />

        </Container>
      </footer>
    </div>
  );
}

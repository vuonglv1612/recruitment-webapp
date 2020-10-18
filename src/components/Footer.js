import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Box } from '@material-ui/core';

function Copyright() {
  return (
    <Box color="white" style={{ margin: 10 }} clone>
      <Typography>
      Copyright © Lê Văn Vương - 18810310326
      </Typography>
    </Box>

  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: 'auto',
    minHeight: '10vh',
    width: '100%',
    backgroundColor: theme.palette.primary.main
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

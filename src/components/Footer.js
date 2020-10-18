import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Box } from '@material-ui/core';

function Copyright() {
  return (
    <Box color="white" style={{ margin: 10 }} clone>
      <Typography variant="body2">
        {'Copyright © '}
        <Link color="inherit" href="/">
          Lê Văn Vương - 18810310326
        </Link>
      </Typography>
    </Box>

  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: 'auto',
    minHeight: '5vh',
    zIndex: 99999,
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: theme.palette.primary.main
  },
}));

export default function MainFooter() {
  const classes = useStyles();

  return (
    <div>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}

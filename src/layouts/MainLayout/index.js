import React from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import MainFooter from '../../components/Footer';
import MainMenu from '../../components/Menu'

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    minHeight: "100vh",
    overflow: "hidden",
    position: "relative",
    paddingBottom: 100
  },
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    minHeight: 540
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    // overflow: 'auto'
  }
}));

const MainLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.rootContainer}>
      <MainMenu />
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </div>

  );
};

export default MainLayout;

import React from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import MainFooter from '../../components/Footer';
import MainMenu from '../../components/Menu'

const useStyles = makeStyles((theme) => ({
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
    overflow: 'auto'
  }
}));

const MainLayout = () => {
  const classes = useStyles();

  return (
    <div>
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

import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        textTransform: "uppercase"
    },
    menuLink: {
        color: theme.palette.text.logo
    },
    title: {
        flexGrow: 1,
    },
    logoLink: {
        color: theme.palette.text.logo
    },
    lightColor: {
        color: "#FFF",
    }
}));

function MainMenu(props) {
    console.log(props)
    const classes = useStyles();
    const classnames = clsx(classes.root, classes.lightColor)
    return (
        <div className={classnames}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h3" className={classes.title}>
                        <Link className={classes.logoLink} to="/">
                            EPU Jobs
                    </Link>
                    </Typography>
                    <Typography variant="h5" className={classes.menuButton}>
                        <Link className={classes.menuLink} to="/login">Đăng nhập</Link>
                    </Typography>
                    <Typography variant="h5" className={classes.menuButton}>
                        <Link className={classes.menuLink} to="/register">Đăng ký</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}


function mapStateToProps(state) {
    return {
      state: state,
    };
  }

export default connect(mapStateToProps)(MainMenu);
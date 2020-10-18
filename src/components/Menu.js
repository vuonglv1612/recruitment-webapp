import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    titleLink:{
        color: theme.palette.text.logo
    },
    lightColor: {
        color: "#FFF",
    }
}));

export default function MainMenu() {
    const classes = useStyles();
    const classnames = clsx(classes.root, classes.lightColor)
    return (
        <div className={classnames}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h3" className={classes.title}>
                        <Link className={classes.titleLink} to="/">
                            EPU Jobs
                    </Link>
                    </Typography>

                    <IconButton aria-label="manage" color="inherit">
                        <AccountCircleIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}

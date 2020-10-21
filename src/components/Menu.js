import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import Button from '@material-ui/core/Button';
import { Link, useNavigate } from "react-router-dom";
import { logoutAction } from 'src/redux/actions/auth'
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        // textTransform: "uppercase"
    },
    menuLink: {
        color: theme.palette.text.logo,
        textTransform: "none"
    },
    title: {
        flexGrow: 1,
    },
    logoLink: {
        color: theme.palette.text.logo
    },
    lightColor: {
        color: "#FFF",
    },
    newjobButton: {
        marginRight: 5,
        fontWeight: "bold",
        color: "#FF5722",
        border: "1px solid #FF5722"
    }
}));


function PublicMenu() {
    const classes = useStyles();
    return (
        <>
            <Typography variant="h5" className={classes.menuButton}>
                <Link className={classes.menuLink} to="/login">Đăng nhập</Link>
            </Typography>
            <Typography variant="h5" className={classes.menuButton}>
                <Link className={classes.menuLink} to="/register">Đăng ký</Link>
            </Typography>
        </>
    );
}

function LoggedOnMenu({ identities, dispatch }) {
    const navigation = useNavigate()
    const classes = useStyles();
    return (
        <>
            <Button
                className={classes.menuLink}
                color="inherit"
                startIcon={<PersonIcon />}
                onClick={() => {navigation("/account")}}
            >{identities.name}</Button>
            <IconButton color="inherit" aria-label="delete" onClick={() => dispatch(logoutAction())}>
                <ExitToAppIcon />
            </IconButton>
        </>
    );
}

function EmployerMenu({ identities }) {
    const navigation = useNavigate()
    const classes = useStyles();
    return (
        <>
            <Button
                className={classes.newjobButton}
                color="inherit"
                startIcon={<FiberNewIcon />}
                onClick={() => {navigation("/newjob")}}
            >Tuyển thêm</Button>
            <Button
                color="inherit"
                startIcon={<FiberNewIcon />}
                onClick={() => {navigation("/recruiting")}}
            >Đang tuyển</Button>
        </>
    );
}


function MainMenu({ authState, dispatch }) {
    const classes = useStyles();
    const classnames = clsx(classes.root, classes.lightColor)
    const identities = authState.identities
    return (
        <div className={classnames}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h3" className={classes.title}>
                        <Link className={classes.logoLink} to="/">
                            EPU Jobs
                    </Link>
                    </Typography>
                    {identities.logged_on && identities.user_type === "employer" ? <EmployerMenu identities={authState.identities} /> : null}
                    {identities.logged_on ? null : <PublicMenu />}
                    {identities.logged_on ? <LoggedOnMenu identities={authState.identities} dispatch={dispatch} /> : null}
                </Toolbar>
            </AppBar>
        </div>
    );
}


function mapStateToProps(state) {
    return {
        authState: state.authState,
    };
}

export default connect(mapStateToProps)(MainMenu);
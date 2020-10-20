import React from 'react';
import {
    makeStyles
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
    backdrop: {
        zIndex: 9999999,
        color: '#fff',
    }
}));


export default function Loader() {
    const classes = useStyles();
    return (
        <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    notification: {
        top: 100
    }
  }));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Notification(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(props.open);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
            <Snackbar className={classes.notification} anchorOrigin={{ vertical: "top", horizontal: "right" }} open={open} autoHideDuration={props.duration} onClose={handleClose}>
                <Alert onClose={handleClose} severity={props.notiType}>{props.message}</Alert>
            </Snackbar>
    );
}

Notification.defaultProps = {
    open: true,
    duration: 5000,
    notiType: "info"
}
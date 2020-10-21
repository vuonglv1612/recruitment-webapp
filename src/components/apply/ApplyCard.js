import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        padding: 10,
        // borderBottom: "0.5px solid gray",
        // borderTop: "1px solid gray",
        backgroundColor: theme.palette.background.light
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontWeight: "bold",
        marginBottom: 10,
    },
    titileLink: {
        color: theme.palette.text.secondary
    },
    pos: {
        marginBottom: 5
    },
    tag: {
        backgroundColor: theme.palette.text.highlight
    },
    link: {
        color: "#FFF"
    }
}));

function openTab(link) {
    window.open(link);
}

export default function ApplyCard({ apply }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography style={{color: "#FF5722"}} className={classes.pos} variant="body2" component="div">Ngày tạo: {apply?.created_at}</Typography>
                <Typography className={classes.pos} color="textSecondary" component="div">Mô tả: {apply?.description}</Typography>
                <Button variant="contained" color="secondary" size="small" onClick={() => openTab(apply?.cv)}>Xem CV</Button>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
    );
}

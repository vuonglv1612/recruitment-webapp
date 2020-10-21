import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Button,
    Container,
    Typography,
    makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Loader from 'src/components/Loader';
import * as CONSTANTS from 'src/constants/upgradeEmployee'
import { useSnackbar } from 'notistack';
import { connect } from 'react-redux';
import {logoutAction} from 'src/redux/actions/auth';


function handleErrorMessage(err) {
    let message = CONSTANTS.status_message_mapping[err.response.status]
    if (!message) {
        message = err.response.data.detail
    }
    return message
}


function upgrade(setSuccess, setLoading, setError, setStatusCode, identities) {
    setLoading(true)
    axios({
        method: "POST",
        url: CONSTANTS.UPGRADE_API,
        headers: {
            Authorization: 'Bearer ' + identities?.access_token
        }
    })
        .then((response) => {
            setStatusCode(response.status)
            setLoading(false)
            setSuccess(true)
        })
        .catch((err) => {
            setStatusCode(err.response.status)
            setError(handleErrorMessage(err));
            setLoading(false);
        })
}


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        height: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const UpgradeToEmployeeView = ({ authState, dispatch }) => {
    const navigate = useNavigate();
    const identities = authState.identities
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [statusCode, setStatusCode] = useState()
    const [upgradeRequest, setUpgradeRequest] = useState(false)
    const [upgradeSuccess, setUpgradeSuccess] = useState(false)
    const classes = useStyles();
    useEffect(() => {
        if (!identities.user_type) {
            enqueueSnackbar("Bạn chưa đăng nhập", { variant: 'warning' });
            navigate('/login', { replace: true });
        }
        if(identities.user_type === "employer" || identities.user_type === "employee"){
            enqueueSnackbar("Bạn không thể truy cập trang này", { variant: 'warning' });
            navigate('/', { replace: true });
        }
        if (!loading && upgradeRequest) {
            if (error) {
                setUpgradeRequest(false);
                enqueueSnackbar(error, { variant: 'error' });
                if(statusCode === 401){
                    dispatch(logoutAction())
                    navigate('/login', { replace: true });
                }
            }
            if (upgradeSuccess) {
                setUpgradeRequest(false);
                setUpgradeSuccess(false)
                enqueueSnackbar("Nâng cấp thành công", { variant: 'success' });
                enqueueSnackbar("Đăng nhập lại để áp dụng thay đổi", { variant: 'success' });
                dispatch(logoutAction())
                navigate('/login', { replace: true });
            }
        }
    }, [loading, upgradeRequest, upgradeSuccess, identities.user_type])
    return (
        <Page
            className={classes.root}
            title="Nâng cấp"
        >
            { loading ? <Loader /> : null}
            <Box
                display="flex"
                flexDirection="column"
                height="100%"
                justifyContent="center"
            >
                <Container maxWidth="sm">
                    <Box mb={3}>
                        {/* <Typography
                            color="textPrimary"
                            variant="h2"
                        >
                            Trở thành người tìm việc
                  </Typography> */}
                    </Box>
                    <Box my={2}>
                        <Button
                            color="primary"
                            disabled={loading}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            onClick={() => {setUpgradeRequest(true); upgrade(setUpgradeSuccess, setLoading, setError, setStatusCode, identities)}}
                        >
                            Trở thành người tìm việc
                  </Button>
                    </Box>

                </Container>
            </Box>
        </Page>
    );
};


function mapStateToProps(state) {
    return {
        authState: state.authState,
    };
}


export default connect(mapStateToProps)(UpgradeToEmployeeView);

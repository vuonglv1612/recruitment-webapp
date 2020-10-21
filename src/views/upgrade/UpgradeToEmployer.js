import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { Formik } from 'formik';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Loader from 'src/components/Loader';
import * as CONSTANTS from 'src/constants/upgradeEmployer'
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


function upgrade(setSuccess, setLoading, setError, setStatusCode, info, identities) {
    setLoading(true)
    axios({
        method: "POST",
        url: CONSTANTS.UPGRADE_API,
        data: info,
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

const UpgradeToEmployerView = ({ authState, dispatch }) => {
    const navigate = useNavigate();
    const identities = authState.identities
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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
                }            }
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
                    <Formik
                        initialValues={{
                            name: '',
                            address: '',
                            description: ''
                        }}
                        validationSchema={
                            Yup.object().shape({
                                name: Yup.string().max(255).required('Họ và tên không được để trống'),
                                address: Yup.string().required('Địa chỉ không được để trống'),
                                description: Yup.string().required('Hãy mô tả về công ty của bạn'),
                            })
                        }
                        onSubmit={(values, { setSubmitting }) => {
                            setUpgradeRequest(true)
                            setSubmitting(loading)
                            const info = {
                                name: values.name,
                                address: values.address,
                                description: values.description,
                                code: values.name.toLowerCase().replace(" ", "-"),
                                active: true,
                                type: "outsourcing"
                            }
                            upgrade(setUpgradeSuccess, setLoading, setError, setStatusCode, info, identities)
                        }}
                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            touched,
                            values
                        }) => (
                                <form onSubmit={handleSubmit}>
                                    <Box mb={3}>
                                        <Typography
                                            color="textPrimary"
                                            variant="h2"
                                        >
                                            Trở thành nhà tuyển dụng
                  </Typography>
                                    </Box>
                                    <TextField
                                        error={Boolean(touched.name && errors.name)}
                                        fullWidth
                                        helperText={touched.name && errors.name}
                                        label="Tên công ty"
                                        margin="normal"
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.name}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.address && errors.address)}
                                        fullWidth
                                        helperText={touched.address && errors.address}
                                        label="Địa chỉ"
                                        margin="normal"
                                        name="address"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.address}
                                        variant="outlined"
                                    />
                                    <TextField
                                        multiline
                                        rows={8}
                                        rowsMax={8}
                                        error={Boolean(touched.description && errors.description)}
                                        fullWidth
                                        helperText={touched.description && errors.description}
                                        label="Giới thiệu về công ty"
                                        margin="normal"
                                        name="description"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.description}
                                        variant="outlined"
                                    />
                                    <Box my={2}>
                                        <Button
                                            color="primary"
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                        >
                                            Nâng cấp
                  </Button>
                                    </Box>
                                </form>
                            )}
                    </Formik>
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


export default connect(mapStateToProps)(UpgradeToEmployerView);

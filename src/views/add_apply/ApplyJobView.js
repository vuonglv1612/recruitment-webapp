import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import * as CONSTANTS from 'src/constants/apply'
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
        url: CONSTANTS.ADD_APPLY_API,
        data: info,
        headers: {
            Authorization: 'Bearer ' + identities?.access_token
        }
    })
        .then((response) => {
            setStatusCode(response.status)
            setSuccess(true)
            setLoading(false)
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

const ApplyJobView = ({ authState, dispatch }) => {
    var { job_id } = useParams()
    const navigate = useNavigate();
    const identities = authState.identities
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [statusCode, setStatusCode] = useState()
    const [applyRequest, setApplyRequest] = useState(false)
    const [applySuccess, setApplySuccess] = useState(false)
    const classes = useStyles();
    useEffect(() => {
        if (!identities.user_type) {
            enqueueSnackbar("Bạn chưa đăng nhập", { variant: 'warning' });
            navigate('/login', { replace: true });
            return;
        }
        if (identities.user_type === "viewer") {
            enqueueSnackbar("Hãy nâng cấp trở thành người xin việc để ứng tuyển", { variant: 'warning' });
            navigate('/upgrade/employee', { replace: true });
            return;
        }
        if(identities.user_type !== "employee"){
            enqueueSnackbar("Bạn không thể truy cập trang này", { variant: 'warning' });
            navigate('/', { replace: true });
            return;
        }
        if(!job_id){
            enqueueSnackbar("Không tìm thấy công việc muốn ứng tuyển", { variant: 'warning' });
            navigate('/', { replace: true });
            return;
        }
        if (!loading && applyRequest) {
            if (error) {
                setApplyRequest(false);
                enqueueSnackbar(error, { variant: 'error' });
                if(statusCode === 401){
                    dispatch(logoutAction())
                    navigate('/login', { replace: true });
                }            }
            if (applySuccess) {
                setApplyRequest(false);
                setApplySuccess(false)
                enqueueSnackbar("Ứng tuyển thành công", { variant: 'success' });
                navigate('/', { replace: true });
            }
        }
    }, [loading, applyRequest, applySuccess, identities.user_type])
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
                            cv: 'https://linkto.your.cv',
                            description: ''
                        }}
                        validationSchema={
                            Yup.object().shape({
                                cv: Yup.string().required('Địa chỉ không được để trống'),
                                description: Yup.string().required('Hãy mô tả về công ty của bạn'),
                            })
                        }
                        onSubmit={(values, { setSubmitting }) => {
                            setApplyRequest(true)
                            setSubmitting(loading)
                            const info = {
                                job_id: job_id,
                                cv: values.cv,
                                description: values.description,
                            }
                            upgrade(setApplySuccess, setLoading, setError, setStatusCode, info, identities)
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
                                            Ứng tuyển
                  </Typography>
                                    </Box>
                                    <TextField
                                        multiline
                                        rows={8}
                                        rowsMax={8}
                                        error={Boolean(touched.description && errors.description)}
                                        fullWidth
                                        helperText={touched.description && errors.description}
                                        label="Thông tin khái quát về ứng tuyên của bạn"
                                        margin="normal"
                                        name="description"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.description}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.cv && errors.cv)}
                                        fullWidth
                                        helperText={touched.cv && errors.cv}
                                        label="Đường dẫn tới cv của bạn"
                                        margin="normal"
                                        name="cv"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.cv}
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
                                            Ứng tuyển
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


export default connect(mapStateToProps)(ApplyJobView);

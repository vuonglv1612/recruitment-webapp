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
import * as CONSTANTS from 'src/constants/jobs'
import { useSnackbar } from 'notistack';
import { connect } from 'react-redux';
import MDEditor from '@uiw/react-md-editor';
import {logoutAction} from 'src/redux/actions/auth';


function handleErrorMessage(err) {
    let message = CONSTANTS.status_message_mapping[err.response.status]
    if (!message) {
        message = err.response.data.detail
    }
    return message
}


function post_job(setSuccess, setLoading, setError, setStatusCode, job, identities) {
    setLoading(true)
    axios({
        method: "POST",
        url: CONSTANTS.ADDJOB_API,
        data: job,
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

const AddJobView = ({ authState, dispatch }) => {
    const navigate = useNavigate();
    const identities = authState.identities
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [statusCode, setStatusCode] = useState()
    const [postJobRequest, setPostJobRequest] = useState(false)
    const [postJobSuccess, setPostJobSuccess] = useState(false)
    const [description, setDescription] = useState("")
    const classes = useStyles();
    const tagRegex = /^\w(\s*,?\s*\w)*$/
    useEffect(() => {
        console.log(identities.user_type)
        if (!identities.user_type) {
            enqueueSnackbar("Bạn chưa đăng nhập", { variant: 'warning' });
            navigate('/login', { replace: true });
        }
        if(identities.user_type !== "employer"){
            enqueueSnackbar("Bạn không thể truy cập trang này", { variant: 'warning' });
            navigate('/', { replace: true });
        }
        if (!loading && postJobRequest) {
            if (error) {
                setPostJobRequest(false);
                enqueueSnackbar(error, { variant: 'error' });
                if(statusCode === 401){
                    dispatch(logoutAction())
                    navigate('/login', { replace: true });
                }            }
            if (postJobSuccess) {
                setPostJobRequest(false);
                setPostJobSuccess(false)
                enqueueSnackbar("Đăng tuyển thành công", { variant: 'success' });
                enqueueSnackbar("Trở về trang chủ để xem công việc vừa tạo", { variant: 'success' });
                navigate('/', { replace: true });
            }
        }
    }, [loading, postJobRequest, postJobSuccess, identities.user_type])
    return (
        <Page
            className={classes.root}
            title="Đăng tuyển"
        >
            { loading ? <Loader /> : null}
            <Box
                display="flex"
                flexDirection="column"
                height="100%"
                justifyContent="center"
            >
                <Container maxWidth="lg">
                    <Formik
                        initialValues={{
                            title: '',
                            address: '',
                            salary: 1,
                            brief: '',
                            tags: ''
                        }}
                        validationSchema={
                            Yup.object().shape({
                                title: Yup.string().min(3, "Tên công việc phải nhiều hơn 3 ký tự").max(255).required('Tên công việc không được để trống'),
                                address: Yup.string().min(3, "Địa chỉ phải nhiều hơn 3 ký tự").required('Địa chỉ không được để trống'),
                                salary: Yup.number().required('Lương không được để trống'),
                                brief: Yup.string().min(3, "Tóm tắt công việc phải nhiều hơn 3 ký tự").max(100).required('Tóm tắt công việc không được để trống'),
                                tags: Yup.string().required('Các thẻ không được để trống').matches(tagRegex, 'Danh sách các thẻ không hợp lệ. Các thẻ là Tiếng Việt không dấu và ngăn cách nhau bởi dấu phẩy'),
                            })
                        }
                        onSubmit={(values, { setSubmitting }) => {
                            if(description === ''){
                                enqueueSnackbar("Hãy nhập chi tiết công việc", { variant: 'error' });
                                setSubmitting(false)
                                return;
                            }
                            setPostJobRequest(true)
                            setSubmitting(loading)
                            const job = {
                                title: values.title,
                                address: values.address,
                                description: description,
                                salary: values.salary,
                                brief: values.brief,
                                tags: values.tags.split(",")
                            }
                            post_job(setPostJobSuccess, setLoading, setError, setStatusCode, job, identities)
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
                                            Đăng tuyển công việc mới
                  </Typography>
                                    </Box>
                                    <TextField
                                        error={Boolean(touched.title && errors.title)}
                                        fullWidth
                                        helperText={touched.title && errors.title}
                                        label="Tên công việc"
                                        margin="normal"
                                        name="title"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.title}
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
                                        error={Boolean(touched.salary && errors.salary)}
                                        fullWidth
                                        helperText={touched.salary && errors.salary}
                                        label="Lương"
                                        margin="normal"
                                        name="salary"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.salary}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.brief && errors.brief)}
                                        fullWidth
                                        helperText={touched.brief && errors.brief}
                                        label="Tóm tắt công việc"
                                        margin="normal"
                                        name="brief"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.brief}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.tags && errors.tags)}
                                        fullWidth
                                        helperText={touched.tags && errors.tags}
                                        label="Các thẻ liên quan"
                                        margin="normal"
                                        name="tags"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.tags}
                                        variant="outlined"
                                    />
                                    <MDEditor
                                        height={500}
                                        value={description}
                                        onChange={(d) => {setDescription(d)}}
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
                                            Đăng tuyển
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


export default connect(mapStateToProps)(AddJobView);

import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
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
import { connect } from "react-redux";
import { saveIdentities } from 'src/redux/actions/auth';
import Loader from 'src/components/Loader';
import axios from 'axios';
import * as CONSTANTS from 'src/constants/login'
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));



function handleErrorMessage(err) {
  console.log(err.response)
  let message = CONSTANTS.status_message_mapping[err.response.status]
  if (message === "") {
    message = err.response.data.detail
  }
  return message
}


function login(dispatch, setLoading, setError, email, password) {
  setLoading(true)
  axios({
    method: "POST",
    url: CONSTANTS.LOGIN_API,
    data: {
      email: email,
      password: password
    }
  })
    .then((response) => {
      dispatch(saveIdentities(response.data))
      setLoading(false)
    })
    .catch((err) => {
      setLoading(false);
      setError(handleErrorMessage(err));
    })
}


const LoginView = ({ authState, dispatch }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const navigate = useNavigate();
  const identities = authState.identities
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [loginRequest, setLoginRequest] = useState(false)
  useEffect(() => {
    if (identities?.logged_on) {
      navigate('/', { replace: true });
    }
  })
  if(!loading && error && loginRequest){
    setLoginRequest(false);
    enqueueSnackbar(error, {variant: 'error'});
  }
  return (
    <Page
      className={classes.root}
      title="Đăng nhập"
    >
      {loading ? <Loader /> : null}
      {console.log(error)}
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Email không hợp lệ').max(255).required('Email không được để trống'),
              password: Yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").max(255).required('Mật khẩu không được để trống')
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(identities.logged_on)
              login(dispatch, setLoading, setError, values.email.trim().toLowerCase(), values.password);
              setLoginRequest(true)
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
                      Đăng nhập
                  </Typography>
                  </Box>
                  <Box
                    mt={3}
                    mb={1}
                  >
                  </Box>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Mật khẩu"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
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
                      Đăng nhập
                  </Button>
                  </Box>
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Bạn chưa có tài khoản?
                  {' '}
                    <Link
                      component={RouterLink}
                      to="/register"
                      variant="h6"
                    >
                      Đăng ký ngay
                  </Link>
                  </Typography>
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


export default connect(mapStateToProps)(LoginView);

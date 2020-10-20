import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, Link} from 'react-router-dom';
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
import { login, loginReset } from 'src/redux/actions/auth';
import Loader from 'src/components/Loader';
import Notification from 'src/components/Notification'
import * as CONSTANTS from 'src/constants/login'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = ({ authState, dispatch }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const identities = authState.identities
  console.log(authState)
  useEffect(() => {
    if(identities?.logged_on){
      navigate('/', { replace: true });
    }else{
      dispatch(loginReset())
    }
  })
  return (
    <Page
      className={classes.root}
      title="Đăng nhập"
    >
      { authState.loginReqesting? <Loader/>: null }
      { authState?.error && authState?.loginDone ? <Notification message={authState?.errorMessage.replace(/^"+|"+$/g, '')} notiType="error"/> : null}
      { !authState?.error && authState?.loginDone ? <Notification message={CONSTANTS.MESSAGES["login_success"]} notiType="success"/> : null}
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
              password: Yup.string().max(255).required('Mật khẩu không được để trống')
            })}
            onSubmit={(values, {setSubmitting}) => {
              setSubmitting(identities.logged_on)
              dispatch(login(values.email.trim().toLowerCase(), values.password));
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

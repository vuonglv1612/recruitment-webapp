import React, {useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Loader from 'src/components/Loader';
import { connect } from "react-redux";
import { signup } from 'src/redux/actions/signup'
import Notification from 'src/components/Notification'
import * as CONSTANTS from 'src/constants/signup'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = ({ signupState, dispatch }) => {
  const [registed, setRegisted] = useState(false)
  const classes = useStyles();
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  return (
    <Page
      className={classes.root}
      title="Đăng ký"
    >
      { signupState.signupRequesting? <Loader/>: null }
      { registed && signupState?.error && signupState?.signupDone ? <Notification message={signupState?.errorMessage.replace(/^"+|"+$/g, '')} notiType="error"/> : null}
      { registed && !signupState?.error && signupState?.signupDone ? <Notification message={CONSTANTS.MESSAGES["registed_success"]} notiType="success"/> : null}
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
              name: '',
              password: '',
              phoneNumber: ''
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Email không hợp lệ. VD: email@domail.com').max(255).required('Email không được để trống'),
                name: Yup.string().max(255),
                phoneNumber: Yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
                password: Yup.string().max(255).required('Mật khẩu không được để trống'),
              })
            }
            onSubmit={(values, {setSubmitting}) => {
              setRegisted(true)
              setSubmitting(signupState.signupRequesting)
              dispatch(signup(values.email, values.password, values.name, values.phoneNumber))
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
                      Đăng ký tài khoản
                  </Typography>
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
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Họ tên"
                    margin="normal"
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    fullWidth
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    label="Số điện thoại"
                    margin="normal"
                    name="phoneNumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phoneNumber}
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
                      Đăng ký
                  </Button>
                  </Box>
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Bạn đã có tài khoản?
                  {' '}
                    <Link
                      component={RouterLink}
                      to="/login"
                      variant="h6"
                    >
                      Đăng nhập ngay
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
      signupState: state.signupState,
  };
}


export default connect(mapStateToProps)(RegisterView);

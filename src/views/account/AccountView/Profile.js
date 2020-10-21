import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  makeStyles,
  Button,
  Container
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  },
  upgradeButton: {
    marginBottom: 15,
    width: "100%"
  },
  userType: {
    padding: 5,
    color: "#FF5722",
    border: "0.5px solid #FF5722",
    borderRadius: "5%"
  }
}));


const user_type_mapping = {
  viewer: "Người mới",
  employer: "Nhà Tuyển Dụng",
  employee: "Người Tìm Việc"
}


const Profile = ({ user, className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.name}
          </Typography>

          {user.user_type !== "viewer" ? <Typography
            className={classes.userType}
            gutterBottom
            variant="h5"
          >{user_type_mapping[user.user_type]}</Typography> : <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
          >
              <Container>
                <Button onClick={() => {navigate("/upgrade/employer", {replace: true})}} className={classes.upgradeButton} variant="outlined" color="primary">Trở thành nhà tuyển dụng</Button>
                <Button onClick={() => {navigate("/upgrade/employee", {replace: true})}} className={classes.upgradeButton} variant="outlined" color="primary">Trở thành người tìm việc</Button>
              </Container>
            </Box>}

        </Box>

      </CardContent>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;

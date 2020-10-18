import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  makeStyles
} from '@material-ui/core';

data = {
    jobs: [
      {
        title: "05 Java Dev (HTML, JavaScript)",
        salary: 1500,
        address: "106 Hoang Quoc Viet, Cau Giay, Ha Noi",
        description: "Tham gia phát triển các ứng dụng trên nền tảng Java cho khách hàng Nhật Bản. Tham gia đầy đủ các công đoạn của dự án từ tìm hiểu yêu cầu, phân tích, thiết kế, lập trình kiểm thử hoặc nghiên cứu công nghệ. Lập kế hoạch thực hiện công việc cá nhân/nhóm",
        is_open: true,
        tags: [
          "JavaScript ",
          "Java"
        ],
        employer_id: 2,
        id: 1
      },
      {
        title: "DevOps Engineer - Attractive Salary ",
        salary: 1000,
        address: "15 Pham Hung, Nam Tu Liem, Ha Noi ",
        description: "Thực hiện các hoạt động liên quan tới Devops (set up CI, CD…) để build và deploy các phiên bản phần mềm lên production và chịu trách nhiệm trong suốt quá trình build, deploy và tìm hiểu và khắc phục sự cố nếu có.",
        is_open: true,
        tags: [
          "Linux",
          "AWS",
          "DevOps"
        ],
        employer_id: 2,
        id: 2
      },
      {
        title: "PHP/ Nodejs Backend Developer ",
        salary: 1000,
        address: "78 nguyễn hoàng, Nam Tu Liem, Ha Noi ",
        description: "Tham gia vào các dự án nước ngoài phần Backend và api. Làm việc theo sự phân công của Trưởng nhóm/Quản lý dự án, phối hợp giữa các nhóm để phát triển sản phẩm. Training các kiến thức mà mình đã làm hoặc đã tìm hiểu cho các thành viên khác trong team khi được yêu cầu.",
        is_open: true,
        tags: [
          "NodeJS",
          "PHP",
          "MySQL"
        ],
        employer_id: 2,
        id: 3
      },
    ],
    total: 3
  }

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const RecruitingJobList = ({ className, ...rest }) => {
  const classes = useStyles();

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
        </Box>
      </CardContent>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default RecruitingJobList;

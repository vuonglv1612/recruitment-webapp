import React from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Typography,
  Divider
} from '@material-ui/core';
import Page from 'src/components/Page';
import JobCard from '../../components/job/JobCard';

const data = {
  jobs: [
    {
      title: "05 Java Dev (HTML, JavaScript)",
      slug: "slug-1",
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
      slug: "slug-2",
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
      title: "PHP/ Nodejs Backend Developer Tham gia vào các dự án nước ngoài phần Backend và api. Làm việc theo sự phân công của Trưởng nhóm/Quản lý Tham gia vào các dự án nước ngoài phần Backend và api. Làm việc theo sự phân công của Trưởng nhóm/Quản lý",
      slug: "slug-3",
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

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.dark,
    minHeight: 500,
    paddingBottom: theme.spacing(3),
    // paddingTop: theme.spacing(3),
  },
  content: {
    backgroundColor: "#FFF",
    borderRadius: "0px 0px 5px 5px",
    padding: theme.spacing(2)
  },
  jobCounter: {
    color: theme.palette.text.secondary,
    textAlign: "left",
    fontWeight: "bold",
    marginBottom: 10
  },
  jobCard: {
    padding: 5,
  }
}));

const Home = () => {
  const classes = useStyles();
  const numOfJobs = 100;
  return (
    <Page
      className={classes.root}
      title="Trang chủ"
    >
      <Container maxWidth="lg" className={classes.content}>
        <Grid
          container
          spacing={3}
          md={12}
        >

          <Grid
            item
            xs={12}
          >
            <Grid
              item
              xs={12}
            >
              <Typography variant="h3" className={classes.jobCounter}>
              <Typography variant="h3" component="span" style={{color: "red", fontWeight: "bold"}}>{numOfJobs}</Typography> việc làm IT tại Việt Nam cho bạn
            </Typography>
            </Grid>
            <Grid
              item
              xs={12}
            >
              {data.jobs.map((data) => {
                return <Grid
                  item
                  xs={12}
                  className={classes.jobCard}
                ><JobCard job={data}/></Grid>
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Home;

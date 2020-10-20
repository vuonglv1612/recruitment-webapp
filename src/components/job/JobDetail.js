import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LinesEllipsis from 'react-lines-ellipsis'
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import { useParams } from "react-router-dom";
import { Container, Grid, CardMedia, Divider } from '@material-ui/core';

const data = {
  jobs: [
    {
      title: "05 Java Dev (HTML, JavaScript)",
      slug: "slug-1",
      salary: 1500,
      address: "106 Hoang Quoc Viet, Cau Giay, Ha Noi",
      description: "# Hello, *world*!\n \
## Tham gia phát triển các ứng dụng trên nền tảng Java cho khách hàng Nhật Bản. \n \
Tham gia đầy đủ các công đoạn của dự án từ tìm hiểu yêu cầu, phân tích, thiết kế, lập trình kiểm thử hoặc nghiên cứu công nghệ. Lập kế hoạch thực hiện công việc cá nhân/nhóm",
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
    minWidth: 275,
    padding: 10
    // borderBottom: "0.5px solid gray",
    // borderTop: "1px solid gray",
    // backgroundColor: theme.palette.background.light
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  titileLink: {
    color: theme.palette.text.secondary
  },
  description: {
    marginTop: 15,
    fontSize: 18
  },
  tag: {
    backgroundColor: theme.palette.text.highlight
  },
  applyButton: {
    color: "#FFF",
    width: "100%",
    backgroundColor: "red"
  },
  applyButtonCaption: {
    color: "#FFFFFF"
  },
  headerBanner: {
    height: "30vh",
    backgroundPosition: "center"
  },
  companyBox: {
    backgroundColor: theme.palette.background.light,
  },
  companyImage: {
    height: 200
  }
}));

export default function JobDetail(props) {
  const classes = useStyles();
  var { slug } = useParams()
  console.log("SLUG:" + slug)
  const job = findJobBySlug(slug)
  return (
    <Container className={classes.root}>
      <Grid
        container
        spacing={3}
      >
        <Grid item xs={12}>
          <CardMedia className={classes.headerBanner} image="/static/images/detaijob_header.jpg" />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}>
        <Grid item
          md={3}>
          <Grid item xs={12}>
            <Card className={classes.companyBox} >
              <CardMedia
                className={classes.companyImage}
                image="/static/images/bigcityboy.jpg"
                title="Company Image"
              />
              <CardContent>
                <Typography gutterBottom variant="h3" component="h2">
                  VCCorp
          </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
          </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item
          md={9}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h3" className={classes.title} color="textSecondary" gutterBottom>📢 {job.title}
              </Typography>

              <Box component="span">
                {
                  job.tags.map((tag) => {
                    return <Chip className={classes.tag} style={{ marginLeft: 5 }} label={tag} />
                  })
                }
              </Box>
              <Typography className={classes.pos} color="textSecondary"><LinesEllipsis text={"🏠 " + job.address} maxLine='1' ellipsis='...' trimRight basedOn='letters' />
              <Typography variant="h5" component="h2">💲 {job.salary}
              </Typography>
              </Typography>
              <Divider />
              <Typography className={classes.description} variant="body2" component="p">
              <ReactMarkdown>{job.description}</ReactMarkdown></Typography>
            </CardContent>
            <CardActions>
              <Button className={classes.applyButton} variant="contained" size="small"><Link className={classes.applyButtonCaption} to={"/jobs/" + job.slug} key={job.slug}>Ứng tuyển</Link></Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

    </Container>

  );
}

function findJobBySlug(slug) {
  return data.jobs.find(job => job.slug === slug);
}

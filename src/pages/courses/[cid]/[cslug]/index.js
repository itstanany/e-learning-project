/**
 * Course Details Page
 */

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import {
  Button,
  CardMedia, Grid, List, ListItem, ListItemIcon, ListItemText, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Link from 'next/link';
import { getAllcourses, getCourse, getLectures } from '../../../../utils/server';
import { useUser } from '../../../../customHooks';
import { Loader } from '../../../../components/Loader';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  lectures: {
    margin: '0px auto',
  },
});

const CourseDetails = ({ course, lectures }) => {
  const classes = useStyles();
  const router = useRouter();
  const { user } = useUser();
  const [subscribed, setSubscribed] = useState(user?.subscription?.includes(course?.id));
  useEffect(() => {
    setSubscribed(user?.subscription?.includes(course?.id));
  }, [user]);

  if (router.isFallback) return (<Loader />);

  return (
    <>
      <Head>
        {/* Page title */}
        <title>
          {
            course?.title
          }
        </title>
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <CardMedia
            component="img"
            alt={course.title}
            // height="140"
            // layout="fill"
            image={course.thumbnail}
            title={course.title}
          />
          {/* <div
          style={{ display: 'block' }}
        >
          <Image
            src={course?.thumbnail}
            layout="responsive"
            objectFit
            width={700}
            height={475}
          />
        </div> */}
        </Grid>
        <Grid item xs={12} md={9}>
          {/* Course Details */}
          <Typography variant="h3" component="h2">
            {
              course.title
            }
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {
              course.author
            }
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {
              course.price
            }
            &nbsp;
            L.E
          </Typography>
          <Typography variant="body2" component="p">
            {
              course?.description
            }
          </Typography>
        </Grid>
        {/* Lectures List */}
        <Grid
          item
          xs={12}
          md={6}
          className={classes.lectures}
        >
          <Typography
            variant="h3"
            component="h6"
          >
            Lectures
          </Typography>
          <List>
            {
              lectures?.map((lect) => (
                <ListItem>
                  <ListItemIcon>
                    <YouTubeIcon />
                  </ListItemIcon>
                  <Grid
                    justify="space-between"
                    container
                    spacing={24}
                  >
                    <Grid item xs={9}>
                      <ListItemText
                        primary={lect?.title}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <ListItemText>
                        <Link
                          href={
                            subscribed
                              ? `/courses/${course.id}/${course.slug}/player?lecture=${lect.id}`
                              : `/courses/${course.id}/${course.slug}/enroll`
                          }
                          passHref
                        >
                          <Button
                            variant="outlined"
                            color="primary"
                          >
                            {
                              subscribed
                                ? 'Watch'
                                : 'Enroll'
                            }
                          </Button>
                        </Link>
                      </ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
              ))
            }
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default CourseDetails;

const getStaticPaths = async () => {
  const courses = await getAllcourses();
  const paths = [];
  courses.forEach((course) => paths.push({ params: { cid: course.id, cslug: course.slug } }));
  return ({
    paths,
    fallback: true,
  });
};

const getStaticProps = async (ctx) => {
  const { params: { cid } } = ctx;
  const course = await getCourse({ id: cid });
  const lectures = await getLectures({ courseId: course?.id });
  return {
    props: {
      course,
      lectures,
    },
  };
};

export {
  getStaticProps,
  getStaticPaths,
};

/**
 * Course Details Page
 */

/**
 * Required
 * add lecture number
 * centering lecture list
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
  lectures: {
    marginTop: '15px',
  },
  btn: {
    // action btn at end of list item and center vertically of title height
    display: 'flex',
    justifyContent: 'flex-end',
    height: '100%',
    alignItems: 'center',
    alignContent: 'center',
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

      {/* Course Info */}
      <Grid container spacing={2}>

        {/* Course Thumbnail */}
        <Grid
          item
          xs={12}
          sm={3}
        >
          <CardMedia
            component="img"
            alt={course.title}
            image={course.thumbnail}
            title={course.title}
          />
        </Grid>

        {/* Course Details */}
        <Grid
          item
          xs={12}
          sm={9}
        >
          {/* Course Details */}
          <Typography
            variant="h3"
            component="h2"
          >
            {
              course.title
            }
          </Typography>

          <Typography
            className={classes.pos}
            color="textSecondary"
            gutterBottom
          >
            {
              course.author
            }
          </Typography>

          <Typography
            className={classes.pos}
            color="textSecondary"
            gutterBottom
          >
            {
              course.price
            }
            &nbsp;
            L.E
          </Typography>

          <Typography
            variant="body2"
            component="p"
          >
            {
              course?.description
            }
          </Typography>
        </Grid>
      </Grid>

      {/* Lectures List */}
      <Grid
        container
        justifyContent="center"
        className={classes.lectures}
      >
        <Grid
          item
          xs={12}
        >
          <Grid
            container
            justifyContent="center"
          >
            <Typography
              variant="h3"
              component="h6"
            >
              Lectures
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={9}
          md={6}
        >
          <List>
            {
              lectures?.map((lect) => (
                // Lecture Info
                <ListItem>
                  <Grid
                    justify="space-between"
                    container
                    wrap="wrap"
                  >
                    <Grid item xs={9}>
                      <Grid
                        container
                        alignItems="center"
                        alignContent="center"
                        justifyContent="flex-start"
                        direction="row"
                        wrap="nowrap"

                      >
                        {/* lecture Icon */}
                        <ListItemIcon>
                          <YouTubeIcon />
                        </ListItemIcon>
                        {/* Lecture title */}
                        <ListItemText
                          primary={`Lecture ${lect?.order} - ${lect?.title}`}
                        />
                      </Grid>

                    </Grid>

                    <Grid
                      item
                      xs={3}
                    >

                      <div
                        className={classes.btn}
                      >
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

                      </div>
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

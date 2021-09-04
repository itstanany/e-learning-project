/**
 * Course Player Page
 */
import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useRouter } from 'next/router';
import { Grid, ListSubheader } from '@material-ui/core';
import {
  courseAccess, protectPage, getCourse, getLectures,
} from '../../../../utils/server';

const useStyles = makeStyles((theme) => ({
  listGrid: {
    order: 1,
    [theme.breakpoints.down('md')]: {
      order: 200,
    },
  },
  listRoot: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: '70vh',
  },
  videoPlayerGrid: {
    order: 2,
    [theme.breakpoints.down('md')]: {
      order: 1,
    },
  },
  iframeContainer: {
    padding: '56.25% 0 0 0',
    position: 'relative',
  },
  iframe: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
  },
  subheaderStyle: {
    color: '#fafafa',
    background: '#0e0e0e',
  },
}));

/**
 * Select a lecture from a list of lectures
 * @param {object} param0 lectures: array of lectures objects, id: id of required lecture
 * @returns lecture object or undefined in no lecture with the supplied id
 */
const selectLecture = ({ lectures, id }) => lectures?.find((lect) => lect?.id === id);

const CoursePlayer = ({ course = {}, lectures = [] }) => {
  const classes = useStyles();
  const router = useRouter();
  const [selectedLecture, setSelectedLecture] = useState(
    selectLecture({ lectures, id: router?.query?.lecture }),
  );

  useEffect(() => {
    /**
     * On Mounting
     * If there is no lecture query parameter, add id of the first lecture
     */
    if (!router?.query?.lecture) {
      router.push(
        {
          pathname: router.pathname,
          query: {
            cid: router.query.cid,
            cslug: router.query?.cslug,
            lecture: lectures[0]?.id,
          },
        },
        undefined,
        { shallow: true },
      );
    }
  }, []);

  const handleListItemClick = useCallback((e, { lectureId }) => {
    /**
     * update the url with selected lecture id
     */
    e.preventDefault();
    router.push(
      {
        pathname: router.pathname,
        query: {
          cid: router?.query?.cid,
          cslug: router?.query?.cslug,
          lecture: lectureId,
        },
      },
      undefined,
      { shallow: true },
    );
  }, []);

  useEffect(() => {
    // update the selectedLecture whenever url changes
    setSelectedLecture(selectLecture({ lectures, id: router?.query?.lecture }));
  }, [router?.query?.lecture, lectures]);

  return (
    <>
      <Head>
        <title>
          {
            selectedLecture?.title
          }
          &nbsp;
          |
          &nbsp;
          {
            course?.title
          }
        </title>
      </Head>
      <Grid container spacing={3}>
        <Grid
          xs={12}
          md={4}
          className={classes.listGrid}
          item
        >
          {/* Lectures List */}
          <div className={classes.listRoot}>
            <List
              component="nav"
              aria-label="Lectures List"
              subheader={
                (
                  <ListSubheader
                    component="div"
                    color="primary"
                    className={classes.subheaderStyle}
                  >
                    {
                      course.title
                    }
                  </ListSubheader>
                )
              }
            >
              {
                lectures?.map((lecture) => (
                  <ListItem
                    button
                    selected={router.query?.lecture === lecture?.id}
                    onClick={(e) => handleListItemClick(e, { lectureId: lecture.id })}
                  >
                    <ListItemIcon>
                      <YouTubeIcon />
                    </ListItemIcon>
                    <ListItemText primary={`Lecture<${lecture.order}> ${lecture?.title}`} />
                  </ListItem>

                ))
              }
            </List>
          </div>
        </Grid>
        {/* Video player */}
        <Grid
          xs={12}
          md={8}
          className={classes.videoPlayerGrid}
          item
        >
          <div className={classes.iframeContainer}>
            <iframe
              src={
                `https://player.vimeo.com/video/${(selectedLecture?.source)
                || (lectures?.[0]?.source)
                }?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;h=f7da4ec7c9`
              }
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={
                ((lectures.find((lect) => lect.id === router.query.lecture))?.title)
                || lectures[0]?.title
              }
              className={classes.iframe}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default CoursePlayer;

const getSSProps = async (ctx) => {
  const course = await getCourse({ id: ctx.params?.cid });
  const lectures = await getLectures({ courseId: ctx.params?.cid });
  return {
    props: {
      course,
      lectures,
    },
  };
};

const getServerSideProps = protectPage(courseAccess(getSSProps));

export {
  getServerSideProps,
};

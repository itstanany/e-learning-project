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
import { CastForEducationOutlined } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { Grid, ListSubheader } from '@material-ui/core';
import { Loader } from '../Loader';
import { fetchLectRes } from '../../utils/client';
import { CourseNotFound } from '../CourseNotFound';
import { NotAuthorized } from './NotAuthorized';
import { ErrorPage } from './Error';

const useStyles = makeStyles((theme) => ({
  listGrid: {
    order: 1,
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
      order: 1,
    },
  },
  iframeContainer: {
    // preserve aspect ratio
    padding: '56.25% 0 0 0',
    position: 'relative',
    width: '100%',
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

const CoursePlayer = ({ course/* : staticBuildCourse */, lectures/* : staticBuildLectures */ }) => {
  const classes = useStyles();
  const router = useRouter();
  const [loadingResource, setLoadingResource] = useState(true);
  const [error, setError] = useState(false);
  const [notAuthorized, setNotAuthorized] = useState(false);
  // console.log('router.query');
  // console.log({ ...router.query })
  // useEffect(() => {
  //   // retry to fetch data if they aren't supplied by static build
  //   if (!(staticBuildCourse && staticBuildLectures)) {
  //     fetchCourse({ id: router?.query?.cid })
  //       .then(({ course: cData, lectures: lData }) => {
  //         setCourse(cData);
  //         setLectures(lData);
  //       })
  //       .catch((err) => {
  //         console.log({ err });
  //       });
  //   }
  // }, [staticBuildCourse, staticBuildLectures]);

  const [selectedLecture, setSelectedLecture] = useState(
    selectLecture({ lectures, id: router?.query?.lecture }),
  );

  useEffect(() => {
    /**
     * On Mounting
     * If there is no lecture query parameter, add id of the first lecture
     */
    // console.log('inside useffect and isFallback is', router.isFallback);
    // console.log({
    //   cid: router.query.cid,
    //   cslug: router.query?.cslug,
    //   lecture: lectures?.[0]?.id,
    //   lectures,
    // });
    if (!router?.query?.lecture && (lectures?.length > 0)) {
      // console.log({
      //   cid: router.query.cid,
      //   cslug: router.query?.cslug,
      //   lecture: lectures?.[0]?.id,
      //   lectures,
      // });
      router.push(
        {
          pathname: router.pathname,
          query: {
            cid: router.query.cid,
            cslug: router.query?.cslug,
            lecture: lectures?.[0]?.id,
          },
        },
        undefined,
        { shallow: true },
      );
    }
  }, [router.query?.cid, router.query?.cslug, lectures]);

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

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    /**
     * update "selected" with lecture object reflecting current "lecture" url parameter
     * fetch resources of current lecture
     */

    if (router?.query?.lecture && lectures) {
      const selected = selectLecture({ lectures, id: router?.query?.lecture });
      if (!selected.res) {
        setLoadingResource(true);
        return fetchLectRes({ cId: router?.query?.cid, lId: selected?.id })
          .then(({ resources: responseResources, error: resError }) => {
            if (resError === 'not authenticated' || resError === 'not authorized') {
              return setNotAuthorized(true);
            }
            // setResources(responseResources);
            selected.res = responseResources;
            return setSelectedLecture(selected);
          })
          .catch(() => setError(true))
          .finally(() => (setLoadingResource(false)));
      }
      return setSelectedLecture(selected);
    }
  }, [router?.query?.lecture, router?.query?.cid, lectures]);


  const renderResource = useCallback(
    // eslint-disable-next-line arrow-body-style
    () => {
      return (
        <>
          {
            notAuthorized
              // false
              ? (
                <NotAuthorized />
              )
              : null
          }
          {
            error
              // false
              ? <ErrorPage />
              : null
          }
          {
            loadingResource
              // true
              ? (

                <Loader />

              )
              : null
          }
          {
            selectedLecture?.res?.length > 0 && !loadingResource
              // false
              ? (
                selectedLecture?.res?.map((res) => {
                  switch (res.type) {
                    case 'video':
                      return (
                        <div className={classes.iframeContainer}>
                          <iframe
                            src={
                              // `https://www.youtube.com/embed/${selectedLecture?.res?.[0].src}`
                              `https://www.youtube.com/embed/${res.src}`
                            }
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            frameBorder="0"
                            allowFullScreen
                            title={
                              selectLecture?.title
                            }
                            className={classes.iframe}
                          />
                        </div>
                      );

                    case 'text':
                      return res.src;

                    default:
                      return null;
                  }
                })
              )
              : null
          }
        </>
      );
    },
    [selectedLecture, notAuthorized, error, loadingResource],
  );

  return (
    // eslint-disable-next-line no-nested-ternary
    (course && lectures)
      ? (
        <>
          <Head>
            <title>
              {
                selectedLecture?.title
                || null
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
                          <CastForEducationOutlined />
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
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                style={{ minHeight: '100%', minWidth: '100%' }}
              >
                {
                  renderResource()
                }
              </Grid>
            </Grid>
          </Grid>
        </>
      )
      : (
        router.isFallback
          ? <Loader />
          : <CourseNotFound />
      )
  );
};

export default CoursePlayer;

export {
  CoursePlayer,
};

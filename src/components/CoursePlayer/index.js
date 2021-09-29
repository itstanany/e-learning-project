/**
 * Course Player Page
 */
import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import { CastForEducationOutlined } from '@material-ui/icons';
import { useRouter } from 'next/router';
import {
  Grid, ListSubheader, ListItem, ListItemIcon, ListItemText,
  List,
} from '@material-ui/core';
import { Loader } from '../Loader';
import {
  fetchLectRes, selectLecture,
} from '../../utils/client';
import { CourseNotFound } from '../CourseNotFound';
import { NotAuthorized } from './NotAuthorized';
import { ErrorPage } from '../ErrorPage';
import { Resource } from './Resource';

// styles
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
  resourcesPlayerGrid: {
    order: 2,
    [theme.breakpoints.down('sm')]: {
      order: 1,
    },
  },
  subheaderStyle: {
    color: '#fafafa',
    background: '#0e0e0e',
  },
}));

const CoursePlayer = ({ course, lectures }) => {
  const classes = useStyles();
  const router = useRouter();
  // boolean, status indicator for loading resources of selected lecture
  const [loadingResource, setLoadingResource] = useState(true);
  // boolean, fetching resources errors
  const [error, setError] = useState(false);
  // boolean, authorization state of current user
  const [notAuthorized, setNotAuthorized] = useState(false);
  // lecture object, currently selected lecture
  const [selectedLecture, setSelectedLecture] = useState(
    selectLecture({ lectures, id: router?.query?.lecture }),
  );

  useEffect(() => {
    /**
     * On Mounting
     * If there is no lecture query parameter, add id of the first lecture
     */
    if (!router?.query?.lecture && (lectures?.length > 0)) {
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

  useEffect(() => {
    /**
     * update "selectedLecture" with lecture object reflecting current "lecture" url parameter
     * fetch resources of current lecture and add it to selectedLecture object
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
            selected.res = responseResources;
            return setSelectedLecture(selected);
          })
          .catch(() => setError(true))
          .finally(() => (setLoadingResource(false)));
      }
      return setSelectedLecture(selected);
    }
  }, [router?.query?.lecture, router?.query?.cid, lectures]);

  /**
   * Render resource part with the actual resource or informative message about user status
   */
  const renderResource = useCallback(
    () => (
      <>
        {
          // user not authorized to see lecture content
          notAuthorized
            ? (
              <NotAuthorized />
            )
            : null
        }
        {
          // error happened
          error
            ? <ErrorPage />
            : null
        }
        {
          loadingResource
            ? <Loader />
            : null
        }
        {
          // lecture with one or more resource
          selectedLecture?.res?.length > 0 && !loadingResource
            ? (
              <Resource
                lecture={selectedLecture}
              />
            )
            : null
        }
      </>
    ),
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
                      // escape lectures with no title
                      lecture?.title
                        ? (
                          <ListItem
                            button
                            selected={router.query?.lecture === lecture?.id}
                            onClick={(e) => handleListItemClick(e, { lectureId: lecture.id })}
                            key={lecture?.id}
                          >
                            <ListItemIcon>
                              <CastForEducationOutlined />
                            </ListItemIcon>
                            <ListItemText primary={`Lecture<${lecture.order}> ${lecture?.title}`} />
                          </ListItem>
                        )
                        : null
                    ))
                  }
                </List>
              </div>
            </Grid>
            {/* Resource area */}
            <Grid
              xs={12}
              md={8}
              className={classes.resourcesPlayerGrid}
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

/**
 * Edit course form
 * presentational component
 */
import {
  memo, useCallback, useEffect, useState,
} from 'react';
import { Avatar, Grid, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { fetchCourse, getLectures } from '../../../utils/client';
import { FullPageLoader } from '../../Loader';
import { ErrorPage } from '../../ErrorPage';
import { BasicCourseForm } from '../BasicCourseForm';

/**
 * Fetch data for client side render
 * @param {object} param0 "cId" => course Id
 * @returns {course, lectures}: course => course object from database,
 *    "lectures" => array of lectures with resources
 */
const fetchData = async ({ cId } = {}) => {
  // optimize d, fetch course and lectures in parallel
  const data = await Promise.all([
    fetchCourse({ id: cId, lectures: false }),
    getLectures({ cId, resources: true }),
  ]);
  const { course } = data[0];
  const lecturesWithResources = data[1];
  return {
    course,
    lectures: lecturesWithResources,
  };
};

function CourseEditForm({ cId }) {
  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState(null);
  const [state, setState] = useState('loading');

  useEffect(() => {
    setState('loading');
    if (!(cId === null || cId === undefined)) {
      return fetchData({ cId })
        .then(({
          course: resCourse,
          lectures: resLectures,
        }) => {
          setCourse(resCourse);
          setLectures(resLectures);
          setState('ready');
        })
        .catch(() => setState('error'));
    }
    return null;
  }, [cId]);

  const renderContent = useCallback(() => {
    switch (state) {
      case 'ready':
        return (
          <>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
            >
              <Grid
                item
              >
                <Avatar style={{ margin: '0 auto' }}>
                  <EditIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Edit Course
                </Typography>
              </Grid>
            </Grid>
            <BasicCourseForm
              initialCourse={course}
              initialLectures={lectures}
            />
          </>
        );
      case 'loading':
        return <FullPageLoader />;
      case 'error':
        return <ErrorPage />;
      default:
        return null;
    }
  }, [state, course, lectures]);

  return (
    renderContent()
  );
}

const memoized = memo(CourseEditForm);

export default memoized;

export {
  memoized as CourseEditForm,
};

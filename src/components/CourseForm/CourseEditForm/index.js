import {
  memo, useCallback, useEffect, useState,
} from 'react';
import { fetchCourse, getLectures } from '../../../utils/client';
import { FullPageLoader } from '../../Loader';
import { ErrorPage } from '../../ErrorPage';
import { LecturesForm } from '../LecturesForm';
import { BasicCourseForm } from '../BasicCourseForm';

const fetchData = async ({ cId } = {}) => {
  // optimize try to fetch course and lectures in parallel
  const { course } = await fetchCourse({ id: cId, lectures: false });
  const lecturesWithResources = await getLectures({ cId, resources: true });
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
      fetchData({ cId })
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
  }, [cId]);

  const renderContent = useCallback(() => {
    switch (state) {
      case 'ready':
        return (
          <BasicCourseForm
            initialCourse={course}
            initialLectures={lectures}
          />
        );
      case 'loading':
        return <FullPageLoader />;
      case 'error':
        return <ErrorPage />;
      default:
        return null;
    }
  }, [state, lectures]);

  return (
    renderContent()
  );
}

const memoized = memo(CourseEditForm);

export default memoized;

export {
  memoized as CourseEditForm,
};

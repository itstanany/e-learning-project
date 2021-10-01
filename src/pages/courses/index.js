/*
  * Render all courses in a responsive page.
  * Render mode: Incremental static Generation. Page is revalidated after 5 seconds of visit
*/

import Head from 'next/head';
import {
  useMemo,
} from 'react';
import { getAllcourses } from '../../utils/server';
import { useUser } from '../../customHooks';
import { CourseLibrary } from '../../components/CourseLibrary';
import { coursesPropTypes } from '../../utils/client/propTypes';

function AllCourses({ courses: initialCourses }) {
  const {
    user,
  } = useUser();

  const courses = useMemo(() => {
    /**
     * Update course object to add a boolean "subscribed" prop
     * @returns [objects], array of course objects, see prop-types for object shape
     */
    if (initialCourses?.length && user?.subscription?.length > 0) {
      const coursesWithSubscription = initialCourses?.map((crse) => {
        const crseWithSubscription = {
          ...crse,
          subscribed: user?.subscription?.includes(crse?.id),
        };
        return crseWithSubscription;
      });
      return coursesWithSubscription;
    }
    return initialCourses;
  }, [user, initialCourses]);

  return (
    <>
      <Head>
        <title>
          All Courses
        </title>
      </Head>
      {/* Courses Library */}
      <CourseLibrary courses={courses} />
    </>
  );
}

AllCourses.defaultProps = {
  courses: [],
};

AllCourses.propTypes = {
  courses: coursesPropTypes,
};

export default AllCourses;

export const getStaticProps = async () => {
  // get array of all courses
  const courses = await getAllcourses();
  return {
    props: {
      courses: courses || [],
    },
    revalidate: 5,
  };
};

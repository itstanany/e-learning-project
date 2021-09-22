/**
 * To Do:
 * Implement pagination
 */
/**
 * User dashboard page
 * render cards of user subscribed courses
 */
import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import {
  /* Grid, */ Link,
} from '@material-ui/core';
import {
 /*  getAllcourses, getUserDoc, */ protectPage,
} from '../../utils/server';
import {
  apiPost,
} from '../../utils/client';
// import { CourseCard } from '../../components/CourseCard/Index';
import CourseLibrary from '../../components/CourseLibrary';
import { Loader } from '../../components/Loader';
// import { useUser } from '../../customHooks';

const fetchUserCourses = () => (apiPost({ url: 'user/courses' }));

const Dashboard = ({ /* courses = [], user = {} */ }) => {
  // const { user } = useUser();

  const [courses, setCourses] = useState([]);
  const [state, setState] = useState('loading');
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);

  useEffect(() => (fetchUserCourses()
    .then(({ courses: resCourses }) => {
      const coursesWithSubscription = resCourses
        ?.map((crse) => ({ ...crse, subscribed: true }));
      setCourses(coursesWithSubscription);
      setState('fetched');
    })
    .catch(() => setState('error'))
  ), []);

  const renderContent = useCallback(() => {
    switch (state) {
      case 'loading':
        return <Loader />;
      case 'error':
        return <h1>Something went wrong, please try again</h1>;
      case 'fetched':
        return (
          courses?.length > 0
            ? (
              <CourseLibrary
                courses={courses}
              />
            )
            : (
              <>
                <h1>
                  You are not enrolled in any course yet.
                </h1>
                <h3>
                  Click
                  &nbsp;
                  <Link href='/courses'>
                    <a>
                      HERE
                    </a>
                  </Link>
                  &nbsp;
                  to see Courses Catalog
                </h3>
              </>
            )
        );
      default:
        return null;
    }
  }, [courses, state]);

  return (
    <>
      <Head>
        <title>
          Dashboard
        </title>
      </Head>
      {
        renderContent()
      }
    </>
  );
};

// const getSSProps = async (ctx, { userCookie }) => {
//   const courses = await getAllcourses({ uid: userCookie?.uid });
//   const userDoc = await getUserDoc({ uid: userCookie?.uid });
//   console.log({ userDoc });
//   console.log({ userCookie });
//   return {
//     props: {
//       courses,
//       user: userDoc,
//     },
//   };
// };
const getSSProps = () => ({ props: {} });

export const getServerSideProps = protectPage(getSSProps);

export default Dashboard;

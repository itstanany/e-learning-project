/**
 * To Do:
 * Implement pagination
 */
/**
 * User dashboard page
 * render cards of user subscribed courses
 */
import React from 'react';
import Head from 'next/head';
import {
  Grid, Link,
} from '@material-ui/core';
import {
  getAllcourses, getUserDoc, protectPage,
} from '../../utils/server';
import { CourseCard } from '../../components/CourseCard/Index';

const Dashboard = ({ courses = [], user = {} }) => (
  <>
    <Head>
      <title>
        Dashboard
      </title>
    </Head>
    {
      courses?.length < 1
        ? (
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
        : (
          <Grid container xs={12} spacing={3} alignContent="center">
            {/* Courses cards */}
            {
              courses.map((course) => (
                <CourseCard course={course} key={course?.id} user={user} />
              ))
            }
          </Grid>
        )
    }

  </>
);

const getSSProps = async (ctx, { userCookie }) => {
  const courses = await getAllcourses({ uid: userCookie?.uid });
  const userDoc = await getUserDoc({ uid: userCookie?.uid });
  return {
    props: {
      courses,
      user: userDoc,
    },
  };
};

export const getServerSideProps = protectPage(getSSProps);

export default Dashboard;

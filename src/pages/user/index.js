import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import { protectPage } from '../../utils/clientServer/protectPage';
import { getAllcourses } from '../../utils/server';
import { CourseCard } from '../../components/CourseCard/Index';

const Dashboard = ({ courses = [] }) => (
  <Grid container xs={12} spacing={3} alignContent="center">
    {
      courses.map((course) => (
        <CourseCard course={course} key={course.id} />
      ))
    }
  </Grid>

);

const getSSProps = async (ctx, { userCookie }) => {
  const courses = await getAllcourses({ uid: userCookie?.uid });
  return {
    props: {
      courses,
    },
  };
};

export const getServerSideProps = protectPage(getSSProps);

export default Dashboard;

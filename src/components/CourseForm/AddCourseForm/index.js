/**
 * Add Course Form
 */

/**
 * TO DO
 * Form validation
 */

/* eslint-disable react/destructuring-assignment */
import {
  useCallback, useMemo, useRef, useState,
} from 'react';
import Head from 'next/head';
// styles
import { makeStyles } from '@material-ui/core/styles';
// icons
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
// components
import {
  CircularProgress, Snackbar, Container, Typography, Grid, TextField,
  Button, Avatar,
} from '@material-ui/core';
import { Alert } from '../../Alert';
import { InputText, InputNumber } from '../../Input';
import { apiPost, lecturePlaceholder } from '../../../utils/client';
import { LecturesForm } from '../LecturesForm';
import CourseInfoForm from '../CourseInfoForm';
import { BasicCourseForm } from '../BasicCourseForm';
import { useUser } from '../../../customHooks';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: '3em',
    font: '2em',
  },
  lecture: {
    borderStyle: 'solid',
    borderRadius: '10px',
    borderColor: '#e0e0e0',
    margin: '5px 0px',
    padding: '5px',
  },
  formControl: {
    width: '100%',
  },
}));

const lectures = [{
  ...lecturePlaceholder,
}];

const AddCourseForm = () => {
  const { user } = useUser();

  const course = useMemo(() => ({
    title: '',
    description: '',
    price: '',
    author: user?.name,
  }), [user]);

  return (
    <BasicCourseForm
      initialCourse={course}
      initialLectures={lectures}
      initialAfterSubmission
    />
  );
};
export default AddCourseForm;

export {
  AddCourseForm,
};

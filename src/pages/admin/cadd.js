/**
 * Add Course Form
 */

/**
 * TO DO
 * Form validation
 */

/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useRef, useState } from 'react';
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
import { Alert } from '../../components/Alert';
import { InputText, InputNumber } from '../../components/Input';
// helper utilities
import {
  getUserDoc, adminEditorAccess, protectPage, getAllAuthors,
} from '../../utils/server';
import { apiPost } from '../../utils/client';

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
}));

const initialLectureState = [{
  title: '',
  source: '',
  description: '',
  order: 1,
}];

const AddCourse = (props) => {
  const classes = useStyles();
  const initialCourseState = useRef({
    title: '',
    author: props?.userDoc?.name,
    description: '',
    price: '',
  });
  // value of file input
  const [thumbnail, setThumbnail] = useState(null);
  // snackbar toast message state
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    severity: '',
  });
  const [courseInfo, setCourseInfo] = useState(initialCourseState.current);
  const lectureOrder = useRef(1);
  const [lectures, setLectures] = useState(initialLectureState);
  // loading during submitting
  const [isLoading, setIsLoading] = useState(false);

  const handlerInpChange = useCallback((e, { index, value: unformattedValue } = {}) => {
    /**
   * Handle input change
   * @param e => input change html event
   * @param index => number, index of changed lecture in lectures array
   * @param value: unformattedValue => value either string or number value
   */
    const { target: { value, name } } = e;
    if (index === undefined) {
      if (name === 'thumbnail') return setThumbnail(e.target.files[0]);
      return setCourseInfo((prevState) => ({ ...prevState, [name]: unformattedValue || value }));
    }
    return setLectures((prevState) => {
      const newState = [...prevState];
      newState[index] = {
        ...newState[index],
        [name]: unformattedValue || value,
      };
      return newState;
    });
  }, []);

  const handlerAddNewLect = useCallback(() => {
    /**
     * Add New lecture entry form
     */
    lectureOrder.current += 1;
    setLectures((prevState) => ([...prevState, {
      ...(initialLectureState[0]),
      order: lectureOrder.current,
    }]));
  }, [lectureOrder]);

  const handleSubmit = useCallback(async (e) => {
    /**
     * Submit course to the back-end
     * @param "e" => submit html event
     */
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.set('courseInfo', JSON.stringify(courseInfo));
    formData.append('lectures', JSON.stringify(lectures));
    formData.append('thumbnail', thumbnail);
    const result = await apiPost({ route: '/admin/addcourse', body: formData });
    if (result.added) {
      setSnackbarState({ open: true, message: 'Addedd Successfully', severity: 'success' });
      setCourseInfo(initialCourseState.current);
      lectureOrder.current = 1;
      setLectures(initialLectureState);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setSnackbarState({ open: true, message: 'Failed to Added. Try again', severity: 'error' });
  }, [courseInfo, lectures, thumbnail]);

  const handlerSnackbarClose = useCallback(() => {
    /**
     * Control visibility of Snackbar toast
     */
    setSnackbarState((prevState) => ({ ...prevState, open: false }));
  }, []);
  return (
    <>
      <Head>
        <title>
          Dashboard
        </title>
      </Head>
      <Container component="main" maxWidth="lg">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AddToQueueIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            New Course
          </Typography>
          <form className={classes.form} noValidate name="addCourseForm">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {/* Course Title */}
                <InputText
                  tag={TextField}
                  autoComplete="courseTitle"
                  name="title"
                  variant="outlined"
                  required
                  fullWidth
                  id="title"
                  label="Course Title"
                  autoFocus
                  value={courseInfo.title}
                  someThing={courseInfo.title}
                  onChange={handlerInpChange}
                  key="title"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* Course Thumbnail */}
                <TextField
                  tag={TextField}
                  variant="outlined"
                  required
                  fullWidth
                  type="file"
                  id="thumbnail"
                  key="thumbnail"
                  label="Course Thumbnail"
                  name="thumbnail"
                  autoComplete="thumbnail"
                  onChange={handlerInpChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              {/* Course Description */}
              <Grid item xs={12}>
                <InputText
                  tag={TextField}
                  variant="outlined"
                  multiline
                  minRows={3}
                  required
                  fullWidth
                  id="description"
                  key="description"
                  label="Course Description"
                  name="description"
                  autoComplete="description"
                  value={courseInfo.description}
                  onChange={handlerInpChange}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                {/* Course Author */}
                <TextField
                  id="author"
                  key="author"
                  select
                  fullWidth
                  label="Course Author"
                  value={courseInfo.author}
                  SelectProps={{
                    native: true,
                  }}
                  variant="outlined"
                  name="author"
                  onChange={handlerInpChange}
                  disabled={props.userDoc.role !== 'admin'}
                >
                  {
                    props?.allAuthors
                    && props.allAuthors.map((option) => (
                      <option key={option.value} value={option.uid}>
                        {option.name}
                      </option>
                    ))
                  }
                </TextField>
              </Grid>
              <Grid item xs={12} md={3}>
                {/* Course Price */}
                <InputNumber
                  tag={TextField}
                  variant="outlined"
                  type="number"
                  required
                  fullWidth
                  id="price"
                  label="Course Price"
                  name="price"
                  autoComplete="number"
                  value={courseInfo.price}
                  onChange={handlerInpChange}
                  key="coursePrice"
                />
              </Grid>
              <Grid xs={12}>
                <Typography
                  component="h6"
                  variant="h6"
                >
                  Lectures
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {
                  lectures.map((lecture, index) => (
                    <Grid key={lecture.order} container spacing={2} className={classes.lecture}>
                      {/* Lecture Entry Subform */}
                      <Grid item xs={12} sm={6}>
                        {/* Lecture Title */}
                        <InputText
                          tag={TextField}
                          variant="outlined"
                          required
                          fullWidth
                          id="title"
                          key="lectureTitle"
                          label="Lecture Title"
                          name="title"
                          autoComplete="title"
                          value={lecture.title}
                          onChange={handlerInpChange}
                          index={index}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {/* Lecture source */}
                        <InputNumber
                          tag={TextField}
                          type="number"
                          variant="outlined"
                          required
                          fullWidth
                          id="source"
                          key="source"
                          label="Lecture ID"
                          name="source"
                          autoComplete="lectureSource"
                          value={lecture.source}
                          onChange={handlerInpChange}
                          index={index}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {/* Lecture description */}
                        <InputText
                          tag={TextField}
                          variant="outlined"
                          required
                          fullWidth
                          multiline
                          minRows={3}
                          id="description"
                          key="description"
                          label="Lecture Description"
                          name="description"
                          autoComplete="description"
                          value={lecture.description}
                          onChange={handlerInpChange}
                          index={index}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {/* Lecture Order */}
                        <InputNumber
                          tag={TextField}
                          variant="outlined"
                          required
                          fullWidth
                          type="number"
                          disabled
                          id="lectureOrder"
                          key="lectureOrder"
                          label="Lecture Order"
                          name="lectureOrder"
                          autoComplete="lectureOrder"
                          value={lecture.order}
                        />
                      </Grid>
                    </Grid>
                  ))
                }

              </Grid>
            </Grid>
            <Grid container spacing={2} direction="column" justifyContent="flex-end">
              <Grid item xs={8} md={3}>
                {/* Add new Lecture subform entry */}
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handlerAddNewLect}
                  disabled={isLoading}
                >
                  Add New Lecture
                </Button>
              </Grid>
              <Grid item xs={8} md={3}>
                {/* Submit button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  Submit
                  &nbsp;
                  {
                    isLoading
                    && <CircularProgress size="2em" />
                  }
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        {/* Toast message */}
        <Snackbar
          autoHideDuration={6000}
          open={snackbarState.open}
          onClose={handlerSnackbarClose}
        >
          <Alert
            severity={snackbarState.severity}
            onClose={handlerSnackbarClose}
          >
            {
              snackbarState.message
            }
          </Alert>
        </Snackbar>
      </Container>
    </>
    //     )
  );
};

/**
 * Get current "user" document and list of all users
 * @param {*} ctx NextJS context object of "req" and "res" object fields
 * @returns object of property "props" of object type with fields: .....
 */
const getSSProps = async (ctx, { userCookie }) => {
  const userDoc = await getUserDoc({ uid: userCookie.uid });
  const allAuthors = await getAllAuthors();
  return {
    props: {
      userDoc,
      allAuthors,
    },
  };
};

export const getServerSideProps = protectPage(adminEditorAccess(getSSProps));

export default AddCourse;

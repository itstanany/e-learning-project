/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useRef, useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';

import { Snackbar } from '@material-ui/core';
import { getAllAuthors } from '../api/user/allauthors';
import { adminEditorAccess } from '../../utils/clientServer/adminEditorAccess';
import { getUserDoc } from '../api/user/userdoc';
import { protectPage } from '../../utils/clientServer/protectPage';
import { apiPost } from '../../utils/client';
import { Alert } from '../../components/Alert';

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
  },
  lecture: {
    borderStyle: 'solid',
    borderRadius: '10px',
    margin: '5px',
    paddingTop: '10px',
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
    author: props?.userDoc?.uid,
    description: '',
    price: 0,
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    severity: '',
  });
  const [courseInfo, setCourseInfo] = useState(initialCourseState.current);
  const lectureOrder = useRef(1);
  const [lectures, setLectures] = useState(initialLectureState);

  const handlerInpChange = useCallback((e, index) => {
    const { target: { value, name } } = e;
    if (index === undefined) {
      if (name === 'thumbnail') return setThumbnail(e.target.files[0]);
      return setCourseInfo((prevState) => ({ ...prevState, [name]: value }));
    }
    return setLectures((prevState) => {
      const newState = [...prevState];
      newState[index] = {
        ...newState[index],
        [name]: value,
      };
      return newState;
    });
  }, []);

  const handlerAddNewLect = useCallback((e) => {
    e.preventDefault();
    lectureOrder.current += 1;
    setLectures((prevState) => ([...prevState, {
      ...(initialLectureState[0]),
      order: lectureOrder.current,
    }]));
  }, [lectureOrder]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
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
      return;
    }
    setSnackbarState({ open: true, message: 'Failed to Added. Try again', severity: 'error' });
  }, [courseInfo, lectures, thumbnail]);

  const handlerSnackbarClose = useCallback((e) => {
    e.preventDefault();
    setSnackbarState((prevState) => ({ ...prevState, open: false }));
  }, []);

  return (
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
              <TextField
                autoComplete="courseTitle"
                name="title"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Course Title"
                autoFocus
                value={courseInfo.title}
                onChange={handlerInpChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="file"
                id="thumbnail"
                label="Course Thumbnail"
                name="thumbnail"
                autoComplete="thumbnail"
                onChange={handlerInpChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                multiline
                minRows={3}
                required
                fullWidth
                id="description"
                label="Course Description"
                name="description"
                autoComplete="description"
                value={courseInfo.description}
                onChange={handlerInpChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="author"
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
              <TextField
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
                min={0}
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
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="title"
                        label="Lecture Title"
                        name="title"
                        autoComplete="title"
                        value={lecture.title}
                        onChange={(e) => handlerInpChange(e, index)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="source"
                        label="Lecture Source"
                        name="source"
                        autoComplete="lectureSource"
                        value={lecture.source}
                        onChange={(e) => handlerInpChange(e, index)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        multiline
                        minRows={3}
                        id="description"
                        label="Lecture Description"
                        name="description"
                        autoComplete="description"
                        value={lecture.description}
                        onChange={(e) => handlerInpChange(e, index)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        type="number"
                        disabled
                        id="lectureOrder"
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
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handlerAddNewLect}
              >
                Add New Lecture
              </Button>
            </Grid>
            <Grid item xs={8} md={3}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                // className={classes.submit}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Snackbar
        autoHideDuration={6000}
        open={snackbarState.open}
        onClose={handlerSnackbarClose}
      // message={snackbarMessage}
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

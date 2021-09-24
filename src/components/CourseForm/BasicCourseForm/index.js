/**
 * Add Course Form
 */

/**
 * TO DO
 * Form validation
 */

/* eslint-disable react/destructuring-assignment */
import {
  useCallback, useEffect, useMemo, useRef, useState,
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
import { apiPost, getAllAuthors, lecturePlaceholder, resources } from '../../../utils/client';
import { LecturesForm } from '../LecturesForm';
import { CourseInfoForm } from '../CourseInfoForm';
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

const BasicCourseForm = ({
  initialCourse,
  initialLectures,
  initialAfterSubmission = false,
  // allAuthors,
}) => {
  const classes = useStyles();
  // const initialCourseState = useMemo(() => ({
  //   title: '',
  //   author: userDoc?.name,
  //   description: '',
  //   price: '',
  // }), [userDoc]);
  const { user } = useUser();
  const [allAuthors, setAllAuthors] = useState([{
    name: user?.name,
    uid: user?.uid,
    role: user?.role,
  }]);
  useEffect(() => {
    if (user?.role === 'admin') {
      return getAllAuthors()
        .then((resAllAuthors) => {
          console.log('inside then of getall aithors and resAllAuthors is');
          console.log({ allAuthors });
          setAllAuthors(resAllAuthors);
        });
    }
    return setAllAuthors([{
      name: user?.name,
      uid: user?.uid,
      role: user?.role,
    }]);
  }, [user]);
  // value of file input
  const [thumbnail, setThumbnail] = useState(null);
  // snackbar toast message state
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    severity: '',
  });
  const [courseInfo, setCourseInfo] = useState(initialCourse);
  const lectureOrder = useRef(initialLectures?.[initialLectures.length - 1]?.order || 1);
  const [lectures, setLectures] = useState(initialLectures);
  // form submission state, "loading, error, ready"
  const [isLoading, setIsLoading] = useState(false);

  const handlerInpChange = useCallback((e, { index, value: unformattedValue, resIndex } = {}) => {
    /**
   * Handle input change
   * @param e => input change html event
   * @param index => number, index of changed lecture in lectures array
   * @param value: unformattedValue => value either string or number value
   * @param resIndex: number, index of resource object
   */
    const { target: { value: eValue, name } } = e;
    const value = unformattedValue !== undefined ? unformattedValue : eValue;
    // input is a course info property
    if (index === undefined) {
      if (name === 'thumbnail') return setThumbnail(e.target.files[0]);
      return setCourseInfo((prevState) => ({ ...prevState, [name]: value }));
    }
    // input is a resource entry of a specific lecture
    if (resIndex !== undefined) {
      return setLectures((prevSt) => {
        const newState = [...prevSt];
        const newLect = {
          ...newState[index],
          resources: [...newState[index].resources],
        };
        newLect.resources[resIndex] = {
          ...newLect.resources[resIndex],
          [name]: value,
        };
        newState[index] = newLect;
        return newState;
      });
    }
    // update a lecture info prop
    return setLectures((prevState) => {
      const newState = [...prevState];
      newState[index] = {
        ...newState[index],
        [name]: value,
      };
      return newState;
    });
  }, []);

  const handlerAddNewLect = useCallback(() => {
    /**
     * Add New lecture entry form
     */
    lectureOrder.current += 1;
    setLectures((prevState) => ([
      ...prevState, {
        ...(lecturePlaceholder),
        order: lectureOrder.current,
      }]));
  }, [lectureOrder]);

  const handlerAddNewRes = useCallback((e, { index } = {}) => (
    setLectures((prevSt) => {
      const newState = [...prevSt];
      // newState[index].resources.push(initialResource);
      newState[index].resources = [
        ...newState[index].resources,
        {
          ...resources,
        }];
      return newState;
    })
  ), []);

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
    try {
      const result = await apiPost({ url: 'admin/courses/submit', body: formData });
      if (result.added) {
        setSnackbarState({ open: true, message: 'Added Successfully', severity: 'success' });

        if (initialAfterSubmission) {
          setCourseInfo(initialCourse);
          lectureOrder.current = initialLectures?.at[-1]?.order || 1;
          setLectures(initialLectures);
        }
        return;
      }
      setSnackbarState({ open: true, message: 'Failed to Added. Try again', severity: 'error' });
    } catch (error) {
      console.error({ error });
      setSnackbarState({ open: true, message: 'Failed to Added. Try again', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  }, [courseInfo, lectures, thumbnail, initialAfterSubmission, initialLectures, initialCourse]);

  const handlerSnackbarClose = useCallback(() => {
    /**
     * Control visibility of Snackbar toast
     */
    setSnackbarState((prevState) => ({ ...prevState, open: false }));
  }, []);

  const handlerDeleteThumbnail = useCallback(() => {
    setCourseInfo((prevState) => {
      const newCourseInfo = {
        ...prevState,
      };
      delete newCourseInfo.thumbnail;
      return newCourseInfo;
    })
  }, []);

  useEffect(() => {
    // update course info switch latest parent picture
    setCourseInfo(initialCourse);
  }, [initialCourse]);
  return (
    <>
      <Head>
        <title>
          Add Course
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

              {/* Course Basic Info */}
              <Grid
                item
                xs={12}
              >
                <CourseInfoForm
                  title={courseInfo?.title}
                  description={courseInfo?.description}
                  price={courseInfo?.price}
                  author={courseInfo?.author}
                  // eslint-disable-next-line jsx-a11y/aria-role
                  role={user?.role}
                  allAuthors={allAuthors}
                  handlerInpChange={handlerInpChange}
                  thumbnail={courseInfo?.thumbnail}
                  onDeleteThumbnail={handlerDeleteThumbnail}
                />
              </Grid>

              {/* Lectures */}
              <Grid
                item
                xs={12}
              >
                <LecturesForm
                  lectures={lectures}
                  handlerAddNewRes={handlerAddNewRes}
                  handlerInpChange={handlerInpChange}
                  handlerAddNewLect={handlerAddNewLect}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} direction="column" justifyContent="flex-end">

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
  );
};

export default BasicCourseForm;

export {
  BasicCourseForm,
};

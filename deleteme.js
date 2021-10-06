<Card className={classes.root} key={course.id}>
  <Link
    href={
      user?.subscription?.includes(course?.id)
        ? `/courses/${course.id}/${course.slug}/player`
        : `/courses/${course.id}/${course.slug}/enroll`
    }
  >
    <CardActionArea>
      <CardMedia
        // className={classes.mediaStyle}
        component="img"
        alt={course.title}
        height="140"
        width="140"
        // layout="fill"
        image={course.thumbnail}
        title={course.title}
      />
      <CardContent>
        {/* Course title */}
        <Typography gutterBottom variant="h5" component="h2">
          {
            course.title
          }
        </Typography>
        {/* Course Author */}
        <Typography
          display="block"
          variant="body2"
          color="textSecondary"
          noWrap
          gutterBottom
        >
          {
            course.author
          }
        </Typography>
        {/* Course description */}
        <Typography
          display="block"
          variant="body2"
          color="textSecondary"
          noWrap
        >
          {
            course.description
          }
          {/* <div className={`${styles.text} ${styles.ellipsis}`}>
                    <span className={`${styles['text-concat']}`}>
                      {
                        course.description
                      }
                    </span>
                  </div> */}
          {/* <p className={classes.maxLines}>
                    {
                      course.description
                    }
                  </p> */}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Link>
  <CardActions>
    <Link
      href={`/courses/${course.id}/${course.slug}`}
      passHref
    >
      <Button
        size="small"
        color="primary"
      >
        Details
      </Button>
    </Link>
    <Link
      href={
        user?.subscription?.includes(course?.id)
          ? `/courses/${course.id}/${course.slug}/player`
          : `/courses/${course.id}/${course.slug}/enroll`
      }
      passHref
    >
      <Button size="small" color="primary">
        {
          user?.subscription?.includes(course?.id)
            ? 'Watch'
            : 'Enroll'
        }
      </Button>
    </Link>
  </CardActions>
</Card>



// <Card className={classes.root} key={course.id}>
//   <CardActionArea>
//     <CardMedia
//       component="img"
//       alt={course.title}
//       // height="140"
//       // layout="fill"
//       image={course.thumbnail}
//       title={course.title}
//     />
//     <CardContent>
//       {/* Course title */}
//       <Typography gutterBottom variant="h5" component="h2">
//         {
//           course.title
//         }
//       </Typography>
//       {/* Course Author */}
//       <Typography
//         display="block"
//         variant="body2"
//         color="textSecondary"
//         noWrap
//         gutterBottom
//       >
//         {
//           course.author
//         }
//       </Typography>
//       {/* Course description */}
//       <Typography
//         display="block"
//         variant="body2"
//         color="textSecondary"
//         noWrap
//       >
//         {
//           course.description
//         }
//         {/* <div className={`${styles.text} ${styles.ellipsis}`}>
//           <span className={`${styles['text-concat']}`}>
//             {
//               course.description
//             }
//           </span>
//         </div> */}
//         {/* <p className={classes.maxLines}>
//           {
//             course.description
//           }
//         </p> */}
//       </Typography>
//     </CardContent>
//   </CardActionArea>
//   <CardActions>
//     <Link
//       href={`/c/${course.id}/${course.slug}`}
//       passHref
//     >
//       <Button
//         size="small"
//         color="primary"
//       >
//         Details
//       </Button>
//     </Link>
//     <Link
//       href={`/cp/${course.id}`}
//       passHref
//     >
//       <Button size="small" color="primary">
//         Watch
//       </Button>
//     </Link>
//   </CardActions>
// </Card>



// import React from 'react';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
// import Link from '@material-ui/core/Link';
// import { protectPage } from '../utils/clientServer/protectPage';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>
//       {' '}
//       {new Date().getFullYear()}
//       .
//     </Typography>
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     minHeight: '100vh',
//   },
//   main: {
//     marginTop: theme.spacing(8),
//     marginBottom: theme.spacing(2),
//   },
//   footer: {
//     padding: theme.spacing(3, 2),
//     marginTop: 'auto',
//     backgroundColor:
//       theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
//   },
// }));

// export default function Layout(/* props */) {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <Container component="main" className={classes.main} maxWidth="sm">
//         <Typography variant="h2" component="h1" gutterBottom>
//           Sticky footer
//         </Typography>
//         <Typography variant="h5" component="h2" gutterBottom>
//           Pin a footer to the bottom of the viewport.
//           The footer will move as the main element of the page grows.
//           {/* {
//             props.children
//           } */}

//         </Typography>
//         <Typography variant="body1">Sticky footer placeholder.</Typography>
//       </Container>
//       <footer className={classes.footer}>
//         <Container maxWidth="sm">
//           <Typography variant="body1">My sticky footer can be found here.</Typography>
//           <Copyright />
//         </Container>
//       </footer>
//     </div>
//   );
// }








{/* <div className={`${styles.text} ${styles.ellipsis}`}>
            <span className={`${styles['text-concat']}`}>
              {
                course.description
              }
            </span>
          </div> */}
{/* <p className={classes.maxLines}>
            {
              course.description
            }
          </p> */}


// `https://player.vimeo.com/video/${(selectedLecture?.source)
// || (lectures?.[0]?.source)
// }?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;h=f7da4ec7c9`






{
  // eslint-disable-next-line no-nested-ternary
  loadingResource
    ? <Loader />
    : error
      ? <h1>Something wen wrong, please try again</h1>
      : (
        <div className={classes.iframeContainer}>
          <iframe
            src={
              `https://www.youtube.com/embed/${selectLecture?.res?.[0].src}`
            }
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
            allowFullScreen
            // title={
            //   ((lectures.find((lect) => lect.id === router.query.lecture))?.title)
            //   || lectures[0]?.title
            // }
            title={
              selectLecture?.title
            }
            className={classes.iframe}
          />
        </div>
      )
}
</Grid >



  // import React, { useCallback, useEffect, useState } from 'react';
  // import Head from 'next/head';
  // import { makeStyles } from '@material-ui/core/styles';
  // import List from '@material-ui/core/List';
  // import ListItem from '@material-ui/core/ListItem';
  // import ListItemIcon from '@material-ui/core/ListItemIcon';
  // import ListItemText from '@material-ui/core/ListItemText';
  // import YouTubeIcon from '@material-ui/icons/YouTube';
  // import { useRouter } from 'next/router';
  // import { Grid, ListSubheader } from '@material-ui/core';


  // // import { apiPost } from '../../../../utils/server/apiPost'
  // import { Loader } from '../../../../components/Loader';
  // import { apiPost } from '../../../../utils/client';
  // import { CourseNotFound } from '../../../../components/CourseNotFound';

  // const fetchLectRes = ({ cId, lId }) => (apiPost({ url: 'courses/course/lectures/lecture/res', body: { lId, cId } }));

  // const useStyles = makeStyles((theme) => ({
  //   listGrid: {
  //     order: 1,
  //     [theme.breakpoints.down('md')]: {
  //       order: 200,
  //     },
  //   },
  //   listRoot: {
  //     width: '100%',
  //     backgroundColor: theme.palette.background.paper,
  //     position: 'relative',
  //     overflow: 'auto',
  //     maxHeight: '70vh',
  //   },
  //   videoPlayerGrid: {
  //     order: 2,
  //     [theme.breakpoints.down('md')]: {
  //       order: 1,
  //     },
  //   },
  //   iframeContainer: {
  //     padding: '56.25% 0 0 0',
  //     position: 'relative',
  //   },
  //   iframe: {
  //     position: 'absolute',
  //     top: '0',
  //     left: '0',
  //     width: '100%',
  //     height: '100%',
  //   },
  //   subheaderStyle: {
  //     color: '#fafafa',
  //     background: '#0e0e0e',
  //   },
  // }));

  // /**
  //  * Select a lecture from a list of lectures
  //  * @param {object} param0 lectures: array of lectures objects, id: id of required lecture
  //  * @returns lecture object or undefined in no lecture with the supplied id
  //  */
  // const selectLecture = ({ lectures, id }) => lectures?.find((lect) => lect?.id === id);

  // const CoursePlayer = ({ course/* : staticBuildCourse */, lectures/* : staticBuildLectures */ }) => {
  //   const classes = useStyles();
  //   const router = useRouter();
  //   const [loadingResource, setLoadingResource] = useState(true);
  //   // const [course, setCourse] = useState(staticBuildCourse);
  //   // const [lectures, setLectures] = useState(staticBuildLectures);
  //   const [resources, setResources] = useState(null);
  //   const [error, setError] = useState(false);
  //   const [notAuthorized, setNotAuthorized] = useState(false);
  //   const [notAuthenticated, setNotAuthenticated] = useState(false);
  //   console.log('router.query');
  //   console.log({ ...router.query })
  //   // useEffect(() => {
  //   //   // retry to fetch data if they aren't supplied by static build
  //   //   if (!(staticBuildCourse && staticBuildLectures)) {
  //   //     fetchCourse({ id: router?.query?.cid })
  //   //       .then(({ course: cData, lectures: lData }) => {
  //   //         setCourse(cData);
  //   //         setLectures(lData);
  //   //       })
  //   //       .catch((err) => {
  //   //         console.log({ err });
  //   //       });
  //   //   }
  //   // }, [staticBuildCourse, staticBuildLectures]);

  //   const [selectedLecture, setSelectedLecture] = useState(
  //     selectLecture({ lectures, id: router?.query?.lecture }),
  //   );

  //   useEffect(() => {
  //     /**
  //      * On Mounting
  //      * If there is no lecture query parameter, add id of the first lecture
  //      */
  //     // console.log('inside useffect and isFallback is', router.isFallback);
  //     // console.log({
  //     //   cid: router.query.cid,
  //     //   cslug: router.query?.cslug,
  //     //   lecture: lectures?.[0]?.id,
  //     //   lectures,
  //     // });
  //     if (!router?.query?.lecture && (lectures?.length > 0)) {
  //       // console.log({
  //       //   cid: router.query.cid,
  //       //   cslug: router.query?.cslug,
  //       //   lecture: lectures?.[0]?.id,
  //       //   lectures,
  //       // });
  //       router.push(
  //         {
  //           pathname: router.pathname,
  //           query: {
  //             cid: router.query.cid,
  //             cslug: router.query?.cslug,
  //             lecture: lectures?.[0]?.id,
  //           },
  //         },
  //         undefined,
  //         { shallow: true },
  //       );
  //     }
  //   }, [router.query?.cid, router.query?.cslug, lectures]);

  //   const handleListItemClick = useCallback((e, { lectureId }) => {
  //     /**
  //      * update the url with selected lecture id
  //      */
  //     e.preventDefault();
  //     router.push(
  //       {
  //         pathname: router.pathname,
  //         query: {
  //           cid: router?.query?.cid,
  //           cslug: router?.query?.cslug,
  //           lecture: lectureId,
  //         },
  //       },
  //       undefined,
  //       { shallow: true },
  //     );
  //   }, []);

  //   // eslint-disable-next-line consistent-return
  //   useEffect(() => {
  //     /**
  //      * update "selected" with lecture object reflecting current "lecture" url parameter
  //      * fetch resources of current lecture
  //      */

  //     if (router?.query?.lecture && lectures) {
  //       const selected = selectLecture({ lectures, id: router?.query?.lecture });
  //       if (!selected.res) {
  //         setLoadingResource(true);
  //         return fetchLectRes({ cId: router?.query?.cid, lId: selected?.id })
  //           .then(({ resources: responseResources, error: resError }) => {
  //             if (resError === 'not authenticated' || resError === 'not authorized') {
  //               return setNotAuthorized(true);
  //             }
  //             setResources(responseResources);
  //             selected.res = responseResources;
  //             return setSelectedLecture(selected);
  //           })
  //           .catch(() => setError(true))
  //           .finally(() => (setLoadingResource(false)));
  //       }
  //       return setSelectedLecture(selected);
  //     }
  //   }, [router?.query?.lecture, router?.query?.cid, lectures]);

  //   // if (router.isFallback) {
  //   //   console.log('fallback');
  //   //   console.log('router.query');
  //   //   console.log({ ...router.query });
  //   //   return <Loader />;
  //   // } else {
  //   //   console.log('out of fallback');
  //   // }

  //   const renderResource = useCallback(
  //     // eslint-disable-next-line arrow-body-style
  //     () => {
  //       console.log({ selectedLecture });
  //       return (
  //         <>
  //           {
  //             notAuthorized
  //               ? (
  //                 <h1>You are not authorized</h1>
  //               )
  //               : null
  //           }
  //           {
  //             error
  //               ? <h1>Something went wrong, please try again</h1>
  //               : null
  //           }
  //           {
  //             loadingResource
  //               ? <Loader />
  //               : null
  //           }
  //           {
  //             selectedLecture?.res?.length > 0
  //               ? (
  //                 <div className={classes.iframeContainer}>
  //                   <iframe
  //                     src={
  //                       `https://www.youtube.com/embed/${selectedLecture?.res?.[0].src}`
  //                     }
  //                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //                     frameBorder="0"
  //                     allowFullScreen
  //                     // title={
  //                     //   ((lectures.find((lect) => lect.id === router.query.lecture))?.title)
  //                     //   || lectures[0]?.title
  //                     // }
  //                     title={
  //                       selectLecture?.title
  //                     }
  //                     className={classes.iframe}
  //                   />
  //                 </div>
  //               )
  //               : null
  //           }
  //         </>
  //       );
  //     },
  //     [selectedLecture, notAuthorized, error, loadingResource],
  //   );

  //   return (
  //     // eslint-disable-next-line no-nested-ternary
  //     (course && lectures)
  //       ? (
  //         <>
  //           <Head>
  //             <title>
  //               {
  //                 selectedLecture?.title
  //                 || null
  //               }
  //               &nbsp;
  //               |
  //               &nbsp;
  //               {
  //                 course?.title
  //               }
  //             </title>
  //           </Head>
  //           <Grid container spacing={3}>
  //             <Grid
  //               xs={12}
  //               md={4}
  //               className={classes.listGrid}
  //               item
  //             >
  //               {/* Lectures List */}
  //               <div className={classes.listRoot}>
  //                 <List
  //                   component="nav"
  //                   aria-label="Lectures List"
  //                   subheader={
  //                     (
  //                       <ListSubheader
  //                         component="div"
  //                         color="primary"
  //                         className={classes.subheaderStyle}
  //                       >
  //                         {
  //                           course.title
  //                         }
  //                       </ListSubheader>
  //                     )
  //                   }
  //                 >
  //                   {
  //                     lectures?.map((lecture) => (
  //                       <ListItem
  //                         button
  //                         selected={router.query?.lecture === lecture?.id}
  //                         onClick={(e) => handleListItemClick(e, { lectureId: lecture.id })}
  //                       >
  //                         <ListItemIcon>
  //                           <YouTubeIcon />
  //                         </ListItemIcon>
  //                         <ListItemText primary={`Lecture<${lecture.order}> ${lecture?.title}`} />
  //                       </ListItem>

  //                     ))
  //                   }
  //                 </List>
  //               </div>
  //             </Grid>
  //             {/* Video player */}
  //             <Grid
  //               xs={12}
  //               md={8}
  //               className={classes.videoPlayerGrid}
  //               item
  //             >
  //               {
  //                 renderResource()
  //               }
  //             </Grid>
  //           </Grid>
  //         </>
  //       )
  //       : (
  //         router.isFallback
  //           ? <Loader />
  //           : <CourseNotFound />
  //       )
  //   );
  // };





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
    // <Grid container xs={12} spacing={3} alignContent="center">
    //   {/* Courses cards */}
    //   {
    //     courses.map((course) => (
    //       <CourseCard course={course} key={course?.id} user={user} />
    //     ))
    //   }
    // </Grid>
    <CourseLibrary
      courses={courses}
    />
  )

      </>
      );



/*
PropTypes.shape({
author: PropTypes.string.isRequired,
description: PropTypes.string,
id: PropTypes.string,
price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
slug: PropTypes.string.isRequired,
thumbnail: PropTypes.string,
title: PropTypes.string.isRequired,
})
*/


{
  lectures.map((lecture, index) => (
    <Grid key={lecture.order} container spacing={2} className={classes.lecture}>
      {/* Lecture Entry Sub-form */}

      {/* Lecture Title */}
      <Grid item xs={12} sm={6}>
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
          onChangeProps={
            {
              index,
            }
          }
        // index={index}
        />
      </Grid>

      {/* Lecture Order */}
      <Grid item xs={12} sm={6}>
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
      {/* Lecture description */}
      <Grid item xs={12} sm={6}>
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
          onChangeProps={
            {
              index,
            }
          }
        // index={index}
        />
      </Grid>

      {/* Lecture resources */}
      <Grid item xs={12} sm={6}>
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
        >
          {
            lecture.resources?.map((res, resIdx) => (
              <>
                <Grid
                  item
                  xs={6}
                >
                  <InputText
                    tag={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    id="source"
                    key="source"
                    label="Lecture Resource"
                    name="src"
                    autoComplete="lectureSource"
                    value={res?.src}
                    onChange={handlerInpChange}
                    onChangeProps={
                      {
                        index,
                        resIndex: resIdx,
                      }
                    }
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                >
                  <FormControl
                    className={classes.formControl}
                  >
                    <InputLabel id="resourceTypeLabel">Resource Type</InputLabel>
                    <Select
                      labelId="resourceTypeLabel"
                      id="resourceTypeInput"
                      value={res?.type}
                      name="type"
                      onChange={(e) => (
                        handlerInpChange(e, { index, resIndex: resIdx })
                      )}
                    >
                      {
                        SourceMenuItems
                      }
                    </Select>
                  </FormControl>
                </Grid>
              </>
            ))
          }
          <Grid
            item
            xs={12}
          >
            <Button
              onClick={(e) => handlerAddNewRes(e, { index })}
              variant="contained"
              color="primary"
              fullWidth
            >
              Add New Resource
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ))
}




const AddCourse = (props) => {
  const classes = useStyles();
  const initialCourseState = useMemo(() => ({
    title: '',
    author: props?.userDoc?.name,
    description: '',
    price: '',
  }), [props.userDoc]);
  // const initialCourseState = useRef({
  //   title: '',
  //   author: props?.userDoc?.name,
  //   description: '',
  //   price: '',
  // });
  // useEffect(() => {
  //   initialCourseState.current = {
  //     ...initialCourseState.current,
  //     author: props?.userDoc?.name,
  //   }
  // }, [props.userDoc, initialCourseState]);
  // value of file input
  const [thumbnail, setThumbnail] = useState(null);
  // snackbar toast message state
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    severity: '',
  });
  const [courseInfo, setCourseInfo] = useState(initialCourseState);
  const lectureOrder = useRef(1);
  const [lectures, setLectures] = useState(initialLectureState);
  // loading during submitting
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
    setLectures((prevState) => ([...prevState, {
      ...(initialLectureState[0]),
      order: lectureOrder.current,
    }]));
  }, [lectureOrder]);

  const handlerAddNewRes = useCallback((e, { index } = {}) => (
    setLectures((prevSt) => {
      const newState = [...prevSt];
      // newState[index].resources.push(initialResource);
      newState[index].resources = [...newState[index].resources, initialResource];
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
      const result = await apiPost({ url: 'admin/courses/add', body: formData });
      if (result.added) {
        setSnackbarState({ open: true, message: 'Addedd Successfully', severity: 'success' });
        setCourseInfo(initialCourseState);
        lectureOrder.current = 1;
        setLectures(initialLectureState);
        // setIsLoading(false);
        return;
      }
      setSnackbarState({ open: true, message: 'Failed to Added. Try again', severity: 'error' });
    } catch (error) {
      console.error({ error });
      setSnackbarState({ open: true, message: 'Failed to Added. Try again', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  }, [courseInfo, lectures, thumbnail, initialCourseState]);

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
              {/* Course Title */}
              <Grid item xs={12} sm={6}>
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
              {/* Course Thumbnail */}
              <Grid item xs={12} sm={6}>
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
              {/* Course Author */}
              <Grid item xs={12} md={3}>
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
              {/* Course Price */}
              <Grid item xs={12} md={3}>
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

              {/* Lectures */}
              <Grid xs={12}>
                <Typography
                  component="h6"
                  variant="h6"
                >
                  Lectures
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <LecturesForm
                  lectures={lectures}
                  handlerAddNewRes={handlerAddNewRes}
                  handlerInpChange={handlerInpChange}
                />
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


<Grid
  item
  xs={12}
>
  <Typography
    component="h6"
    variant="h6"
  >
    Lectures
  </Typography>
</Grid>

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



const [state, setState] = useState(false);
useEffect(() => {
  console.log('inside useeffect of touter change');
  cId.current = router?.query?.cid;
}, [router?.query?.cid]);


<button
  onClick={() => setState((prevState) => !prevState)}
>
  onClick
</button>

import { useEffect, useRef, useState } from 'react';



{/* Course Title */ }
<Grid item xs={12} sm={6}>
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
{/* Course Thumbnail */ }
<Grid item xs={12} sm={6}>
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
{/* Course Description */ }
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
{/* Course Author */ }
<Grid item xs={12} md={3}>
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
    disabled={userDoc?.role !== 'admin'}
  >
    {
      allAuthors?.map((option) => (
        <option key={option.value} value={option.uid}>
          {option.name}
        </option>
      ))
    }
  </TextField>
</Grid>
{/* Course Price */ }
<Grid item xs={12} md={3}>
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


























const classes = useStyles();
const initialCourseState = useMemo(() => ({
  title: '',
  author: userDoc?.name,
  description: '',
  price: '',
}), [userDoc]);
// const initialCourseState = useRef({
//   title: '',
//   author: props?.userDoc?.name,
//   description: '',
//   price: '',
// });
// useEffect(() => {
//   initialCourseState.current = {
//     ...initialCourseState.current,
//     author: props?.userDoc?.name,
//   }
// }, [props.userDoc, initialCourseState]);
// value of file input
const [thumbnail, setThumbnail] = useState(null);
// snackbar toast message state
const [snackbarState, setSnackbarState] = useState({
  open: false,
  message: '',
  severity: '',
});
const [courseInfo, setCourseInfo] = useState(initialCourseState);
const lectureOrder = useRef(1);
const [lectures, setLectures] = useState(initialLectureState);
// loading during submitting
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
  setLectures((prevState) => ([...prevState, {
    ...(initialLectureState[0]),
    order: lectureOrder.current,
  }]));
}, [lectureOrder]);

const handlerAddNewRes = useCallback((e, { index } = {}) => (
  setLectures((prevSt) => {
    const newState = [...prevSt];
    // newState[index].resources.push(initialResource);
    newState[index].resources = [...newState[index].resources, initialResource];
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
    const result = await apiPost({ url: 'admin/courses/add', body: formData });
    if (result.added) {
      setSnackbarState({ open: true, message: 'Addedd Successfully', severity: 'success' });
      setCourseInfo(initialCourseState);
      lectureOrder.current = 1;
      setLectures(initialLectureState);
      // setIsLoading(false);
      return;
    }
    setSnackbarState({ open: true, message: 'Failed to Added. Try again', severity: 'error' });
  } catch (error) {
    console.error({ error });
    setSnackbarState({ open: true, message: 'Failed to Added. Try again', severity: 'error' });
  } finally {
    setIsLoading(false);
  }
}, [courseInfo, lectures, thumbnail, initialCourseState]);

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
                role={userDoc?.role}
                allAuthors={allAuthors}
                handlerInpChange={handlerInpChange}
                thumbnail={courseInfo?.thumbnail}
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




<Avatar className={classes.avatar}>
          <AddToQueueIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          New Course
        </Typography>

{/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}





{/* {
          leftLinks !== undefined
            ? brandComponent
            : null
        } */}
{/* <div className={classes.flex}>
          {
            leftLinks !== undefined
              ? (
                <Hidden smDown implementation="css">
                  {
                    leftLinks
                  }
                </Hidden>
              )
              : (
                brandComponent
              )
          }
        </div> */}



const headerColorChange = () => {
  const { color, changeColorOnScroll } = props;
  const windowsScrollTop = window.pageYOffset;
  if (windowsScrollTop > changeColorOnScroll.height) {
    console.log('inside scroll top');
    document.body
      .getElementsByTagName('header')[0]
      .classList.remove(classes[color]);
    document.body
      .getElementsByTagName('header')[0]
      .classList.add(classes[changeColorOnScroll.color]);
  } else {
    console.log('color', color);
    document.body
      .getElementsByTagName('header')[0]
      .classList.add(classes[color]);
    document.body
      .getElementsByTagName('header')[0]
      .classList.remove(classes[changeColorOnScroll.color]);
  }
};

const {
  // color = 'dark', /*  rightLinks, */ leftLinks, brand, fixed, absolute,
  color = 'dark',
  links,
  brand,

} = props;

React.useEffect(() => {
  if (props.changeColorOnScroll) {
    window.addEventListener('scroll', headerColorChange);
  }
  return function cleanup() {
    if (props.changeColorOnScroll) {
      window.removeEventListener('scroll', headerColorChange);
    }
  };
});

/* Custom Dropdown */

/**

        <CustomDropdown
          noLiPadding
          buttonText="Components"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={Apps}
          dropdownList={[
            // <Link to="/" className={classes.dropdownLink}>
            //   All components
            // </Link>,
            <Link href="/" className={classes.dropdownLink}>
              <a
                className={classes.dropdownLink}
              >
                All components
              </a>
            </Link>,
            <a
              href="https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar"
              target="_blank"
              className={classes.dropdownLink}
            >
              Documentation
            </a>,
          ]}
        />

 */

/* social icons
<ListItem className={classes.listItem}>
  <Tooltip title="Delete">
    <IconButton aria-label="Delete">
      <DeleteIcon />
    </IconButton>
  </Tooltip>
  <Tooltip
    id="instagram-twitter"
    title="Follow us on twitter"
    placement={typeof window !== 'undefined' && window.innerWidth > 959 ? "top" : "left"}
    classes={{ tooltip: classes.tooltip }}
  >
    <Button
      href="https://twitter.com/CreativeTim?ref=creativetim"
      target="_blank"
      color="danger"
      className={classes.navLink}
      buttonIcon={Twitter}
    >
      Twitter
       <i className={classes.socialIcons + " fab fa-twitter"} />
    </Button>
  </Tooltip >
</ListItem >
<ListItem className={classes.listItem}>
  <Tooltip
    id="instagram-facebook"
    title="Follow us on facebook"
    placement={typeof window !== 'undefined' && window.innerWidth > 959 ? "top" : "left"}
    classes={{ tooltip: classes.tooltip }}
  >
    <Button
      color="transparent"
      href="https://www.facebook.com/CreativeTim?ref=creativetim"
      target="_blank"
      className={classes.navLink}
    >
      <i className={classes.socialIcons + " fab fa-facebook"} />
    </Button>
  </Tooltip>
</ListItem>
<ListItem className={classes.listItem}>
  <Tooltip
    id="instagram-tooltip"
    title="Follow us on instagram"
    placement={typeof window !== 'undefined' && window.innerWidth > 959 ? "top" : "left"}
    classes={{ tooltip: classes.tooltip }}
  >
    <Button
      color="transparent"
      href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
      target="_blank"
      className={classes.navLink}
    >
      <i className={classes.socialIcons + " fab fa-instagram"} />
    </Button>
  </Tooltip>
</ListItem>
*/



<ul className={classes.list}>
  {
    footerLinks?.map((lnk) => (
      <li>
        <Link
          href={lnk.path}
        >
          <a>
            {
              lnk.name
            }
          </a>
        </Link>
      </li>
    ))
  }

</ul>



// useEffect(() => {
//   /**
//    * update "selectedLecture" with lecture object reflecting current "lecture" url parameter
//    * fetch resources of current lecture and add it to selectedLecture object
//    */

//   if (router?.query?.lecture && lectures) {
//     let selected = selectLecture({ lectures, id: router?.query?.lecture });
//     if (!selected.res) {
//       setLoadingResource(true);
//       return fetchLectRes({ cId: router?.query?.cid, lId: selected?.id })
//         .then(({ resources: responseResources, error: resError }) => {
//           if (resError === 'not authenticated' || resError === 'not authorized') {
//             return setNotAuthorized(true);
//           }
//           selected = {
//             ...selected,
//             res: responseResources,
//           };
//           // selected.res = responseResources;
//           console.log({ selected })
//           return setSelectedLecture(selected);
//         })
//         .catch(() => setError(true))
//         .finally(() => (setLoadingResource(false)));
//     }
//     return setSelectedLecture(selected);

//   }
// }, [router?.query?.lecture, router?.query?.cid, lectures]);


{/* {
          authFailed
          && <AuthFailed />
        }
        {
          isError
          && (
            <AuthError />
          )
        }
        {
          isLoading
          && <FullPageLoader />
        }
        {
          user
            ? <AuthRedirect />
            : (
              <AuthComponent
                handleLogin={handleLogin}
              />
            )
        } */}

// useEffect(() => (isLoading && setState(STATE_CONSTANTS.LOADING)), [isLoading]);

// const handleLogin = useCallback(async (e) => {
//   e.preventDefault();
//   const result = await loginWithGoogle();
//   if (result.auth) {
//     setAuthFailed(false);
//     redirectAuthenticated();
//   } else {
//     setAuthFailed(true);
//   }
// }, [redirectAuthenticated]);

// useEffect(() => {
//   if (user?.name) {
//     redirectAuthenticated();
//   }
// }, [redirectAuthenticated, user]);

// if (isLoading) return <FullPageLoader />;

// if (!user) {

const [authFailed, setAuthFailed] = useState(false);

// useEffect(() => (isError && setState(STATE_CONSTANTS.ERROR)), [isError]);



(
  <>
    {
      // user not authorized to see lecture content
      notAuthorized
        ? (
          <NotAuthorized />
        )
        : null
    }
    {
      // error happened
      error
        ? <ErrorPage />
        : null
    }
    {
      loadingResource
        ? <Loader />
        : null
    }
    {
      // lecture with one or more resource
      selectedLecture?.res?.length > 0 && !loadingResource
        ? (
          <Resource
            resources={selectedLecture.res}
          />
        )
        : null
    }
  </>
)

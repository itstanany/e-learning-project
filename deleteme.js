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



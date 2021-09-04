import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardActionArea, CardMedia, Typography, CardContent, Button,
  CardActions,
} from '@material-ui/core';
import { useUser } from '../../customHooks';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '5px',
  },
  mediaStyle: {
    display: 'block',
    maxWidth: '270px',
    maxHeight: '180px',
    width: '100%',
    height: 'auto',
  },
});

function CourseCard({ course, user }) {
  const [subscribed, setSubscribed] = useState(user?.subscription?.includes(course?.id));
  useEffect(() => {
    setSubscribed(user?.subscription?.includes(course?.id))
  }, [user, course]);
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   const getUser = async () => {
  //     const result = await fetch('/api/user/userdoc').then((res) => res.json());
  //     setUser(result?.userDoc);
  //   };
  //   getUser();
  // }, []);
  // const { user } = useUser();
  const classes = useStyles();
  console.log('DASHBOARD');
  console.log({ user });
  return (
    <Card className={classes.root}>
      <Link
        href={
          // user?.subscription?.includes(course?.id)
          subscribed
            ? `/courses/${course.id}/${course.slug}/player`
            : `/courses/${course.id}/${course.slug}/enroll`
        }
      >
        <CardActionArea>
          <CardMedia
            component="img"
            alt={course.title}
            height="140"
            width="140"
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
            // user?.subscription?.includes(course?.id)
            subscribed
              ? `/courses/${course.id}/${course.slug}/player`
              : `/courses/${course.id}/${course.slug}/enroll`
          }
          passHref
        >
          <Button size="small" color="primary">
            {
              user?.subscription?.includes(course?.id)
                ? 'Watch'
                : `Enroll (${course.price}) L.E`
            }
          </Button>
        </Link>
      </CardActions>
    </Card>

  );
}

export default CourseCard;

export {
  CourseCard,
};

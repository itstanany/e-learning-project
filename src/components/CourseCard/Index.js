import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardActionArea, CardMedia, Typography, CardContent, Button,
  CardActions,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    // make all cards the same height of tallest card of the row and fill width of container
    width: '100%',
    height: '100%',
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'space-between',
  },
  mediaStyle: {
    display: 'block',
    maxWidth: '270px',
    maxHeight: '180px',
    width: '100%',
    height: 'auto',
  },
  cardActionArea: {
    flexGrow: 3,
  },
  cardMedia: {
    objectFit: 'fill',
  },
});

function CourseCard({ course, user }) {
  const [subscribed, setSubscribed] = useState(user?.subscription?.includes(course?.id));
  useEffect(() => {
    setSubscribed(user?.subscription?.includes(course?.id));
  }, [user, course]);
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Link
        href={
          subscribed
            ? `/courses/${course.id}/${course.slug}/player`
            : `/courses/${course.id}/${course.slug}/enroll`
        }
      >
        <CardActionArea className={classes.cardActionArea}>
          <CardMedia
            component="img"
            alt={course.title}
            height="140"
            width="140"
            image={course.thumbnail}
            title={course.title}
            objectFit="fit"
            className={classes.cardMedia}
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
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      {/* Card controller */}
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

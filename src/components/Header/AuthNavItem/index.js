import React, { useCallback } from 'react';
// next components
import Link from 'next/link';

// material ui core components
import { ListItem, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useRouter } from 'next/router';
import { auth } from '../../../firebase/client';

import { headerLinksStyle } from '../style/headerLinksStyle';

const useStyles = makeStyles(headerLinksStyle);

const AuthNavItem = ({ user, handleDrawerToggle }) => {
  const classes = useStyles();
  const router = useRouter();

  const logoutHandler = useCallback(async (e) => {
    auth.signOut();
    fetch('/api/logout');
    handleDrawerToggle(e);
    router.push('/courses');
  }, [handleDrawerToggle, router]);
  return (
    <>
      <ListItem className={classes.listItem}>
        {
          user
            ? (
              <Button
                color="transparent"
                className={classes.navLink}
                onClick={logoutHandler}
              >
                <ExitToAppIcon className={classes.icons} />
                Logout Dr. (
                {
                  user.displayName
                }
                )
              </Button>
            )
            : (
              <Link href="/auth" passHref>
                <Button
                  color="transparent"
                  className={classes.navLink}
                  onClick={handleDrawerToggle}
                >
                  <LockOpenIcon className={classes.icons} />
                  Login
                </Button>
              </Link>
            )
        }
      </ListItem>

    </>
  );
};

export default AuthNavItem;

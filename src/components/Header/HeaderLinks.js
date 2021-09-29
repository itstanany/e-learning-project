/*eslint-disable*/
import React, { useCallback, useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
// import { Link } from "react-router-dom";
import Link from "next/link";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import {
  School, Twitter, Dashboard,
} from "@material-ui/icons";
import YouTubeIcon from '@material-ui/icons/YouTube';
// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import Button from "../CustomButtons/Button.js";

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";
import { auth } from '../../firebase/client';
import AuthNavItem from './AuthNavItem/index.js';

const useStyles = makeStyles(styles);

const HeaderLinks = ({ handleDrawerToggle }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    return () => unsubscribeFromAuth();
  }, []);
  const classes = useStyles();
  return (
    <List className={classes.list}>
      {/* All courses page */}
      <ListItem className={classes.listItem}>
        <Link href="/courses" passHref>
          <Button
            color="transparent"
            className={classes.navLink}
            onClick={handleDrawerToggle}
          >
            <School className={classes.icons} />
            All Courses
          </Button>
        </Link>
      </ListItem>
      {/* Dashboard */}
      <ListItem className={classes.listItem}>
        <Link
          href="/user"
          passHref
        >
          <Button
            color="transparent"
            className={classes.navLink}
            onClick={handleDrawerToggle}
          >
            <Dashboard className={classes.icons} />
            Dashboard
          </Button>
        </Link>
      </ListItem>
      {/* YouTube channel */}
      <ListItem className={classes.listItem}>
        <Button
          href="https://www.youtube.com/c/%D9%82%D9%86%D8%A7%D8%A9%D8%A7%D9%84%D8%AF%D9%83%D8%AA%D9%88%D8%B1%D9%84%D9%84%D9%85%D9%88%D8%A7%D8%AF%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9/playlists"
          color="transparent"
          target="_blank"
          className={classes.navLink}
          onClick={handleDrawerToggle}
        >
          <YouTubeIcon className={classes.icons} />
          Watch on YT
        </Button>
      </ListItem>
      <AuthNavItem handleDrawerToggle={handleDrawerToggle} user={user} />
    </List >
  );
}

export default HeaderLinks;

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

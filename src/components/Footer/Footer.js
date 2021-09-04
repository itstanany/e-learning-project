/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "../../assets/jss/material-kit-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  return (
    < div className={classes.container} >
      <div className={classes.left}>
        <List className={classes.list}>
          <ListItem className={classes.inlineBlock}>
            <a
              href="https://github.com/ahmdGeek/e-learning"
              className={classes.block}
              target="_blank"
            >
              Source Code
            </a>
          </ListItem>
          <ListItem className={classes.inlineBlock}>
            <a
              href="#"
              className={classes.block}
              target="_blank"
            >
              About us
            </a>
          </ListItem>
          <ListItem className={classes.inlineBlock}>
            <a
              href="#"
              className={classes.block}
              target="_blank"
            >
              Blog
            </a>
          </ListItem>
          <ListItem className={classes.inlineBlock}>
            <a
              href="#"
              className={classes.block}
              target="_blank"
            >
              Licenses
            </a>
          </ListItem>
          <ListItem className={classes.inlineBlock}>
            <a
              href="/admin/cadd"
              className={classes.block}
            >
              Admin
            </a>
          </ListItem>
        </List>
      </div>

      <div className={classes.right}>
        &copy;
        {
          1900 + new Date().getYear()
        }
        ,
        made with
        &nbsp;
        <Favorite className={classes.icon} />
        &nbsp;
        by
        <a
          href="https://www.linkedin.com/in/ahmdgeek/"
          className={aClasses}
          target="_blank"
        >
          &nbsp;
          ahmdGeek
        </a>{" "}
        for a better web.
      </div>
    </div >
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};

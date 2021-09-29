// todo fix the distribution effect of opening and closing select menu in add course form

/* eslint-disable react/require-default-props */
import React/* , { useEffect, useState }  */ from 'react';
import Link from 'next/link';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
// @material-ui/icons
import Menu from '@material-ui/icons/Menu';
// core components
import styles from '../../assets/jss/material-kit-react/components/headerStyle.js';
import HeaderLinks from './HeaderLinks.js';

const useStyles = makeStyles(styles);

const Header = (props) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMobileOpen((currentMobileOpen) => !currentMobileOpen);
  };
  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName('header')[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName('header')[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName('header')[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName('header')[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  };
  const {
    color = 'dark', /*  rightLinks, */ leftLinks, brand, fixed, absolute,
  } = props;
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
  });
  // const brandComponent = <Button className={classes.title}>{brand}</Button>;
  // const brandComponent = <Link href="/" passHref><a className={classes.title}>{brand}</a></Link>;
  const brandComponent = (
    <Link
      href="/"
      passHref
    >
      <Button
        className={classes.title}
      >
        {
          brand
        }
      </Button>
    </Link>
  );
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
  return (
    <AppBar className={appBarClasses}>
      {/*
        * This tool bar renders in order:
        * Brand Component
        * Left links component (mdUp)
        * Right links from (mdUp)
        * Menu icon (smDown) as a toggler button for opening a drawer of both right and left links
      */}
      <Toolbar className={classes.container}>
        {
          leftLinks !== undefined
            ? brandComponent
            : null
        }
        <div className={classes.flex}>
          {
            leftLinks !== undefined
              ? (
                <Hidden smDown implementation="css">
                  {leftLinks}
                </Hidden>
              )
              : (
                brandComponent
              )
          }
        </div>
        <Hidden smDown implementation="css">
          {/* {rightLinks} */}
          <HeaderLinks handleDrawerToggle={handleDrawerToggle}/*  user={user}  */ />
          {/* <AuthNavItem handleDrawerToggle={handleDrawerToggle} user={user} /> */}
        </Hidden>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>

      {/*
        * Drawer of left and right links components (smDown)
      */}
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
            {leftLinks}

            {/* {rightLinks} */}
            <HeaderLinks handleDrawerToggle={handleDrawerToggle}/*  user={user}  */ />
            {/* <AuthNavItem handleDrawerToggle={handleDrawerToggle} user={user} /> */}
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  );
};

export default Header;

Header.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'transparent',
    'white',
    'rose',
    'dark',
  ]),
  // rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is higher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  // eslint-disable-next-line react/require-default-props
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      'primary',
      'info',
      'success',
      'warning',
      'danger',
      'transparent',
      'white',
      'rose',
      'dark',
    ]).isRequired,
  }),
};

Header.defaultProps = {
  color: 'white',
};

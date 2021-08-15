// import React from 'react';
// import { Footer } from '../Footer';
// import { Header } from '../Header';

// const Layout = (props) => (
//   <>
//     <Header />
//     {
//       // eslint-disable-next-line react/destructuring-assignment
//       props?.children
//     }
//     <Footer />
//   </>
// );

// export { Layout };

import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Header from '../Header/Header.js';
import HeaderLinks from '../Header/HeaderLinks.js';
import Footer from '../Footer/Footer.js';

const dashboardRoutes = [];

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export function Layout(props) {
  const classes = useStyles();
  const { ...rest } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header
        color="dark"
        routes={dashboardRoutes}
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: 'white',
        }}
        {...rest}
      />
      <Container component="main" className={classes.main} maxWidth="lg">
        {/* <Typography variant="h2" component="h1" gutterBottom>
          Sticky footer
        </Typography> */}
        {
          props.children
        }
        {/* <Typography variant="h5" component="h2" gutterBottom> */}
        {/* Pin a footer to the bottom of the viewport.
          The footer will move as the main element of the page grows. */}
        {/* {
            props.children
          } */}

        {/* </Typography> */}
        <Typography variant="body1">Sticky footer placeholder.</Typography>
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          {/* <Typography variant="body1">My sticky footer can be found here.</Typography>
          <Copyright /> */}
          <Footer />
        </Container>
      </footer>
    </div>
  );
}

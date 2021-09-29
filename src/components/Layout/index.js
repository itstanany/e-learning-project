import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from '../Header/Header.js';
import HeaderLinks from '../Header/HeaderLinks.js';
import Footer from '../Footer/Footer.js';

const dashboardRoutes = [];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(2),
  },
  footer: {
    // padding: theme.spacing(2, 1),
    marginTop: 'auto',
    backgroundColor: (theme.palette.type === 'light'
      ? theme.palette.grey[200]
      : theme.palette.grey[800]),
  },
}));

export function Layout(props) {
  const classes = useStyles();
  const { ...rest } = props;

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Header
          color="dark"
          routes={dashboardRoutes}
          brand="El-Doctor E-Center"
          // rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: 'white',
          }}
          {...rest}
        />
      </div>

      <Container
        component="main"
        className={classes.main}
        maxWidth="lg"
      /*  style={{ marginTop: '155px' }} */
      >
        {
          // eslint-disable-next-line react/destructuring-assignment
          props.children
        }
      </Container>
      <footer
        className={classes.footer}
      >
        <Footer />
      </footer>
    </div>
  );
}

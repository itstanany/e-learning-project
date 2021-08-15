// import Head from 'next/head'
// import Image from 'next/image'
// import Link from 'next/link'
// import styles from '../styles/Home.module.css'

// export default function Home() {
//   return (
//     <div style={{ width: '100%', margin: '0 auto', padding: '50px' }}>
//       Home page container
//       <br />
//       <Link href="/dashboard">
//         <a>
//           Dashboard
//         </a>
//       </Link>
//     </div>)
// }

import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons

// core components
import Header from '../components/Header/Header.js';
import Footer from '../components/Footer/Footer.js';
import GridContainer from '../components/Grid/GridContainer.js';
import GridItem from '../components/Grid/GridItem.js';
import Button from '../components/CustomButtons/Button.js';
import HeaderLinks from '../components/Header/HeaderLinks.js';
import Parallax from '../components/Parallax/Parallax.js';

import styles from '../assets/jss/material-kit-react/views/landingPage.js';

// Sections for this page
import ProductSection from '../components/Sections/ProductSection.js';
import TeamSection from '../components/Sections/TeamSection.js';
import WorkSection from '../components/Sections/WorkSection.js';

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  // const { ...rest } = props;
  return (
    <div>
      {/* <Header
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
      /> */}
      <Parallax filter image={require('../assets/img/landing-bg.jpg').default}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your Story Starts With Us.</h1>
              <h4>
                Every landing page needs a small description after the big bold
                title, that
                &apos;
                s why we added this text here. Add here all the
                information that can make you or your product create the first
                impression.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Watch video
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <TeamSection />
          <WorkSection />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

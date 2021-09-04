/**
 * Home Landing page
 */
import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons

// core components
import GridContainer from '../components/Grid/GridContainer.js';
import GridItem from '../components/Grid/GridItem.js';
import Button from '../components/CustomButtons/Button.js';
import Parallax from '../components/Parallax/Parallax.js';

import styles from '../assets/jss/material-kit-react/views/landingPage.js';

// Sections for this page
import ProductSection from '../components/Sections/ProductSection.js';
import TeamSection from '../components/Sections/TeamSection.js';
import WorkSection from '../components/Sections/WorkSection.js';

const useStyles = makeStyles(styles);

export default function LandingPage() {
  const classes = useStyles();
  return (
    <div>
      <Parallax filter image="/assets/img/landing-bg.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your Journey Starts With Us.</h1>
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
                href="https://www.youtube.com/c/%D9%82%D9%86%D8%A7%D8%A9%D8%A7%D9%84%D8%AF%D9%83%D8%AA%D9%88%D8%B1%D9%84%D9%84%D9%85%D9%88%D8%A7%D8%AF%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9/playlists"
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
    </div>
  );
}

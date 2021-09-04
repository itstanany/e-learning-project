import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';

const Loader = () => (
  <Grid
    container
    justifyContent="center"
    alignItems="center"
    style={{ height: '90vh', width: '90vw' }}
  >
    <CircularProgress />
  </Grid>
);

export default Loader;
export {
  Loader,
};

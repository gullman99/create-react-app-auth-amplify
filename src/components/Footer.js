import React from 'react'
import '../App.css';

import { Link, withRouter, useLocation } from 'react-router-dom'

import { withStyles, createStyles, Grid, Button, Typography } from '@material-ui/core';

//Assets
import SpecialFitnessLogo from '../img/special-fitness-logo.png';

const styles = () => createStyles({
  backgroundColor: {
    backgroundColor: 'red'
  }
});


class Footer extends React.Component{

  render (){
    const { classes } = this.props;

    const pathname = this.props.location.pathname;
    console.log(pathname)

    return(
      <footer style={{height: 80, padding: 20, borderTop: 'solid', borderTopWidth: 1, borderTopColor: 'lightgray'}}>
        <Grid container>
          <Grid item style={{width: 'auto'}} container justify="center" alignItems="center">
            <Button style={{marginRight: 20}}>
              <Link to="/" style={{height: 'auto'}}>
                <img src={SpecialFitnessLogo} alt="logo" width="auto" height="60" />
              </Link>
            </Button>
          </Grid>
          <Grid item style={{width: 280, paddingRight: 30, marginRight: 30, borderRight: 'solid', borderWidth: 1}} container justify="center" alignItems="center">
            <Typography variant="body1">
              Proudly serving southeastern Wisconsin including:
              <br />
              Kenosha, Racine, and Milwaukee.
            </Typography>
          </Grid>
          <Grid item style={{width: 'auto'}} container justify="center" alignItems="center">
            <Typography variant="body1">
              <b>Contact us:</b>
              <br />
              • specialfitnessWI@gmail.com
              <br />
              • (262) 308-5450
            </Typography>
          </Grid>
          <Grid item xs container direction="column">
            <Grid item xs container justify="flex-end">
              <Typography variant="body1">
                <a href="/">Home</a>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="/jobs">Employment</a>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="/appointment">Request Fitness Trainer</a>
              </Typography>
            </Grid>
            <Grid item xs container justify="flex-end" alignItems="flex-end">
              <Typography variant="caption">
                Copyright © 2020 Special Fitness. All rights reserved&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="https://en.wikipedia.org/wiki/Privacy_policy" target="_blank">Privacy Policy</a>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="https://en.wikipedia.org/wiki/Terms_of_service" target="_blank">Terms and Conditions</a> 
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </footer>
    );
  }
}


export default withRouter(withStyles(styles)(Footer))
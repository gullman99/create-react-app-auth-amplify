import React from 'react';

//Styles
import { makeStyles } from '@material-ui/styles';
import { Paper, Typography } from '@material-ui/core';
import '../../App.css'

//Components
import Login from './Login'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
  paper: {
    padding: 25,
    width: 500
  }
}));

function Home(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div class="background-image">
        <div style={{padding: 40}}>
          <Paper className={classes.paper}>
            <Typography variant="h5" >
              "My caregiver from St. Lorraine
              helped me recover from my knee surgery through
              personalized workouts and meals.
              She was a wonderful support to me
              and good company during my recovery.
              Thank you St. Lorraine!"
              <br /><br />
              - Mary S.
            </Typography>

          </Paper>
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
          <Login setUser={props.setUser}/>
        </div>
      </div>
    </div>
  )
}

export default Home;


import { Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Header from '../Header';
import UserList from './UserList'

const useStyles = makeStyles(theme => ({
    root: {
      minHeight: '100%',
      padding: 40
    },
    paper: {
      padding: 25,
      width: 500
    }
  }));
  
    
function Admin(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/* <Header setUser={props.setUser}/> */}

            <div>
                <Typography variant="h4">
                    Modify Users and Events
                </Typography>
                <Typography variant="body1" style={{marginTop: 10}}>
                    Navigate to the link below to modify data for users, appointments (events), and employee event availability.
                    <br />
                    You must have access to AWS Permissions for DynamoDB. Reach out to an administrator if you are having trouble accessing the link below.
                </Typography>
                <Button style={{marginTop: 20}} variant="contained" color="primary" target="_blank" href="https://console.aws.amazon.com/dynamodb/home?region=us-east-1#tables:">
                    Edit Data
                </Button>
            </div>

            <div style={{marginTop: 40}}>
                <Typography variant="h4">
                    User List
                </Typography>
                <br />
                <UserList />
            </div>

        </div>
    )
}


export default Admin
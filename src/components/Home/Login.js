
import React from 'react';
import '../../App.css'
import { Link, withRouter } from 'react-router-dom'
import {  API, graphqlOperation, Auth} from 'aws-amplify';
import { listUsers as ListUsers } from '../../graphql/queries'
import { Button, Grid, Paper, TextField } from '@material-ui/core';

// async function signIn() {
//     try {
//         const user = await Auth.signIn(username, password);
//     } catch (error) {
//         console.log('error signing in', error);
//     }
// }

//fileio
//const fs = require('fs');


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {    this.setState({email: event.target.value, password: this.state.password});  }
  handlePasswordChange(event){  this.setState({email: this.state.email, password: event.target.value})}
  async handleSubmit(event) {
    event.preventDefault();


    try {
      const userAuth = await Auth.signIn(this.state.email, this.state.password);
       try {
        const UserData = await API.graphql(graphqlOperation(ListUsers, {
          filter: {
            email: {
              eq: this.state.email
            }
          }
        }))
        console.log('userData:', UserData.data.listUsers.items[0])
        // this.setState({
        //   users: UserData.data.listUsers.items
        // })
        var user = UserData.data.listUsers.items[0];
        var userState = {
          firstName: user.firstName,
          lastName: user.lastName,
          id: user.id,
          type: user.type,
          email: user.email,
          password: user.password,
          cellphone: user.cellphone,
          address: user.address,
        }
        this.props.setUser(userState);
        this.props.history.push('/Account');
      } catch (err) {
        console.log('error fetching users...', err)
        alert("Oops! Something went wrong: " + err.message)
      }
      } catch (error) {
        console.log('error signing in', error);
        this.props.history.push('/');
        alert("Oops! Something went wrong: " + error.message)
      }

    //database call
    //alert('email and password: ' + this.state.email + ' ' + this.state.password);
    console.log('email and password: ' + this.state.email + ' ' + this.state.password);
    //this.props.history.push('/Account');
     //not sure what this does
  }

  render() {
    return (
        <div className="row">
          <div className="column-8-right">
            <Paper style={{padding: 30}}>
                  <TextField
                    label="Email"
                    variant="outlined" 
                    type="email" 
                    value={this.state.email} 
                    onChange={this.handleEmailChange}
                    style={{width: 250}}
                  />
                <br></br>
                  <TextField
                    label="Password"
                    variant="outlined" 
                    type="password" 
                    value={this.state.password} 
                    onChange={this.handlePasswordChange}
                    style={{width: 250, marginTop: 15}}
                  />
                
                <Grid container spacing={2} style={{marginTop: 15}}>
                  <Grid item style={{width: 'auto'}}>
                    <Button variant="contained" onClick={this.handleSubmit}>
                      Log in
                    </Button>
                  </Grid>
                  <Grid item xs>
                    <Link to="/signup" style={{textDecoration: 'none'}}>
                      <Button variant="contained">
                        Sign up
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
            </Paper>
          </div>
        </div>

    );
  }
}

export default withRouter(Login);
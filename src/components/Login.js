
import React from 'react';
import '../App.css'
import { Link, withRouter } from 'react-router-dom'
import {  API, graphqlOperation, Auth} from 'aws-amplify';
import { listUsers as ListUsers } from '../graphql/queries'

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
      <div class ="row">
        <div class ="column-8-right">
          <form onSubmit={this.handleSubmit}>
            <label>
              Email: 
              <input type="email" value={this.state.email} onChange={this.handleEmailChange} />        </label>
            <br></br>
            <label>
                Password: 
                <input type="password" value={this.state.password} onChange={this.handlePasswordChange} /> 
            </label>
            <br></br>
              <input type="submit" value="Log in" />
              <Link to="/signup"><input type="submit" value="Sign Up" /></Link>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
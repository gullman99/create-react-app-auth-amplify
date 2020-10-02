// src/App.js
import React from 'react';

import { API, graphqlOperation, Auth } from 'aws-amplify'
// import uuid to create a unique client ID
//import uuid from 'uuid/v4'

import { listUsers as ListUsers } from '../../graphql/queries'
// import the mutation
import { createUser as CreateUser } from '../../graphql/mutations'
import { Link, withRouter } from 'react-router-dom'
import {Field, Formik, Form} from "formik"
import TextField from '@material-ui/core/TextField';
import { Button, Paper, Typography }  from '@material-ui/core'
import { userContext } from '../../context/UserContext';

//const CLIENT_ID = uuid()
// function SignUpGraphQLRedux(username){
//   const dispatch = useDispatch();
//   const dispatch1 = dispatch(login(username));
//   return(
//     <div></div>
//   );
// }


class SignUpGraphQL extends React.Component {
  // define some state to hold the data returned from the API
  state = {
    type: 'client', firstName: '', lastName: '', email: '', password: '', cellphone: '', address:'', users: []
  }
  handleSubmit = (event) => {
    /* Write to a json file attempt
    let account = {
      email: this.state.email,
      password: this.state.password
    };
    let data = JSON.stringify(account);
    fs.writeFileSync('login.json', data);*/
    //console.log('big info dump: ' + this.state.fname + ' ' + this.state.lname + ' ' + this.state.email + ' ' + this.state.password + ' ' + this.state.cpassword + ' ' + this.state.cellphone + ' ' + this.state.address);
    // db.query('SELECT * FROM UserInfo').spread(function (users) {
    //   console.log('Hello users', users);
    // });

    this.props.history.push('/Account');
    //testconnection();
    event.preventDefault(); //not sure what this does
  }

  // execute the query in componentDidMount
  async componentDidMount() {
    // try {
    //   const userData = await API.graphql(graphqlOperation(ListUsers))
    //   //console.log('userData:', userData)
    //   this.setState({
    //     users: userData.data.listUsers.items
    //   })
    // } catch (err) {
    //   console.log('error fetching users...', err)
    // }
    console.log(this.context);
  }
  formatPhoneNumber = (number) => {
    if (number.substring(0,2)=="+1"){
      return number
    }
    else if (number.substring(0,1)=="1"){
      return "+" + number
    }
    else{
      return "+1" + number
    }
  }
  createUser = async() => {
    // const { type, firstName, lastName, email, password, cellphone, address } = this.state
    // if ( type === '' || firstName === '' || lastName === '' || email === '' || password === '' || cellphone === '' || address === '') return

    // const user = { type, firstName, lastName, email, password, cellphone, address}
    // const users = [...this.state.users, user]
    // this.setState({
    //   users, type: 'client', firstName: '', lastName: '', email: '', password: '', cellphone: '', address: ''
    // })

    // try {
    //   await API.graphql(graphqlOperation(CreateUser, { input: user }))
    //   console.log('item created!')
    // } catch (err) {
    //   console.log('error creating user...', err)
    // }
    // this.props.history.push('/Account');
    // testconnection();

    try {
        const { user } = await Auth.signUp({
            username: this.state.email,
            password: this.state.password,
            attributes: {
              phone_number: this.state.cellphone   // optional - E.164 number convention
                // other custom attributes 
            }
        });
        console.log(user);
      const { type, firstName, lastName, email, password, cellphone, address } = this.state
      if ( type === '' || firstName === '' || lastName === '' || email === '' || password === '' || cellphone === '' || address === '') return

      const dbuser = { type, firstName, lastName, email, password, cellphone, address}
      const users = [...this.state.users, dbuser]
      // this.setState({
      //   users, type: 'client', firstName: '', lastName: '', email: '', password: '', cellphone: '', address: ''
      // })

      try {
        await API.graphql(graphqlOperation(CreateUser, { input: dbuser }))
        console.log('item created!')
        this.props.setUser(dbuser);
        this.props.history.push('/Account');
      } catch (err) {
        console.log('error creating user...', err)
        this.props.history.push('/');
      }
      //testconnection();
    } catch (error) {
        console.log('error signing up:', error);
        alert("Oops! Something went wrong: " + error.message)
        this.props.history.push('/');
    }
    //this.props.history.push('/Account');
    //console.log(user);
  }
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    //const {user} = this.context;
    return (
      <Paper elevation={3} style={{padding: 30}}>
        <Formik
          initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              cellphone: "",
              address: ""
          }}
          onSubmit={(values, { setSubmitting}) =>{
            setTimeout(() => {
              setSubmitting(false);
              alert(JSON.stringify(values, null, 2));
            }, 500);
            this.setState(values)
            this.setState({
              cellphone: this.formatPhoneNumber(this.state.cellphone)
            })
            console.log(this.state)
            this.createUser()
            this.handleSubmit()
          }}
        >
          {({ values, isSubmitting }) => (
          <Form style={{width: 'auto'}}>
            <Typography variant="h4">
              Sign up
            </Typography>
            <Field
              className="signUpField"
              as={TextField}
              name={"firstName"}
              type="input"
              required={true}
              label="First Name"
              value = {values.firstName}
            /><br></br>
            <Field
              className="signUpField"
              as={TextField}
              name={"lastName"}
              required={true}
              type="input"
              label="Last Name"
              value = {values.lastName}
            /><br></br>
            <Field
              className="signUpField"
              as={TextField}
              name={"email"}
              required={true}
              type="email"
              label=" Email"
              value = {values.email}
            /><br></br>
            <Field
              className="signUpField"
              as={TextField}
              name={"password"}
              required={true}
              type="password"
              InputProps={{ inputProps: { minlength: 8} }}          
              label="Password"
              value = {values.password}
            /><br></br>
            <Field
              className="signUpField"
              as={TextField}
              name={"cellphone"}     
              required={true}
              InputProps={{ inputProps: { minlength: 10, maxlength:10 } }}
              type="tel"
              label="Cellphone"
              value = {values.cellphone}
            /><br></br>
            <Field
              className="signUpField"
              as={TextField}
              name={"address"}
              required={true}
              type="input"
              label="Address"
              value = {values.address}
            /><br></br>


            <br />
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              type="submit"
            >
              Create My Account
              </Button>
          </Form>)}
        </Formik>
      </Paper>
        
        /* <form onSubmit={this.handleSubmit}>
          <h1>Sign Up</h1>
            <label>
              First Name:
              <br></br>
              <input 
                type="text"
                name='firstName' 
                onChange ={this.onChange}
                value={this.state.firstName}
              />        
              </label>
            <br></br>
            <br></br>
            <label>
                Last Name:
                <br></br>
                <input 
                    type="text"  
                    name='lastName'
                    onChange={this.onChange}
                    value={this.state.lastName}
                /> 
            </label>
            <br></br>
            <br></br>
            <label>
                Email:
                <br></br>
                <input  
                    type= "email" 
                    name='email'
                    onChange={this.onChange}
                    value={this.state.email}
                /> 
            </label>
            <br></br>
            <br></br>
            <label>
                Password:
                <br></br>
                <input  
                    type='password' 
                    name='password'
                    onChange={this.onChange}
                    value={this.state.password}
                /> 
            </label>
            <br></br>
            <br></br>
            <label>
                Confirm Password:
                <br></br>
                <input type='password' /> 
            </label>
            <br></br>
            <br></br>
            <label>
                Cellphone:
                <br></br>
                <input    
                    type= "text"
                    name='cellphone'
                    onChange={this.onChange}
                    value={this.state.cellphone}
                /> 
            </label>
            <br></br>
            <br></br>
            <label>
                Address:
                <br></br>
                <input 
                    type="text" 
                    name='address'
                    onChange={this.onChange}
                    value={this.state.address}
                />
            </label>
            <br></br>
            <br></br>
            <button onClick={this.createUser}>Create My Account</button>            
            </form> */
    )
  }
}
SignUpGraphQL.contextType= userContext;


export default withRouter(SignUpGraphQL)
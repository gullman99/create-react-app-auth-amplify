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
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Typography }  from '@material-ui/core'
import { userContext } from '../../context/UserContext';


class SignUpGraphQL extends React.Component {
    // define some state to hold the data returned from the API
    state = {
        type: '', 
        firstName: '', 
        lastName: '', 
        email: '', 
        password: '', 
        cellphone: '', 
        address:'', 
        users: [], 
        authCode:  ''
    }

    handleSubmit = (event) => {
        this.props.history.push('/Account');

        event.preventDefault(); //not sure what this does
    }

    // execute the query in componentDidMount
    async componentDidMount() {
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
        try {
            const { user } = await Auth.signUp({
                username: this.state.email,
                password: this.state.password,
                attributes: {
                    phone_number: this.state.cellphone   // optional - E.164 number convention
                }
            });

            const { type, firstName, lastName, email, password, cellphone, address } = this.state

            if ( type === '' || firstName === '' || lastName === '' || email === '' || password === '' || cellphone === '' || address === '')
                return

            const dbuser = { type, firstName, lastName, email, password, cellphone, address}
            const users = [...this.state.users, dbuser]

            try {
                await API.graphql(graphqlOperation(CreateUser, { input: dbuser }))
                console.log('item created!')
                this.props.setUser(dbuser);
                this.props.history.push('/Account');
            } catch (err) {
                console.log('error creating user...', err)
                this.props.history.push('/');
            }
        } catch (error) {
            console.log('error signing up:', error);
            alert("Oops! Something went wrong: " + error.message)
            this.props.history.push('/');
        }
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
                    type: "",
                    cellphone: "",
                    address: ""
                }}
                onSubmit={(values, { setSubmitting}) =>{
                    setTimeout(() => {
                        setSubmitting(false);
                        //alert(JSON.stringify(values, null, 2));
                    }, 500);

                    if (this.state.type === 'employee' && this.state.authCode.toUpperCase() !== 'CARING') {
                        alert("Invalid authorization code")
                    } else {
                        this.setState(values)

                        this.setState({
                            cellphone: this.formatPhoneNumber(this.state.cellphone)
                        })
     
                        this.createUser()
    
                        this.handleSubmit()
                    }
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
                        as="select"
                        style={{width: '300px', height: '50px', marginTop: 15, padding: 5}}
                        name="type"
                        type="password"
                        label="type"
                        value={this.state.type}
                        onChange={(e) => this.onChange(e)}
                    >
                            <option value={'client'}>Client</option>
                            <option value={'employee'}>Employee</option>
                    </Field>
                    {this.state.type === 'employee' && (
                        <div>
                            <TextField 
                                style={{width: '300px', height: '50px', marginTop: 15}}
                                value={this.state.authCode} 
                                name="authCode"
                                label="Authorization Code" 
                                onChange={(e) => this.onChange(e)}
                            />
                        </div>
                    )}

                    <br />
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
                </Form>
                )}
            </Formik>
        </Paper>
        
        )
    }
}
SignUpGraphQL.contextType= userContext;


export default withRouter(SignUpGraphQL)
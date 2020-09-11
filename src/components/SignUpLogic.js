import React from 'react';
import '../App.css'
import { Link, withRouter } from 'react-router-dom'



// var db = require('mysql-promise')();

// db.configure({
// 	"host": "stlorraine.cumbxkukha4z.us-east-2.rds.amazonaws.com",
// 	"user": "admin",
// 	"password": "Va11eyF0rge",
//   "database": "mydb"
// });




// var mysql = require('mysql');

// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'admin',
//   password: 'Va11eyF0rge',
//   database: 'mydb',
//   port: 3306
// });

// connection.connect();

/*connection.query(
      'INSERT INTO UserInfo (type, firstName, lastName, email, password, cellphone, address) VALUES(client,' + this.state.fname + ','+ this.state.lname + ',' + this.state.email + ',' + this.state.password + ',' + this.state.cellphone + ',' + this.state.address+')',

      function(err, results, fields) {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
      }
    );
    */ 
/*
const { Sequelize } = require('sequelize');
//fileio
//const fs = require('fs');
const sequelize = new Sequelize('database-1', 'admin', 'Va11eyF0rge', {
  host: "database-1.cluster-cumbxkukha4z.us-east-2.rds.amazonaws.com",
  port: 3306
})


async function testconnection(){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  return
}
*/

class SignUpLogic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {fname: '', lname: '', email: '', password:'', cpassword:'', cellphone:'', address:''};
  }



  
  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value; 
    this.setState({[nam]: val});
    }
  handleSubmit = (event) => {
    /* Write to a json file attempt
    let account = {
      email: this.state.email,
      password: this.state.password
    };
    let data = JSON.stringify(account);
    fs.writeFileSync('login.json', data);*/
    alert('info dump: ' + this.state.fname + ' ' + this.state.lname + ' ' + this.state.email + ' ' + this.state.password + ' ' + this.state.cpassword + ' ' + this.state.cellphone + ' ' + this.state.address);
    //console.log('big info dump: ' + this.state.fname + ' ' + this.state.lname + ' ' + this.state.email + ' ' + this.state.password + ' ' + this.state.cpassword + ' ' + this.state.cellphone + ' ' + this.state.address);
    // db.query('SELECT * FROM UserInfo').spread(function (users) {
    //   console.log('Hello users', users);
    // });

    this.props.history.push('/');
    //testconnection();
    event.preventDefault(); //not sure what this does
  }

  render() {
    return (
      <div>
          <h1>Sign Up</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              First Name:
              <br></br>
              <input type="text" name='fname' onChange={this.handleChange} />        
              </label>
            <br></br>
            <br></br>
            <label>
                Last Name:
                <br></br>
                <input type="text" name='lname' onChange={this.handleChange} /> 
            </label>
            <br></br>
            <br></br>
            <label>
                Email:
                <br></br>
                <input type="email" name='email' onChange={this.handleChange} /> 
            </label>
            <br></br>
            <br></br>
            <label>
                Password:
                <br></br>
                <input type="password" name='password' onChange={this.handleChange} /> 
            </label>
            <br></br>
            <br></br>
            <label>
                Confirm Password:
                <br></br>
                <input type="password" name='cpassword' onChange={this.handleChange} /> 
            </label>
            <br></br>
            <br></br>
            <label>
                Cellphone:
                <br></br>
                <input type="text" name='cellphone' onChange={this.handleChange} /> 
            </label>
            <br></br>
            <br></br>
            <label>
                Address:
                <br></br>
                <input type="text" name='address' onChange={this.handleChange} /> 
            </label>
            <br></br>
            <br></br>
              <input type="submit" value="Next" />
          </form>
        </div>
    );
  }
}

export default withRouter(SignUpLogic);
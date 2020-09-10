import React from 'react';
import Header from './Header';
import { API, graphqlOperation } from 'aws-amplify'
import { createEvent as CreateEvent } from '../graphql/mutations'
import { Link, withRouter } from 'react-router-dom'
import { userContext } from './UserContext';


class ScheduleAppointment extends React.Component {
    // define some state to hold the data returned from the API
    static contextType = userContext;

   
    state = {
      client: this.context.id, employee: '', service: '', date: '', startTime: '', endTime: '', color:''
    }
    handleSubmit = (event) => {
  
      this.props.history.push('/Account');
      //testconnection();
      event.preventDefault(); //not sure what this does
    }
  
    // execute the query in componentDidMount
    /*async componentDidMount() {
      try {
        const userData = await API.graphql(graphqlOperation(ListUsers))
        console.log('userData:', userData)
        this.setState({
          users: userData.data.listUsers.items
        })
      } catch (err) {
        console.log('error fetching users...', err)
      }
    }*/
    createEvent = async() => {
      var clientId = this.context.id;

      const { client, employee, service, date, startTime, endTime, color } = this.state
      if ( client === '' || date === '' || startTime === '' || endTime === '' ) return
  
      var event = { client: clientId, employee, service, date, startTime, endTime, color }
      //const users = [...this.state.users, user]
      this.setState({
        client: clientId, employee: '', service: '', date: '', startTime: '', endTime: '', color:''
      })

      //query for employee from database
      try{
        //figure out how to filter two things filter for firstname = this.state.employee and type = employee
        //https://stackoverflow.com/questions/60853978/how-to-filter-list-queries-with-and-or-operators-aws-amplify-javascript-graphql
        const employeeData = await API.graphql(graphqlOperation(ListUsers, {
          filter: {
            firstName: {
              eq: this.state.employee
            }

          }
        }))
        if(employeeData.length >= 1){
          try {
            event = {employee: employeeData.id}
            await API.graphql(graphqlOperation(CreateEvent, { input: event }))
            console.log('item created!')
            this.props.history.push('/Account');
          } catch (err) {
            console.log('error creating event...', err)
            this.props.history.push('/Appointment');
            alert("Oops something went wrong", err);
          }
        }
        else{
          alert("Please enter an employee name that exists in our database");
          this.props.history.push('/Appointment');
        }
      }
      catch(err){
        console.log('error fetching Users', err);
        alert("Oops something went wrong", err);
        this.props.history.push('/Appointment');
      }

      //create event
      try {
        await API.graphql(graphqlOperation(CreateEvent, { input: event }))
        console.log('item created!')
        this.props.history.push('/Account');
      } catch (err) {
        console.log('error creating event...', err)
        this.props.history.push('/Appointment');
      }
      //testconnection();
    }
    onChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
    render() {
      return (
        <>
          <div>
          <form onSubmit={this.handleSubmit}>
            <h1>Schedule Appointment</h1>
              <label>
                Date:
                <br></br>
                <input 
                  type="text"
                  name='date' 
                  onChange ={this.onChange}
                  value={this.state.date}
                />        
                </label>
              <br></br>
              <br></br>
              <label>
                  Start Time:
                  <br></br>
                  <input 
                      type="text"  
                      name='startTime'
                      onChange={this.onChange}
                      value={this.state.startTime}
                  /> 
              </label>
              <br></br>
              <br></br>
              <label>
                  End Time:
                  <br></br>
                  <input  
                      type= "text" 
                      name='endTime'
                      onChange={this.onChange}
                      value={this.state.endTime}
                  /> 
              </label>
              <br></br>
              <br></br>
              <label>
                  Service:
                  <br></br>
                  <input  
                      type= "text" 
                      name='service'
                      onChange={this.onChange}
                      value={this.state.service}
                  /> 
              </label>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <label>
                  Employee:
                  <br></br>
                  <input  
                      type= "text" 
                      name='employee'
                      onChange={this.onChange}
                      value={this.state.employee}
                  /> 
              </label>
              <br></br>
              <br></br>
              <label>
                  Color:
                  <br></br>
                  <input  
                      type='text' 
                      name='color'
                      onChange={this.onChange}
                      value={this.state.color}
                  /> 
              </label>
              <br></br>
              <br></br>
              <button onClick={this.createEvent}>Create Event</button>            
              </form>
          </div>
        </>
      )
    }
  }

  ScheduleAppointment.contextType= userContext;

  

export default withRouter(ScheduleAppointment)

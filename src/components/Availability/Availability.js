import React from 'react';
import Header from '../Header';
import { API, graphqlOperation } from 'aws-amplify'
import { createEvent as CreateEvent } from '../../graphql/mutations'
import { createEventAvailability as CreateEventAvailability } from '../../graphql/mutations'

import moment from 'moment'

import { Link, withRouter } from 'react-router-dom'
import { userContext } from '../../context/UserContext';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import AvailabilityCalendar from './AvailabilityCalendar';


class Availability extends React.Component {
    // define some state to hold the data returned from the API
    static contextType = userContext;

   
    state = {
        employeeId: this.context.id, 
        date: moment(Date.now()).format('YYYY-MM-DD'), 
        startTime: '12:00', 
        endTime: '13:00',
        reloadEvents: false
    }

    handleSubmit = (event) => {
  
        this.props.history.push('/Account');
        //testconnection();
        event.preventDefault(); //not sure what this does
    }
  
    // execute the query in componentDidMount
    async componentDidMount() {
        console.log("context", this.context)
    }


    createEvent = async(event) => {
        //var employeeId = this.context.id;
        event.preventDefault();
        const { employeeId, date, startTime, endTime} = this.state
        
        //console.log("The state is", this.state);
        if ( employeeId === ''|| date === '' || startTime === '' || endTime === '' )
            return
        
        //console.log(startTime, endTime, "startTime endTime")
        var eventAvailability = { employeeId: employeeId, date, startTime, endTime}
        //const dateToIso = moment(eventAvailability.date).toISOString();
        //const startTimeToIso = moment(eventAvailability.startTime, "HH:mm A").toISOString();
        //const endTimeToIso = moment(eventAvailability.endTime, "HH:mm A").toISOString();

        eventAvailability = {
            date: date,
            startTime: startTime,
            endTime: endTime,
            employeeId: employeeId
        }

        //Unncessary to reset
        /* this.setState({
            employeeId: employeeId,  
            date: '', 
            startTime: '', 
            endTime: ''
        }) */

        console.log(eventAvailability)
    
        try {
            await API.graphql(graphqlOperation(CreateEventAvailability, { input: eventAvailability }))
            console.log('item created!')
            this.setState({
                reloadEvents: !this.state.reloadEvents
            })
            alert("Availability set!")
        } catch (err) {
            console.log('error creating event...', err)
        }
        this.props.history.push('/availability');
        //testconnection();
    }
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        return (
            <div style={{minHeight: '100%'}}>

                <Paper elevation={3} style={{width: 400, margin: '0 auto', marginTop: 40, marginBottom: 40, padding: 30}}>
                    <Typography variant="h4">
                        Set Availability
                    </Typography>

                    <TextField
                        label="Date"
                        variant="outlined" 
                        type="date" 
                        name='date' 
                        onChange ={this.onChange}
                        value={this.state.date}
                        style={{width: '100%', marginTop: 15}}
                    />
                    <br />
                    <TextField
                        label="Start time"
                        variant="outlined" 
                        type="time" 
                        name='startTime'
                        onChange={this.onChange}
                        value={this.state.startTime}
                        style={{width: '100%', marginTop: 15}}
                    />
                    <br />
                    <TextField
                        label="End time"
                        variant="outlined" 
                        type="time" 
                        name='endTime'
                        onChange={this.onChange}
                        value={this.state.endTime}
                        style={{width: '100%', marginTop: 15}}
                    />

                    <Button variant="contained" color="primary" onClick={this.createEvent} style={{marginTop: 15}}>
                        Create Event
                    </Button>            
                </Paper>

                <AvailabilityCalendar  reloadEvents={this.state.reloadEvents} />

            </div>
        )
    }
  }

  Availability.contextType= userContext;

  

export default withRouter(Availability)

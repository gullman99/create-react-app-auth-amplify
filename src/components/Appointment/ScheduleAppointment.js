import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import moment from 'moment'

//Amplify
import { API, graphqlOperation } from 'aws-amplify'
import { createEvent as CreateEvent } from '../../graphql/mutations'

//Date
import { userContext } from '../../context/UserContext';

//Styles
import { Button, Paper, TextField, Typography } from '@material-ui/core';


class ScheduleAppointment extends React.Component {
    // define some state to hold the data returned from the API
    static contextType = userContext;


    state = {
        client: this.context.id, 
        employee: '', 
        service: '', 
        //Add default date and time values
        date: moment(Date.now()).format('YYYY-MM-DD'), 
        startTime: '12:00', 
        endTime: '13:00', 
        color:''
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
    
        const event = { client: clientId, employee, service, date, startTime, endTime, color }
        //const users = [...this.state.users, user]
        this.setState({
            client: clientId, employee: '', service: '', date: '', startTime: '', endTime: '', color:''
        })
    
        try {
            await API.graphql(graphqlOperation(CreateEvent, { input: event }))
            console.log('item created!')
        } catch (err) {
            console.log('error creating event...', err)
        }
        this.props.history.push('/Account');
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
            <Paper elevation={3} style={{padding: 30}}>
                <Typography variant="h4">
                Schedule Appointment
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
                <br />
                <TextField
                    label="Service"
                    variant="outlined" 
                    type="text" 
                    name='service'
                    onChange={this.onChange}
                    value={this.state.service}
                    style={{width: '100%', marginTop: 15}}
                />
                <br />
                <TextField
                    label="Employee"
                    variant="outlined" 
                    type="text" 
                    name='employee'
                    onChange={this.onChange}
                    value={this.state.employee}
                    style={{width: '100%', marginTop: 15}}
                />
                <br />
                <TextField
                    label="Color"
                    variant="outlined" 
                    type="text" 
                    name='color'
                    onChange={this.onChange}
                    value={this.state.color}
                    style={{width: '100%', marginTop: 15}}
                />
                <br />
                <Button variant="contained" color="primary" onClick={this.createEvent} style={{marginTop: 20}}>
                    Create event
                </Button>      
            </Paper>
            </>
        )
    }
}

ScheduleAppointment.contextType= userContext;

export default withRouter(ScheduleAppointment)

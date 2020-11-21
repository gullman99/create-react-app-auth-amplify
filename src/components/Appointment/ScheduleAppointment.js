import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import moment from 'moment'

//Amplify
import { API, graphqlOperation } from 'aws-amplify'
import { createEvent as CreateEvent } from '../../graphql/mutations'
import { listUsers as ListUsers, listEvents as ListEvents, listEventAvailabilitys } from '../../graphql/queries'

//Date
import { userContext } from '../../context/UserContext';

//Styles
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@material-ui/core';


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
        color:'',
        events: []
    }

    handleSubmit = (event) => {
        this.props.history.push('/Account');
        //testconnection();
        event.preventDefault(); //not sure what this does
    }
  
    //execute the query in componentDidMount
    async componentDidMount() {
        try {
            const userData = await API.graphql(graphqlOperation(ListUsers))
            console.log('userData:', userData.data.listUsers.items)

            const employees = userData.data.listUsers.items.filter(user => user.type === 'employee');
            console.log('employees', employees)
            
            this.setState({
                users: employees
            })
        } catch (err) {
            console.log('error fetching users...', err)
        }
    }

    async getEvents(employee) {
        try {
            this.setState({loading: true})

            console.log("employee", employee)
            let eventsResponse = await API.graphql(graphqlOperation(listEventAvailabilitys, {
                filter: {
                    employeeId: {
                        eq: employee
                    }
                }
            }))
            
            //Check if any of the available events are already booked
            let tempEvents = eventsResponse.data.listEventAvailabilitys.items
            let availableEvents = []
            for (let i in tempEvents) {
                let event = tempEvents[i]

                let eventResponse = await API.graphql(graphqlOperation(ListEvents, {
                    filter: {
                        employee: {
                            eq: event.employeeId
                        },
                        date: {
                            eq: event.date
                        },
                        startTime: {
                            eq: event.startTime
                        },
                        endTime: {
                            eq: event.endTime
                        },
                    }
                }))

                let bookedEvents = eventResponse.data.listEvents.items

                if (bookedEvents.length === 0) 
                    availableEvents.push(event)
                
                console.log("booked events", bookedEvents)
            }

            this.setState({
                events: availableEvents
            })
        } catch (err) {
            console.log('error fetching users...', err)
        } finally {
            this.setState({loading: false})
        }
    }

    createEvent = async() => {
        const { client, employee, service, date, startTime, endTime, color, events } = this.state
        var clientId = this.context.id;

        if ( client === '' || date === '' || startTime === '' || endTime === '' || employee === '')
            return

        let validAppointment = false;
        for (let i in events) {
            if (events[i].date === date && events[i].startTime === startTime && events[i].endTime === endTime) {
                validAppointment = true; 
            }
        }

        if (validAppointment) {
            const event = { client: clientId, employee, service, date, startTime, endTime, color }

            this.setState({
                client: clientId, employee: '', service: '', date: '', startTime: '', endTime: '', color:''
            })
        
            try {
                await API.graphql(graphqlOperation(CreateEvent, { input: event }))
                console.log('item created!')
                alert("Appointment scheduled!")
            } catch (err) {
                console.log('error creating event...', err)
            } 
        } else {
            alert("Date and time is not available for this employee.")
        }


        //this.props.history.push('/Account');
        //testconnection();
    }

    onChange = (event) => {
        if (event.target.name === 'employee') {
            this.getEvents(event.target.value)
        }

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div style={{margin: 'auto'}}>
                <Paper elevation={3} style={{margin: 30, padding: 30}}>
                    <Typography variant="h4">
                    Schedule Appointment
                    </Typography>

                    <FormControl variant="outlined" style={{width: '100%', marginTop: 15}}>
                        <InputLabel>
                            Service
                        </InputLabel>
                        <Select
                            name='service'
                            value={this.state.service}
                            onChange={this.onChange}
                            label="Service"
                        >
                            <MenuItem value={"standard"}>Standard</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <FormControl variant="outlined" style={{width: '100%', marginTop: 15}}>
                        <InputLabel>
                            Employee
                        </InputLabel>
                        <Select
                            name='employee'
                            value={this.state.employee}
                            onChange={this.onChange}
                            label="Employee"
                        >
                            {this.state.users && this.state.users.map((user, index) => {
                                return (
                                    <MenuItem value={user.id} key={index}>
                                        {user.firstName} {user.lastName}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    {this.state.loading ?
                        <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <CircularProgress />
                        </div>
                    : this.state.employee !== '' && this.state.events.length > 0 ?
                        this.state.events.map((event, index) => {
                            return (
                                <Typography variant="body1" style={{margin: 10}}>
                                    <b>Availability</b>
                                    <br />
                                    {moment(event.date).format('L')}: {moment(event.startTime, "HH:mm").format('LT')} - {moment(event.endTime, "HH:mm").format('LT')}
                                </Typography>
                            )
                        })
                    : this.state.employee !== '' && this.state.events.length === 0 ?
                        <Typography variant="body1" style={{margin: 10}}>
                            <b>No available appointments</b>
                        </Typography>
                    :
                        <br />
                    }
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
            </div>
        )
    }
}

ScheduleAppointment.contextType= userContext;

export default withRouter(ScheduleAppointment)

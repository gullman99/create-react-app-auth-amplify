//This is off by one month dates entered with event(2020, 5, 2) show up in june 2 2020

import React from 'react';
import Header from '../Header';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
//import globalize from 'globalize'

import UserList from '../Admin/UserList'
import events from './events' 
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { API, graphqlOperation } from 'aws-amplify'
import { listEvents as ListEvents } from '../../graphql/queries'
import { listUsers as ListUsers } from '../../graphql/queries'

import { userContext } from '../../context/UserContext'
import { withStyles, createStyles, Typography, CircularProgress } from '@material-ui/core';

const localizer = momentLocalizer(moment)
//const localizer = globalizeLocalizer(globalize)

var sampleData = [
    {
        title: "Fourth of July",
        allDay: true,
        start: new moment("7/4/2020").toDate,
        end: new moment("7/4/2020").toDate
    }
];

const styles = () => createStyles({
    header: {
        textAlign: 'center',
        marginBottom: 30
    },
    tableHeader: {
        fontWeight: 700,
        backgroundColor: '#eaf6ff',
        padding: 8,
        border: 'solid', 
        borderWidth: 1, 
        borderColor: 'lightgray' 
    },
    tableRow: {
        padding: 8,
        border: 'solid', 
        borderWidth: 1, 
        borderColor: 'lightgray'    
    }
});

class Account extends React.Component{
    state = {
        allEvents:[],
        filteredEvents: []
    }

    async  componentDidMount() {
        try {
            this.setState({
                loading: true
            })


            const allEventsResponse = await API.graphql(graphqlOperation(ListEvents))
            let allEvents = allEventsResponse.data.listEvents.items
            let allEventsForCalendar = []

            //Get the events for admins
            for (let i in allEvents) {
                let givenEvent = allEvents[i]
                try {
                    //Get the client
                    var clientResponse = await API.graphql(graphqlOperation(ListUsers, {
                        filter: {
                            id: {
                                eq: givenEvent.client
                            }
                        }
                    }))
                    let client = clientResponse.data.listUsers.items[0]
                    console.log(client, i, "client");

                    //Get the employee
                    var employeeResponse = await API.graphql(graphqlOperation(ListUsers, {
                        filter: {
                            id: {
                                eq: givenEvent.employee
                            }
                        }
                    }))
                    let employee = employeeResponse.data.listUsers.items[0];

                    //Be more descriptive since it's for the admin
                    let event = {
                        title: "Client " + client.firstName + " " + client.lastName + " is meeting with employee " + employee.firstName + " " + employee.lastName, 
                        start: moment(givenEvent.date + " " + givenEvent.startTime).toDate(),
                        end: moment(givenEvent.date + " " + givenEvent.endTime).toDate(),
                    }
        
                    allEventsForCalendar.push(event)

                }
                catch(error)  {
                    console.log("failed allEventData query", givenEvent, error)
                }

            }
            
            //Get the events for clients and employeess
            let filteredEventsResponse;
            if (this.context.type === 'employee') {
                filteredEventsResponse = await API.graphql(graphqlOperation(ListEvents, {
                    filter: {
                        employee: {
                            eq: this.context.id
                        }
                    }
                }))
            } else {
                filteredEventsResponse = await API.graphql(graphqlOperation(ListEvents, {
                    filter: {
                        client: {
                            eq: this.context.id
                        }
                    }
                }))
            }
            let filteredEvents = filteredEventsResponse.data.listEvents.items
            let filteredEventsForCalendar = []

            for (let i in filteredEvents) {
                let givenEvent = filteredEvents[i]
                try {
                    //Get the client
                    var clientResponse = await API.graphql(graphqlOperation(ListUsers, {
                        filter: {
                            id: {
                                eq: givenEvent.client
                            }
                        }
                    }))
                    let client = clientResponse.data.listUsers.items[0]
                    console.log(client, i, "client");

                    //Get the employee
                    var employeeResponse = await API.graphql(graphqlOperation(ListUsers, {
                        filter: {
                            id: {
                                eq: givenEvent.employee
                            }
                        }
                    }))
                    let employee = employeeResponse.data.listUsers.items[0];

                    let event;
                    //Change event title depending if an employee or a client is viewing it
                    if (this.context.type === 'employee') {
                        event = {
                            title: "Meeting with client " + client.firstName  + " " + client.lastName, 
                            start: moment(givenEvent.date + " " + givenEvent.startTime).toDate(),
                            end: moment(givenEvent.date + " " + givenEvent.endTime).toDate(),
                        }
                    } else {
                        event = {
                            title: "Meeting with employee " + employee.firstName + " " + employee.lastName, 
                            start: moment(givenEvent.date + " " + givenEvent.startTime).toDate(),
                            end: moment(givenEvent.date + " " + givenEvent.endTime).toDate(),
                        }
                    }
                    filteredEventsForCalendar.push(event)

                }
                catch(error)  {
                    console.log("Failed to query filtered events", givenEvent, error)
                }
            }
            
            //console.log('EventData:', EventData)
            this.setState({
                allEvents: allEventsForCalendar,
                filteredEvents: filteredEventsForCalendar
            })
        }
        catch (err) {
            console.log('error fetching events...', err)
        }
        finally {
            this.setState({loading: false})
        }
    };

    render(){
        const { classes } = this.props;

        console.log(this.state.filteredEvents , 'filteredEvents')
        console.log(this.state.allEvents, 'all Events')

        return (
            <div  style={{minHeight: '100%', padding: 30}}>

                <Typography variant="h3" className={classes.header}>
                    Calendar of Appointments
                </Typography>

                {this.state.loading ?
                    <div style={{height: 400, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CircularProgress />
                    </div>
                : 
                    <div>
                        <Calendar
                            onSelectEvent={(event, e) => alert(event.title + "\nDate: " + moment(event.start).format('L') + "\nStart time: " + moment(event.start).format('hh:mm a') + "\nEnd time: " + moment(event.end).format('hh:mm a'))}
                            localizer={localizer}
                            events={
                                this.context.type === "admin" && this.state.allEvents.length > 0 ?
                                    this.state.allEvents
                                : this.state.filteredEvents.length > 0 ? //User is client or employee
                                    this.state.filteredEvents
                                :
                                    sampleData
                            }
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                            eventPropGetter={event => ({
                                style: {
                                    backgroundColor: event.color,
                                },
                            })}
                        />
                        {this.state.filteredEvents.length > 0 && (
                            <table style={{marginTop: 40, padding: 20, borderCollapse: 'collapse'}}>
                                <tr>
                                    <th className={classes.tableHeader}>Event</th>
                                    <th className={classes.tableHeader}>Date</th>
                                    <th className={classes.tableHeader}>Start Time</th>
                                    <th className={classes.tableHeader}>End Time</th>
                                </tr>
                                {this.state.filteredEvents && this.state.filteredEvents.length > 0 && this.state.filteredEvents.map((event, index) => (
                                    <tr key={index}>
                                        <td className={classes.tableRow}>{event.title}</td>
                                        <td className={classes.tableRow}>{moment(event.start).format('L')}</td>
                                        <td className={classes.tableRow}>{moment(event.start).format('hh:mm a')}</td>
                                        <td className={classes.tableRow}>{moment(event.end).format('hh:mm a')}</td>
                                    </tr>
                                ))} 
                            </table>
                        )}
                    </div>
                }
            </div>
        )
    }
}

Account.contextType= userContext;


export default withStyles(styles)(Account)
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

var EventData1;
var events1 = [];
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
            this.setState({loading: true})
            
            EventData1 = await API.graphql(graphqlOperation(ListEvents, {
                filter: {
                    client: {
                        eq: this.context.id
                    }
                }
            }))
            events1 = EventData1.data.listEvents.items
            console.log(events1);
            const allEventData = await API.graphql(graphqlOperation(ListEvents))
            
            let eventsForCalendar = []
            let allEventsForCalendar = []

            for (let i in allEventData.data.listEvents.items) {
                let givenEvent = allEventData.data.listEvents.items[i]
                try {
                    var client = await API.graphql(graphqlOperation(ListUsers, {
                        filter: {
                            id: {
                                eq: givenEvent.client
                            }
                        }
                    }))
                    console.log(client, i, "client");

                    var employeeResponse = await API.graphql(graphqlOperation(ListUsers, {
                        filter: {
                            id: {
                                eq: givenEvent.employee
                            }
                        }
                    }))
            
                    let employee = employeeResponse.data.listUsers.items[0];

                    if (client.data.listUsers.items.length == 1) {
                        let event = {
                            title: client.data.listUsers.items[0].firstName + " meeting with " + employee.firstName + " " + employee.lastName, 
                            start: moment(givenEvent.date + " " + givenEvent.startTime).toDate(),
                            end: moment(givenEvent.date + " " + givenEvent.endTime).toDate(),
                        }
                        allEventsForCalendar.push(event)
                    }
                }
                catch(error)  {
                    console.log("failed allEventData query", givenEvent, error)
                }

            }
            
                    
            for (let i in EventData1.data.listEvents.items) {
                let givenEvent = EventData1.data.listEvents.items[i]

                var employeeResponse = await API.graphql(graphqlOperation(ListUsers, {
                    filter: {
                        id: {
                            eq: givenEvent.employee
                        }
                    }
                }))
        
                let employee = employeeResponse.data.listUsers.items[0];

                let event = {
                    title: this.context.firstName + " meeting with " +  employee.firstName + " " + employee.lastName, 
                    start: moment(givenEvent.date + " " + givenEvent.startTime).toDate(),
                    end: moment(givenEvent.date + " " + givenEvent.endTime).toDate(),
                }
                eventsForCalendar.push(event)
            }
            
            //console.log('EventData:', EventData)
            this.setState({
                allEvents: allEventsForCalendar,
                filteredEvents: eventsForCalendar
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

        console.log(events1)
        console.log(this.state.filteredEvents , 'filteredEvents')
        console.log(this.state.allEvents, 'all Events')

        return (
            <div  style={{height: '100%', padding: 30}}>

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
                                {this.state.allEvents && this.state.allEvents.length > 0 && this.state.allEvents.map((event, index) => (
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
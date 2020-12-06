//This is off by one month dates entered with event(2020, 5, 2) show up in june 2 2020

import React from 'react';
import Header from '../Header';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
//import globalize from 'globalize'

import UserList from '../Admin/UserList'
import events from '../Account/events' 
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { API, graphqlOperation } from 'aws-amplify'
import { listEventAvailabilitys as ListEventAvailabilitys, listEvents as ListEvents, } from '../../graphql/queries'
import { userContext } from '../../context/UserContext';
import { CircularProgress, Typography } from '@material-ui/core';

const localizer = momentLocalizer(moment)
//const localizer = globalizeLocalizer(globalize)

var EventData;

class AvailabilityCalendar extends React.Component{
    constructor(props) {
        super();

        this.state = {
            events:[],
            eventsForCalendar: [],
            loading: false
        }

        this.fetchEvents = this.fetchEvents.bind(this);
    }

    async componentDidMount() {
        this.fetchEvents()
    };

    async fetchEvents() {
        try {
            this.setState({
                loading: true
            })
            //EventData1 = await API.graphql(graphqlOperation(ListEvents))
            EventData = await API.graphql(graphqlOperation(ListEventAvailabilitys, {
                filter: {
                    employeeId: {
                        eq: this.context.id
                    }
                }
            }))

            var events = EventData.data.listEventAvailabilitys.items
            console.log("events1", events);
            
            
            let eventsForCalendar = []

            for (let i in events) {
                let givenEvent = events[i]
                console.log("employee id is ", givenEvent.employeeId)
                let eventResponse = await API.graphql(graphqlOperation(ListEvents, {
                    filter: {
                        employee: {
                            eq: givenEvent.employeeId
                        },
                        date: {
                            eq: givenEvent.date
                        },
                        startTime: {
                            eq: givenEvent.startTime
                        },
                        endTime: {
                            eq: givenEvent.endTime
                        },
                    }
                }))

                let bookedEvents = eventResponse.data.listEvents.items
                let event;

                if (bookedEvents.length === 0)  {
                    event = {
                        title: "Available", 
                        start: moment(givenEvent.date + " " + givenEvent.startTime).toDate(),
                        end: moment(givenEvent.date + " " + givenEvent.endTime).toDate(),
                    }
                } else {
                    event = {
                        title: "Booked (See calendar page for details)", 
                        start: moment(givenEvent.date + " " + givenEvent.startTime).toDate(),
                        end: moment(givenEvent.date + " " + givenEvent.endTime).toDate(),
                    }
                }


                eventsForCalendar.push(event)
            }

            console.log("Events for calendar", eventsForCalendar)
            
            this.setState({
                events: events,
                eventsForCalendar: eventsForCalendar
            })

        } catch (err) {
            console.log('error fetching events...', err)
        } finally {
            this.setState({
                loading: false
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.reloadEvents !== prevProps.reloadEvents) {
          this.fetchEvents()
        }
    }

    render(){

        console.log(this.state.eventsForCalendar , 'eventsForCalendar')
        return (
            <div style={{padding: 30, marginBottom: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {this.state.loading ?
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <CircularProgress />
                    <Typography variant="h6" style={{marginTop: 10}}>
                        Loading availability calendar. Please wait...
                    </Typography>
                </div>
                :
                    <Calendar
                        onSelectEvent={(event, e) => alert(event.title + "\nStart time: " + moment(event.start).format('hh:mm a') + "\n" + "End time: " + moment(event.end).format('hh:mm a'))}
                        localizer={localizer}
                        events={this.state.eventsForCalendar}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ width: '100%', height: 500 }}
                        eventPropGetter={event => ({
                            style: {
                            backgroundColor: event.color,
                            },
                        })}
                    />
                }

            </div>
        )
    }
}
AvailabilityCalendar.contextType= userContext;

// const MyCalendar = props => (


// )



export default AvailabilityCalendar

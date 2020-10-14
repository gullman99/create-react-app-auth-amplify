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
import { listEventAvailabilitys as ListEventAvailabilitys } from '../../graphql/queries'
import { userContext } from '../../context/UserContext';

const localizer = momentLocalizer(moment)
//const localizer = globalizeLocalizer(globalize)

var EventData;

class AvailabilityCalendar extends React.Component{
    state = {
        events:[],
        eventsForCalendar: []
    }

    async  componentDidMount() {
        try {
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
                let event = {
                    title: this.context.firstName + " " + "Available", 
                    start: moment(givenEvent.date + " " + givenEvent.startTime).toDate(),
                    end: moment(givenEvent.date + " " + givenEvent.endTime).toDate(),
                }

                eventsForCalendar.push(event)
            }
            
            this.setState({
                events: events,
                eventsForCalendar: eventsForCalendar
            })

        } catch (err) {
            console.log('error fetching events...', err)
        }
    };

    render(){

        console.log(this.state.eventsForCalendar , 'eventsForCalendar')
        return (
            <div style={{padding: 30}}>
                <Calendar
                    onSelectEvent={(event, e) => alert("Start time: " + moment(event.start).format('hh:mm a') + "\n" + "End time: " + moment(event.end).format('hh:mm a'))}
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
            </div>
        )
    }
}
AvailabilityCalendar.contextType= userContext;

// const MyCalendar = props => (


// )



export default AvailabilityCalendar

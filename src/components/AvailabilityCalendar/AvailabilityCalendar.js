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

var EventData1;
var events1 = [];

class AvailabilityCalendar extends React.Component{
  state = {
    events:[],
    eventsForCalendar: []
  }

  async  componentDidMount() {
    try {
      //EventData1 = await API.graphql(graphqlOperation(ListEvents))
      EventData1 = await API.graphql(graphqlOperation(ListEventAvailabilitys, {
        filter: {
          employee: {
            eq: this.context.id
          }
        }
      }))
      events1 = EventData1.data.listEvents.items
      console.log(events1);
      const EventData = await API.graphql(graphqlOperation(ListEventAvailabilitys))
      
      let eventsForCalendar = []

      for (let i in EventData1.data.listEvents.items) {
        	let givenEvent = EventData1.data.listEvents.items[i]
           let event = {
              title: this.context.firstName + "available", 
              start: moment(givenEvent.date + " " + givenEvent.startTime).toDate(),
              end: moment(givenEvent.date + " " + givenEvent.endTime).toDate(),
            }
           eventsForCalendar.push(event)
      }
      
      //console.log('EventData:', EventData)
      this.setState({
        events: EventData.data.listEvents.items,
        eventsForCalendar: eventsForCalendar
      })
    } catch (err) {
      console.log('error fetching events...', err)
    }
  };

  render(){
    console.log(events1)
    // let sampleEvents = [{
    //   title: "test", 
    //   start: moment("8/20/2020" + " " + "5:40 pm").toDate(),
    //   end: moment("8/20/2020" + " " + "6:40 pm").toDate(),
    // }]
    // console.log(sampleEvents, 'sampleEvents')
    console.log(this.state.eventsForCalendar , 'eventsForCalendar')
    return(
      <>
        {/* <Header setUser={this.props.setUser}/> */}

        {
          this.state.eventsForCalendar.length > 0 ?
          <Calendar
          localizer={localizer}
          events={this.state.eventsForCalendar}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          eventPropGetter={event => ({
            style: {
              backgroundColor: event.color,
            },
          })}
        />
        :
        null
        }
      {/*<table>
            <tr>
              <th>Client</th>
              <th>Employee</th>
              <th>Service</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Color</th>
        </tr>
        {     
            events1.length > 0 ? 
            <tr>
            <td>{events1[0].client}</td>
            <td>{events1[0].employee}</td>
            <td>{events1[0].service}</td>
            <td>{events1[0].date}</td>
            <td>{events1[0].startTime}</td>
            <td>{events1[0].endTime}</td>
            <td>{events1[0].color}</td>
          </tr>
          :
          null
        }
            
           
            {
              this.state.events.map((event, index) => (

              <tr key={index}>
                <td>{event.client}</td>
                <td>{event.employee}</td>
                <td>{event.service}</td>
                <td>{event.date}</td>
                <td>{event.startTime}</td>
                <td>{event.endTime}</td>
                <td>{event.color}</td>
              </tr>
            ))
            }  
 
        
        </table>
      
  */}
  </>
    )

  }

}
AvailabilityCalendar.contextType= userContext;

// const MyCalendar = props => (


// )



export default AvailabilityCalendar

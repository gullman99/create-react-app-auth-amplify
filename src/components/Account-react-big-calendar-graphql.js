//This is off by one month dates entered with event(2020, 5, 2) show up in june 2 2020

import React from 'react';
import Header from './Header';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
//import globalize from 'globalize'

import UserList from './UserList'
import events from './events' 
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { API, graphqlOperation } from 'aws-amplify'
import { listEvents as ListEvents } from '../graphql/queries'
import { listUsers as ListUsers } from '../graphql/queries'

import { userContext } from './UserContext';



const localizer = momentLocalizer(moment)
//const localizer = globalizeLocalizer(globalize)

var EventData1;
var events1 = [];
var julyFourth = [{
  title: "Fourth of July",
  allDay: true,
  start: new moment("7/4/2020").toDate,
  end: new moment("7/4/2020").toDate

}];

class MyAccount extends React.Component{
  state = {
    allEvents:[],
    filteredEvents: []
  }

  async  componentDidMount() {
    try {
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
        // try{
        //   var clientFirstName = await API.graphql(graphqlOperation(ListUsers, {
        //   filter: {
        //     id: {
        //       eq: givenEvent.client
        //     }
        //   }
        // }))
        let event = {
          title: givenEvent.client + " meeting with " + givenEvent.employee, 
          start: moment(givenEvent.date + " " + givenEvent.startTime).toDate(),
          end: moment(givenEvent.date + " " + givenEvent.endTime).toDate(),
        }
        allEventsForCalendar.push(event)
      //}
      // catch(error){
      //   console.log("failed allEventData query", givenEvent, error)
      // }
      }
      

            
      for (let i in EventData1.data.listEvents.items) {
        	let givenEvent = EventData1.data.listEvents.items[i]
           let event = {
              title: this.context.firstName + " meeting with " + givenEvent.employee, 
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
        {
          (this.context.type === "admin" || this.context.type === "employee") ?
          (this.state.allEvents > 0 ?
            <Calendar
            localizer={localizer}
            events={this.state.allEvents}
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
          <Calendar
          localizer={localizer}
          events={julyFourth}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          eventPropGetter={event => ({
            style: {
              backgroundColor: event.color,
            },
          })}
        />)

        :
          (this.state.filteredEvents.length > 0 ?
          <Calendar
          localizer={localizer}
          events={this.state.filteredEvents}
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
        <Calendar
        localizer={localizer}
        events={julyFourth}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={event => ({
          style: {
            backgroundColor: event.color,
          },
        })}
      />)
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
MyAccount.contextType= userContext;

// const MyCalendar = props => (


// )

const Account = (props) => (
    <>
        <Header setUser={props.setUser}/>
        {//<MyCalendar />
        }
        <MyAccount />
    </>
)


export default Account
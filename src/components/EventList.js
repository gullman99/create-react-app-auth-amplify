import React from 'react';
import Header from './Header';

import { API, graphqlOperation } from 'aws-amplify'
import { listUsers as ListUsers } from '../graphql/queries'
import { listEvents as ListEvents } from '../graphql/queries'


class EventList extends React.Component {

    state = {
        events:[]
    }

   // execute the query in componentDidMount
   async componentDidMount() {
    try {
      const EventData = await API.graphql(graphqlOperation(ListEvents))
      console.log('userData:', EventData)
      this.setState({
        events: EventData.data.listUsers.items
      })
    } catch (err) {
      console.log('error fetching users...', err)
    }
  }
  render() {
    return (
      <>
        <Header setUser={this.props.setUser}/>
        <table>
            <tr>
              <th>Client Id</th>
              <th>Employee</th>
              <th>Service</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Color</th>
        </tr>      
        {
            this.state.events.map((event, index) => (

            <tr key={index}>
              <td>{event.client}</td>
              <td>{event.employee}</td>
              <td>{event.service}</td>
              <td>{event.date}</td>
              <td>{event.startTime}</td>
              <td>{event.endTime}</td>
              <td>{event.service}</td>
            </tr>
          ))
        }
        </table>
      </>
    )
  }
}


export default EventList

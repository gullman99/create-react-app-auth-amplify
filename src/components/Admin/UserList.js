import React from 'react';


import { API, graphqlOperation } from 'aws-amplify'
import { listUsers as ListUsers } from '../../graphql/queries'

class UserList extends React.Component {

    state = {
        users:[]
    }

   // execute the query in componentDidMount
   async componentDidMount() {
    try {
      const UserData = await API.graphql(graphqlOperation(ListUsers))
      console.log('userData:', UserData)
      this.setState({
        users: UserData.data.listUsers.items
      })
    } catch (err) {
      console.log('error fetching users...', err)
    }
  }
  render() {
    return (
      <>
        <table>
            <tr>
              <th>User Type</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Cellphone</th>
              <th>Address</th>
        </tr>      
        {
            this.state.users.map((user, index) => (

            <tr key={index}>
              <td>{user.type}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.cellphone}</td>
              <td>{user.address}</td>
            </tr>
          ))
        }
        </table>
      </>
    )
  }
}

export default UserList

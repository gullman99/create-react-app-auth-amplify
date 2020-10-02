import React from 'react';
import Header from '../Header';
import UserList from './UserList'

const Admin = (props) => (
        <div>
            {/* <Header setUser={props.setUser}/> */}
            <UserList />
        </div>
)


export default Admin
import React from 'react';
import '../../App.css'
import Header from '../Header'
import Login from './Login'


  const Home = (props) => (
    <div style={{height: '100%'}}>
    {/* <Header setUser={props.setUser} />  */}   
      <div class="background-image">
        <div style={{padding: 40}}>
          <h2>"Mary S. - "My caregiver from St. Lorraine</h2>
          <h2>helped me recover from my knee surgery through</h2>
          <h2>personalized workouts and meals.</h2>
          <h2>She was a wonderful support to me</h2>
          <h2>and good company during my recovery.</h2>
          <h2>  Thank you St. Lorraine!"</h2>
        </div>

        <Login setUser={props.setUser}/>
      </div>
    </div>
  );

  //Home.contextType= userContext;


  export default Home;


import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom'
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuLink,
} from "@reach/menu-button";
import "@reach/menu-button/styles.css";

import { userContext } from './UserContext';
import {  API, graphqlOperation, Auth} from 'aws-amplify';



class Header extends React.Component{
  static contextType = userContext;

  async Logout() {
    try {
      const logoutReturn = await Auth.signOut();
      console.log(logoutReturn);
    }
    catch(error){
      console.log('error', error);
    }
    var userState = {
      firstName: 'Account',
      lastName: '',
      id: '',
      type: '',
      email: '',
      password: '',
      cellphone: '',
      address: '',
    }
    this.props.setUser(userState);
  }


  render (){
    return(
    <div>
      <header>
        <div class="row">
          <div class = "column-8-logo">
                <Link to="/"><img src="logo-notext.jpeg" alt="logo" width="50" height="50"></img></Link>
          </div>
          <div class = "column-8">
                <Link to="/contact">Contact Us</Link>
          </div>
          <div class = "column-8">
                <Link to="/about">About Us</Link>
          </div>
          <div class = "column-8">
                <Link to="/services">Services</Link>
          </div>
          <div class = "column-8">
                <Link to="/jobs">Jobs</Link>
          </div>
          <div class = "column-8">
                <Link to="/volunteer">Volunteer</Link>
          </div>
          <div class = "column-8">
              <Menu>
              <MenuButton class="dropbtn">
                {this.context.firstName} <span aria-hidden>▾</span>
              </MenuButton>
                
                {/*() => {
                  switch(this.context.type){
                  case('client'):
                  return(
                  <MenuList>
                      <MenuLink as="a" href="/appointment">
                      Schedule Appointment
                    </MenuLink>
                    <MenuLink as="a" href="/careprovider">
                      Care Provider
                    </MenuLink>
                    <MenuLink onClick={this.Logout} as="a" href="/"> 
                      Log Out
                    </MenuLink>
                  </MenuList>);
                  
                case('employee'):
                  return(
                  <MenuList>
                    <MenuLink as="a" href="/availability">
                    Edit Availibility
                  </MenuLink>
                  <MenuLink as="a" href="/editbio">
                    Edit Bio
                  </MenuLink>
                  <MenuLink onClick={this.Logout} as="a" href="/"> 
                    Log Out
                  </MenuLink>
                </MenuList>);

                case('admin'):
                  return(
                  <MenuList>
                    <MenuLink as="a" href="/manageschedules">
                      Manage Schedules
                    </MenuLink>
                    <MenuLink as="a" href="/admin">
                      Manage Users
                    </MenuLink>
                  </MenuList>);
                default :
                return(
                <MenuList>
                <MenuLink as="a" href="/signup">
                  Sign Up
                </MenuLink>
                <MenuLink as="a" href="/">
                  Log In
                </MenuLink>
                </MenuList>);
                }
                }
              */}
              { (this.context.type ==='client') ? 
                <MenuList>
                <MenuLink as="a" href="/account">
                  Calendar
                </MenuLink>
                  <MenuLink as="a" href="/appointment">
                  Schedule Appointment
                </MenuLink>
                <MenuLink as="a" href="/careprovider">
                  Care Provider
                </MenuLink>
                <MenuLink onClick={this.Logout} as="a" href="/"> 
                  Log Out
                </MenuLink>
                </MenuList>              
                :
              ((this.context.type === 'employee') ?
                <MenuList>
                <MenuLink as="a" href="/account">
                  Calendar
                </MenuLink>  
                <MenuLink as="a" href="/availability">
                Edit Availibility
                </MenuLink>
                <MenuLink as="a" href="/editbio">
                Edit Bio
                </MenuLink>
                <MenuLink onClick={this.Logout} as="a" href="/"> 
                Log Out
                </MenuLink> 
                </MenuList>
              :
              ((this.context.type === 'admin') ?
                <MenuList>
                    <MenuLink as="a" href="/account">
                      Calendar
                    </MenuLink>
                    <MenuLink as="a" href="/admin-events">
                      Manage Schedules
                    </MenuLink>
                    <MenuLink as="a" href="/admin">
                      Manage Users
                    </MenuLink>
                    <MenuLink onClick={this.Logout} as="a" href="/"> 
                      Log Out
                    </MenuLink>
                </MenuList>
              : 
                <MenuList>
                <MenuLink as="a" href="/signup">
                  Sign Up
                </MenuLink>
                <MenuLink as="a" href="/">
                  Log In
                </MenuLink>
                </MenuList>              
              ))
              }
              
            </Menu>        
          </div>
        </div>        
      </header>
    </div>
    );
  }
}

Header.contextType= userContext;




  export default Header
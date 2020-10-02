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

import { userContext } from '../context/UserContext';
import {  API, graphqlOperation, Auth} from 'aws-amplify';
import { Button, Grid } from '@material-ui/core';



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
    <div style={{position: 'relative', zIndex: 1}}>
      <header style={{boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.75)'}}>
        <Grid container justify="center" alignItems="center" style={{padding: 10, paddingLeft: 40, paddingRight: 40}}>
          <Grid item style={{width: 'auto', paddingRight: 20}}>
            <Button>
              <Link to="/">
                <img src="logo-notext.jpeg" alt="logo" width="50" height="50" />
              </Link>
            </Button>
          </Grid>
          <Grid item style={{width: 'auto', padding: 10}}>
            <Button>
              <Link to="/contact" className={"header-link"}>
                Contact Us
              </Link>
            </Button>
          </Grid>
          <Grid item style={{width: 'auto', padding: 10}}>
            <Button>
              <Link to="/about" className={"header-link"}>
                About Us
              </Link>
            </Button>
          </Grid>
          <Grid item style={{width: 'auto', padding: 10}}>
            <Button>
              <Link to="/services" className={"header-link"}>
                Services
              </Link>
            </Button>
          </Grid>
          <Grid item style={{width: 'auto', padding: 10}}>
            <Button>
              <Link to="/jobs" className={"header-link"}>
                Jobs
              </Link>
            </Button>
          </Grid>
          <Grid item style={{width: 'auto', padding: 10}}>
            <Button>
              <Link to="/volunteer" className={"header-link"}>
                Volunteer
              </Link>
            </Button>
          </Grid>
          <Grid item xs container justify="flex-end">
            <Menu >
                <MenuButton className="dropbtn">
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
                  <MenuList class="menuList">
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
                  <MenuList class="menuList">
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
                  <MenuList class="menuList">
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
                  <MenuList class="menuList">
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
          </Grid>
        </Grid>      
      </header>
    </div>
    );
  }
}

Header.contextType= userContext;




  export default Header
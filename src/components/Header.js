import React from 'react'
import '../App.css';
import { Link, withRouter, useLocation } from 'react-router-dom'
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

//Assets
import SpecialFitnessLogo from '../img/special-fitness-logo.png';


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
    const pathname = this.props.location.pathname;
    console.log(pathname)

    return(
    <div style={{position: 'relative', zIndex: 1}}>
      <header style={{boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)'}}>
        <Grid container justify="center" alignItems="center" style={{padding: 10}}>
          <Grid item container justify="center" alignItems="center" style={{width: 1200}}>
            <Grid item xs={3} style={{width: 200, paddingRight: 20}}>
              <Button disabled={pathname === '/'}>
                <Link to="/" style={{height: 'auto'}}>
                  <img src={SpecialFitnessLogo} alt="logo" width="auto" height="50" />
                </Link>
              </Button>
            </Grid>
            <Grid item xs={6} container justify="center" alignItems="center">
              <Grid item style={{width: 'auto', paddingRight: 20, borderRight: 'solid', borderRightWidth: 1, borderColor: 'lightgray'}}>
                <Button disabled={pathname === '/contact'}>
                  <Link to="/contact" className={"header-link"}>
                    Get Started
                  </Link>
                </Button>
              </Grid>
              <Grid item style={{width: 'auto', paddingRight: 20, paddingLeft: 20 , borderRight: 'solid', borderRightWidth: 1, borderColor: 'lightgray'}}>
                <Button>
                  <Link to="/about" className={"header-link"}>
                    Our Passion
                  </Link>
                </Button>
              </Grid>
              <Grid item style={{width: 'auto', paddingRight: 20, paddingLeft: 20, borderRight: 'solid', borderRightWidth: 1, borderColor: 'lightgray'}}>
                <Button>
                  <Link to="/services" className={"header-link"}>
                    Services
                  </Link>
                </Button>
              </Grid>
              <Grid item style={{width: 'auto', paddingLeft: 20}}>
                <Button>
                  <Link to="/jobs" className={"header-link"}>
                    Employment
                  </Link>
                </Button>
              </Grid>
            </Grid>
            
            {/* <Grid item style={{width: 'auto', padding: 10}}>
              <Button>
                <Link to="/volunteer" className={"header-link"}>
                  Volunteer
                </Link>
              </Button>
            </Grid> */}
            <Grid item xs={3} container justify="flex-end">
              <Menu>
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
                      {/* <MenuLink as="a" href="/careprovider">
                        Care Provider
                      </MenuLink> */}
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
                      {/* <MenuLink as="a" href="/editbio">
                      Edit Bio
                      </MenuLink> */}
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
                        <MenuLink as="a" href="/admin">
                          Admin
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
        </Grid>      
      </header>
    </div>
    );
  }
}

Header.contextType= userContext;

export default withRouter(Header)
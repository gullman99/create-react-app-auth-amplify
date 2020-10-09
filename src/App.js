import React from 'react';
import './App.css';
import { Route, Switch, Redirect} from 'react-router-dom'
import { 
  Home, 
  About, 
  Contact, 
  Services, 
  Jobs, 
  Volunteer, 
  Search, 
  SignUp, 
  Account, 
  UserList, 
  Admin, 
  Appointment, 
  EditEventAvailability, 
  AvailabilityCalendar, 
  EventList, Header
 } from './components/index'
import { userContext } from './context/UserContext';
import { API, graphqlOperation, Auth } from 'aws-amplify'
import { listUsers as ListUsers } from './graphql/queries'
import { CircularProgress }  from '@material-ui/core'

//Comment to push
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'Account',
      lastName: '',
      id: '',
      type: '',
      email: '',
      password: '',
      cellphone: '',
      address: '',
      loading: true
        //setUser: this.setUser,
      };


    this.setUser = (user) => {
      this.setState(state => ({
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        type: user.type,
        email: user.email,
        password: user.password,
        cellphone: user.cellphone,
        address: user.address,
      }));
      // console.log('state for app.js file');
      // console.log(this.state);
    };
  }

    componentDidMount() {
      Auth.currentUserInfo()
      .then((response) => {
        if(response && response != null){
          API.graphql(graphqlOperation(ListUsers, {
            filter: {
              email: {
                eq: response.attributes.email
              }
            }
          }))
          .then((responseGraphQL) => {
            console.log('responseGraphQL')
            console.log(responseGraphQL);
            this.setState(responseGraphQL.data.listUsers.items[0]);
            this.setState({loading: false});
          })
          .catch((error) => {
            console.log("error")
            console.log(error)
            this.setState({loading: false});
          })

        }
        else{
          console.log(response) 
          this.setState({loading: false});
        }
      })
      .catch((error) => {
        this.setState({loading: false});           
        console.log("Error") 
        console.log(error)
      })
    
    };
  
    render() {
        return(
            <React.Fragment>
              <userContext.Provider value={this.state}>
                {this.state.loading == true ? 
                    <CircularProgress />
                :
                  <div style={{height: '100%'}}>
                      <Header />
                      <div style={{height: 'calc(100% - 89px', zIndex: 0}}>
                        <Switch>
                            <Route path="/" render={() => <Home setUser={this.setUser}/>} exact />
                            <Route path="/about" component={About} />
                            <Route path="/contact" component={Contact} />
                            <Route path="/services" component={Services} />
                            <Route path="/jobs" component={Jobs} />
                            <Route path="/volunteer" component={Volunteer} />
                            <Route path="/search" component={Search} />
                            <Route path="/signup" render={() => <SignUp setUser={this.setUser}/>} />
                            {//Account page doesn't refresh, so it doesn't need to be changed//
                            }
                            <Route path="/account" render={() => {
                                switch(this.state.type){
                                    case 'client': return <Account setUser={this.setUser}/>;
                                    case 'admin' : return <Account setUser={this.setUser}/>;
                                    case 'employee' : return <Account setUser={this.setUser}/>;
                                    //FOR TESTING
                                    default: return <Account setUser={this.setUser}/>;
                                    //default: return <Redirect to="/" />;
                                }
                            }} />
                            
                            {//<Route path="/userlist" component={UserList} />
                            }
                            
                            <Route path="/admin" render={() => this.state.type === 'admin' ?
                            <Admin setUser={this.setUser}/> : <Redirect to="/" />} />
                            <Route path="/admin-events" render={() => this.state.type === 'admin' ?
                            <EventList setUser={this.setUser}/> : <Redirect to="/" />} />
                            
                        
                        
                            {//<Route path="/admin" render={() => <Admin setUser={this.setUser}/>} />
                            }
                            {//Appointment is refreshing causing bugs
                            }
                            <Route path="/appointment" render={() => {
                                switch(this.state.type){
                                case 'client': return <Appointment setUser={this.setUser}/>;
                                case 'admin' : return <Appointment setUser={this.setUser}/>;
                                case 'employee' : return <Appointment setUser={this.setUser}/>;
                                //FOR TESTING
                                default: return <Appointment setUser={this.setUser}/>;
                                //default: return <Redirect to="/" />;
                                }
                            }} 
                            />

                            {//<Route path="/appointment" render={() => <Appointment setUser={this.setUser}/>} />
                            }
                            {//availability is refreshing causing bugs
                            }
                            <Route path="/availability" render= {() =>
                            //() => (this.state.type === 'employee') ?
                            <EditEventAvailability setUser={this.setUser}/>
                            // : <Redirect to="/" />}
                            }/>
                            <Route path="availability-calendar" render = {() =>
                            <AvailabilityCalendar setUser={this.setUser} />
                            } />
                        </Switch>
                      </div>
                      
                  </div>
                }
              </userContext.Provider>
            </React.Fragment>
        );
    }
}
export default App;
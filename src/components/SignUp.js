import React from 'react';
import Header from './Header';
import SignUpLogic from './SignUpLogic'
import SignUpGraphQL from './Sign Up-graphql'
import { userContext } from './UserContext';

import { render } from '@testing-library/react';

// const SignUp = () => (
//         <div>
//             <Header />
//             <SignUpLogic />
//         </div>
// )
class SignUp extends React.Component {
        // State also contains the updater function so it will    // be passed down into the context provider    

      

    //const SignUp = () => (

    render(){

        
        return(
            <div>
                <Header setUser={this.props.setUser}/>
                <SignUpGraphQL setUser={this.props.setUser} />
            </div>
        );
        }
}


export default SignUp
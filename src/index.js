import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import Amplify from 'aws-amplify'
import config from './aws-exports'
import {createStore} from 'redux'
import {userReducer} from './store/Redux'
import {Provider} from 'react-redux'

//Styles
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';

Amplify.configure(config)

const theme = responsiveFontSizes(createMuiTheme({
  palette: {
      primary: {
          main: "#000000",
      },
      secondary: {
          main: '#11cb5f',
      },
      info: {
          main: '#ffffff',
      },
  },
}));

ReactDOM.render(

  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

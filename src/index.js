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

Amplify.configure(config)

//const store = createStore(userReducer);
//import pg from 'pg'
//import Modal from 'react-modal';
/* const { Client } = require('pg');

const client = new Client({
    user: 'master',
    host: 'stlorrainedb.cumbxkukha4z.us-east-2.rds.amazonaws.com',
    database: 'mydb',
    password: 'Va11eyF0rge',
    port: 5432,
});

client.connect();

client.end(); */

/*SEQUELIZE POSTGRES
const Sequelize = require("sequelize");

const sequelize = new Sequelize('mydb', 'master', 'Va11eyF0rge', {
  host: 'stlorrainedb.cumbxkukha4z.us-east-2.rds.amazonaws.com',
  dialect: 'postgres'
});
*/

ReactDOM.render(

  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

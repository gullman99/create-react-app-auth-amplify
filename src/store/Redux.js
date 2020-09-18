import React from 'react';
import {createStore} from 'redux';
import {useSelector} from 'react-redux'

export const login = (username) => {
    return {
        type: 'LOGIN',
        payload: username
    }

}

export const userReducer = (state = 'Account', action) => {
    switch(action.type){
        case 'LOGIN':
            return action.payload;
        default:
            return state;
    }

}
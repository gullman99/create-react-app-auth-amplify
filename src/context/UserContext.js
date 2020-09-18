import React from 'react';

export const userContext = React.createContext({
    firstName: 'Account',
    lastName: '',
    id: '',
    type: '',
    email: '',
    password: '',
    cellphone: '',
    address: '',
    //setUser:  () => {},
});
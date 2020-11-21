import React from 'react';
import Header from '../Header';
import ScheduleAppointment from './ScheduleAppointment'

const Appointment = (props) => (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100%'}}>
        {/* <Header setUser={props.setUser}/> */}
        <ScheduleAppointment />
    </div>
)

export default Appointment
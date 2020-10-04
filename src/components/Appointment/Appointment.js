import React from 'react';
import Header from '../Header';
import ScheduleAppointment from './ScheduleAppointment'

const Appointment = (props) => (
    <div style={{height: '100%', display: 'grid', placeItems: 'center center'}}>
        {/* <Header setUser={props.setUser}/> */}
        <ScheduleAppointment />
    </div>
)

export default Appointment
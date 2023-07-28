import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import '../styles/appointment.css'
import axios from 'axios'
import { setAppointments } from '../state/appointments'
const Appointments = () => {
    const appointments = useSelector((state) => state.appointments);
    const dispatch = useDispatch();

    const getAppointments=async()=>{
try {
    const response=await axios.get('http://localhost:3000/api/appointments/admin/all',{
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        credentials: "include",
      })
      console.log(response);
    const sortedAppointments= response.data.sort((a, b) => a.id - b.id);
    dispatch(setAppointments(sortedAppointments))
    
} catch (error) {
    console.log('error al obtener las citas',error);
}
}


useEffect(()=>{
    getAppointments()
},[])
  return (
    <>
    <h1>Proximas citas</h1>
    {appointments?.map((appointment,index)=>(
        <Fragment key={index}>
        <div className="card-container">
      <div className="card-image">
        <img src={appointment.property.imgURL?.[0]}alt="Property" />
      </div>
    
      <div className="card-details">
        <div className="date">{appointment.date}</div>
        <div className='date-location'>
                <p className='location'>{`${appointment.property.neighborhood}, ${appointment.property.city}, ${appointment.property.country}.`}</p>
              </div>
        <div className="user-details">
          <p>User:{appointment.user.name} </p>
          <p>Email: {appointment.user.email}</p>
          <p>Phone: {appointment.user.phone}</p>
      
        </div>
        <div className="property-details">
          <p>{appointment.property.statusType==='for_sale'?`En venta`:`En renta`} </p>
       
        </div>
      </div>
    </div>
    </Fragment>
    ))}
    
    </>
  )
}

export default Appointments
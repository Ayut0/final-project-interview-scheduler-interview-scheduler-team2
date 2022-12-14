import "./App.scss";
import React, { useEffect, useState } from "react";
import io from 'socket.io-client';

import DayList from "./components/DayList";
import Appointment from "./components/Appointment";
//import daysData from "./components/__mocks__/days.json";
import appointmentsData from "./components/__mocks__/appointments.json";
import axios from "axios";
//connection to socket
const socket = io.connect('http://localhost:8000');

export default function Application() {
  const [day, setDay] = useState("Monday");
  //const [days, setDays] = useState(daysData);
  const [days, setDays] = useState([]);
  const [appointments, setAppointments] = useState(appointmentsData);
  // const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    axios.get(`/day`).then((res) => {
      // console.log(res.data);
      setDays(res.data);
    });
  }, [appointments]);

  useEffect(() =>{
    const fetchAppointments = async () =>{
      //How to change the date with state? React-router?
      try{
        const res = await axios.get(`/schedule/${day}`);
        const result = res.data;
        // console.log(result);
        setAppointments(result);
      }catch(err){
        console.log(err.message);
      }
    }

    fetchAppointments();
    socket.on('create', (appointment) =>{
      console.log('appointment', appointment);
      // socket.emit("create a new appointment", {appointment});
      bookInterview(appointment.appointment, appointment.interview)
    });

    socket.on('delete', (data) =>{
      console.log(data);
      cancelInterview(data)
    })
  }, [day, appointments]);

  async function bookInterview(id, interview) {
    const studentName = Object.values(interview)[0];
    // console.log(studentName);
    const interviewData = Object.values(interview)[1].id;
    // console.log(interviewData);
    try{
      const res = await axios.get(`/schedule/create/${id}/${interviewData}/${studentName}`);
      console.log('res', res);
    }catch(err){
      console.log(err);
    }
    console.log(id, interview);
    const isEdit = appointments[id].interview;
    setAppointments((prev) => {
      const appointment = {
        ...prev[id],
        interview: { ...interview },
      };
      const appointments = {
        ...prev,
        [id]: appointment,
      };
      return appointments;
    });
    if (!isEdit) {
      setDays((prev) => {
        const updatedDay = {
          ...prev[day],
          spots: prev[day].spots - 1,
        };
        const days = {
          ...prev,
          [day]: updatedDay,
        };
        return days;
      });
    }
  }

  async function cancelInterview(id) {
    try{
      const res = await axios.get(`/schedule/delete/${id}`);
      console.log(res);
    }catch(err){
      console.log(err);
    }
    setAppointments((prev) => {
      const updatedAppointment = {
        ...prev[id],
        interview: null,
      };
      const appointments = {
        ...prev,
        [id]: updatedAppointment,
      };
      return appointments;
    });
    setDays((prev) => {
      const updatedDay = {
        ...prev[day],
        spots: prev[day].spots + 1,
      };
      const days = {
        ...prev,
        [day]: updatedDay,
      };
      return days;
    });


  }
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} value={day} onChange={setDay} />
        </nav>
      </section>
      <section className="schedule">
        {Object.values(appointments).map((appointment) => (
          <Appointment
            key={appointment.id}
            {...appointment}
            bookInterview={(interview) =>{
              bookInterview(appointment.id, interview)
              socket.emit("create a new appointment", {appointment:appointment.id, interview});
            }
            }
            cancelInterview={()=> {
              cancelInterview(appointment.id)
              socket.emit('delete a appointment', appointment.id)
            } }
            value={day}
          />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

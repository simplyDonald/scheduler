import React from "react";

import "components/Application.scss";
import "components/Appointment";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";





export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  

  const dailyAppointments = [...getAppointmentsForDay(state,state.day)];
  

 
  
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {dailyAppointments.map((appointment)=>{
          const interview = getInterview(state, appointment.interview);
          const interviewersArray = getInterviewersForDay(state, state.day);

          return(
            <ul key={appointment.id}>
              <Appointment key={appointment.id} {...appointment} 
              interview={interview} 
              interviewers={interviewersArray}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview} />
              <Appointment key="last"  time="5pm" 
              interview={interview} 
              bookInterview={bookInterview} 
              interviewers={interviewersArray} 
              cancelInterview={cancelInterview} />
            </ul>
          )
            
          
        })}
      </section>
    </main>
  );
}

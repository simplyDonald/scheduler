import {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData(){
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  const updateSpots = ( id, value) => {   
    const updatedState = state.days.map((day) => {       
      if(day.appointments.includes(id)) {  
          day.spots = parseInt(day.spots) + value;   
      }    
      return day
    })     
    return updatedState;   
  };
  


  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ]).then(([days,appointments,interviewers]) => {
      
      setState((prevState)=>{
        
        return {...prevState,days: days.data,appointments: appointments.data, interviewers: interviewers.data}
      })
      
    })

    
  }, []);

  function cancelInterview(id) {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(res=> {
      
      const days = updateSpots(id, -1);
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({...state,appointments,days});
    });
    

  }

  function bookInterview(id, interview) {
    
    return axios.put(`http://localhost:8001/api/appointments/${id}`,{interview})
    .then(res=> {
      const days = updateSpots(id, +1);
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({...state,appointments,days});
    });
    

  }


  return{state,
    setDay,
    bookInterview,
    cancelInterview}
}
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
  
  //finding the available apppointment spots in the state object
  // const updateSpots = (id) =>{
  //   const appointmentsArray = [...state.days.appointments];
  //   console.log(`array apppoint--->`,appointmentsArray);
  //   for (let id of state.days.appointments) {
  //     if(state.appointments[id].interview === null){

  //     }
  //   }
  //   const nullSpots = appointmentsArray.filter((appointmentId)=>{
  //     return state.appointments[appointmentId].interview === null
  //   });
  //   let totalSpots = 5;
  //   let spots = totalSpots - nullSpots.length;
  //   const newState = state.days.map((day)=>{
  //     if(day.appointments.includes(id)){
  //       day.spots = spots;
  //     }
  //   })
  //   console.log(newState);
  // }


  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ]).then(([days,appointments,interviewers]) => {
      // set your states here with the correct values..
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
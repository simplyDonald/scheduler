import {useReducer, useEffect} from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";



export default function useApplicationData(){
  const [state, dispatch] = useReducer(reducer,{
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  
  

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day }
      case SET_APPLICATION_DATA:
        return {...state,days: action.days.data,appointments: action.appointments.data, interviewers: action.interviewers.data}
      case SET_INTERVIEW: {
        const updateSpots = (action) => {   
          let value = action.interview ? -1 : 1 ;
          if (action.mode === "EDIT"){
            value = 0 ;
          }
          const updatedState = state.days.map((day) => {       
            if(day.appointments.includes(action.id)) {  
                return {...day, spots: day.spots + value};
            }    
            return day
          })     
          return updatedState;   
        };
        const days = updateSpots(action);
        const appointment = {
          ...state.appointments[action.id],
          interview: { ...action.interview }
        };
        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        };
        return {...state,appointments,days}
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  

  const setDay = day => dispatch({ type: SET_DAY, day });
  


  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then(([days,appointments,interviewers]) => {
      
      dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers });
      
    })

    
  }, []);

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
    .then(res=> {
      
      dispatch({ type: SET_INTERVIEW, id, interview: null });
    });
    

  }

  function bookInterview(id, interview,mode) {
    
    return axios.put(`/api/appointments/${id}`,{interview})
    .then(res=> {
      dispatch({ type: SET_INTERVIEW, id, interview, mode});
    });
    

  }


  return{state,
    setDay,
    bookInterview,
    cancelInterview}
}
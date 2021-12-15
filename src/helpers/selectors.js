export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let finalArray = [];
  const parsedData = state.days.filter((object)=>{
    return object.name === day;
  })
  if (!parsedData[0]) {
    return [];
  }
  const appointmentArray =  parsedData[0].appointments;
  
  for (let id of appointmentArray) {
    finalArray.push(state.appointments[id]);
  }
  
  return finalArray;
}

export function getInterview(state, interview){
  
  const values = Object.values(state.appointments);
  const cleanArray = [];
  if(!interview){
    return null;
  }
  
  values.forEach((obj)=>{
    if (obj.interview) {
      cleanArray.push(obj);
    } 
  })
  
  const parsedData = cleanArray.filter(obj => {
    return obj.interview.student === interview.student && obj.interview.interviewer === interview.interviewer
  })
  const freshObject = parsedData[0].interview;
  const freshInterviewerId = parsedData[0].interview.interviewer;
  
  return {...freshObject,interviewer: state.interviewers[freshInterviewerId]};

}

export function getInterviewersForDay(state, day) {
  //... returns an array of interviewers for that day
  let finalArray = [];
  const parsedData = state.days.filter((object)=>{
    return object.name === day;
  })
  if (!parsedData[0]) {
    return [];
  }
  const interviewersArray =  parsedData[0].interviewers;
  
  for (let id of interviewersArray) {
    finalArray.push(state.interviewers[id]);
  }
  
  return finalArray;
}

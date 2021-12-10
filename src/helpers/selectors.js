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
import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props){
  function formatText(propInput) {
    const text = propInput ? `Appointment at ${propInput}` : `No Appointments`;
    return text
  }
  return(
    <article className="appointment">
      {formatText(props.time)}
    </article>
  )
}
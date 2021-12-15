import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList(props){
  const {interviewers} = props;
  const parsedData = interviewers.map((int) => {
    return <InterviewerListItem key={int.id}
     selected={props.value === int.id}
     name={int.name} 
     avatar={int.avatar} 
     setInterviewer={()=>props.onChange(int.id)}
     />
  })
  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedData}
      </ul>
    </section>

  );
}
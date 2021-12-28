import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm"
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props){
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const SAVING = "SAVING";
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT"
  const DELETE = "DELETE"

  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id,interview)
    .then(()=>transition(SHOW))
    .catch(e=>{ 
      console.log(e.message)
      transition(ERROR_SAVE, true)
    });
    
  }

  function cancelInterview(id){
    transition(DELETE, true)
    props.cancelInterview(id)
    .then(()=> transition(EMPTY))
    .catch(e=> {
      transition(ERROR_DELETE, true);
      console.log(e.message);
    });
  }

  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === DELETE && <Status message="Deleting..." />}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" 
      onCancel={() => back()} onConfirm={()=> cancelInterview(props.id)}/>}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === ERROR_SAVE && <Error onClose={() => back()} message="Failed to Save" />}
      {mode === ERROR_DELETE && <Error onClose={() => back()} message="Failed to Delete" />}
      {mode === SHOW && (
        <Show
          student={props.interview && props.interview.student}
          interviewer={props.interview.interviewer && props.interview.interviewer.name}
          onDelete={()=>transition(CONFIRM)}
          onEdit={()=>transition(EDIT)} 
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}
      {mode === EDIT && <Form interviewer={props.interview.interviewer.id} student={props.interview.student} interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}

    </article>
  )
}

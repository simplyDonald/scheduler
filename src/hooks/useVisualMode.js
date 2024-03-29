import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace) {
    if(replace){
      return setMode(mode);
    }
    setMode(mode);
    setHistory((prevHistory)=>[...prevHistory,mode]);
  }
  function back() {
  
    const tempHistory = [...history];
    tempHistory.pop();
    setHistory(tempHistory);
    if (tempHistory.length > 1) {
      setMode(tempHistory[tempHistory.length -1]);
    } else{
      setMode(initial);
    }

  }

  return { mode, transition, back};
}

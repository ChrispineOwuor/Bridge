import  { useState } from "react";
import Calendar from "react-calendar";

export default function Calender() {
  const [value, setValue] = useState(new Date());

  function onChange(nextValue) {
    setValue(nextValue);
  }

  return (
    <div className="rounded-lg outline outline-1 bg-slate-300">
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

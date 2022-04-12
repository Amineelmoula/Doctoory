import React, { useState } from "react";
import DoctorData from "../DoctorData/DoctorData";
import DoctorList from "../DoctorList/DoctorList";
import FilterByTitle from "../Filter/Filter";
function Appointment() {
  const [doctors] = useState(DoctorData);
  const [inputText, setInputText] = useState("");
  const [value] = useState(1);

  return (
    <div className="App">
      <div className="filterPart">
        {/* <FilterByTitle inputText={inputText} setInputText={setInputText} /> */}
      </div>
      <div>
        <DoctorList doctors={doctors} inputText={inputText} value={value} />
      </div>
    </div>
  );
}
export default Appointment;

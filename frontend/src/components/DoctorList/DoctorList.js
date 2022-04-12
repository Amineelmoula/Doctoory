import React from "react";
import "./DoctorList.css";
import DoctorCard from "../DoctorCard/DoctorCard";

const DoctorList = ({ doctors, inputText, value }) => {
  return (
    <div className="appointment-section">
      <div className="container ">
        <div className="row" style={{ height: "100vh" }}>
          <div className="col-md-6  align-self-end">
            <div className="calender-area pr-md-5 mr-md-5">
              <h3 className="text-uppercase mb-4 style-color ">
                Make Appointment
              </h3>
            </div>
          </div>

          <div className="doctorList">
            {doctors
              .filter(
                (doctor) =>
                  doctor.name.toUpperCase().includes(inputText.toUpperCase()) &&
                  doctor.rating >= value
              )
              .map((doctor) => (
                <DoctorCard doctor={doctor} key={doctor.id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DoctorList;

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import React from "react";
import AppointmentData from "../components/AppointmentData/AppointmentData";
import Banner from "../components/Banner/Banner";
// import FeaturedService from "../components/FeaturedService/FeaturedService";
const Appointment = () => {
  return (
    <div className="heder-content">
      <Header />
      <Banner />
      <AppointmentData />
      {/* <Footer /> */}
    </div>
  );
};

export default Appointment;

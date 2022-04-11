import React, { useContext, useEffect } from "react";
import { DataContext } from "../../App";
import PatientStatistics from "../../components/Dashboard/PatientStatistics";
import Sidebar from "../../components/Dashboard/Sidebar";
import Statistics from "../../components/Dashboard/Statistics";
import AppointmentDataTable from "../../components/DataTables/AppointmentDataTable";
import DataTable from "../../components/DataTables/DataTable";
import PatientAppointmentPaymentTable from "../../components/DataTables/PatientAppointmentPaymentTable";

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { loggedInUser, allPatients } = useContext(DataContext);
  const patientUser = allPatients.find((ap) => ap.email === loggedInUser.email);

  return (
    <div className="container-fluid row">
      <Sidebar />
      <div
        id="responsive-dashboard"
        className="col-md-10 p-4 pr-5"
        style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}
      >
        <h5>Dashboard</h5>
        {!patientUser ? (
          <>
            <Statistics />
            <DataTable tableName="Recent Appointments">
              <AppointmentDataTable />
            </DataTable>
          </>
        ) : (
          <>
            <PatientStatistics />
            <DataTable tableName="Recent Appointments">
              <PatientAppointmentPaymentTable />
            </DataTable>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

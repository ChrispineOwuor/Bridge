import { Navigate, useParams } from "react-router-dom";
import AdminDashboard from "../pages/Dashboards/AdminDashboard";
import PatientDashboard from "../pages/Dashboards/PatientDashboard";
import DoctorsDshboard from "../pages/Dashboards/DoctorsDshboard";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

export default function DashboardContoller() {
  let { urole } = useParams();
  let { role } = useContext(AuthContext);
  

  if (urole != role) {
    return <Navigate to={`/app/dashboard/${role}`} />;
  }

  return (
    <>
      {urole === "admin" && <AdminDashboard />}
      {urole === "patient" && <PatientDashboard />}
      {urole === "doctor" && <DoctorsDshboard />}
    </>
  );
}

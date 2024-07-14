import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing";
import Layout from "./Layout";
import Alerts from "../pages/Alerts";
import Analytics from "../pages/Analytics";
import Education from "../pages/Education";
import Booking from "../pages/Booking";
import SinglePatientRecords from "../pages/Records/SinglePatientRecords";
import AllPatientRecords from "../pages/Records/AllPatientRecords";
import Appointments from "../pages/Appointments";
import Profile from "../pages/Profile";
import PrivateRoutes from "../Utils/PrivateRoute";
import DashboardContoller from "../Utils/DashboardContoller";
import RouterLinkProvision from "../Utils/RouterLinkProvision";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AllUsersRecods from "../pages/Records/AllUsersRecods";
import RegisterAdmin from "../pages/Auth/RegisterAdmin";
import RegisterDoctor from "../pages/Auth/RegisterDoctor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "auth/login",
    element: <Login />,
  },
  {
    path: "auth/register",
    element: <Register />,
  },
  {
    path: "auth/register/admin",
    element: <RegisterAdmin />,
  },
  {
    path: "auth/register/doctor",
    element: <RegisterDoctor />,
  },
  {
    path: "/app",
    element: (
      <PrivateRoutes>
        <Layout />
      </PrivateRoutes>
    ),
    // for every link we will enclose it with a provisioner
    children: [
      {
        path: "/app/dashboard/:urole",
        element: (
          <PrivateRoutes>
            <DashboardContoller />
          </PrivateRoutes>
        ),
      },
      {
        path: "/app/my-health-records",
        element: (
          <RouterLinkProvision action="patient">
            <SinglePatientRecords />
          </RouterLinkProvision>
        ),
      },
      {
        path: "/app/medical-records",
        element: (
          <RouterLinkProvision action="doctor">
            <AllPatientRecords />
          </RouterLinkProvision>
        ),
      },
      {
        path: "/app/system/records",
        element: (
          <RouterLinkProvision action="admin">
            <AllUsersRecods />
          </RouterLinkProvision>
        ),
      },

      {
        path: "/app/alerts",
        element: <Alerts />,
      },
      {
        path: "/app/educational-content",
        element: (
          <RouterLinkProvision action="patient">
            <Education />
          </RouterLinkProvision>
        ),
      },
      {
        path: "/app/analytics",
        element: (
          <RouterLinkProvision action="admin">
            <Analytics />
          </RouterLinkProvision>
        ),
      },
      {
        path: "/app/booking",
        element: (
          <RouterLinkProvision action="patient">
            <Booking />
          </RouterLinkProvision>
        ),
      },
      {
        path: "/app/doc/appointments",
        element: (
          <RouterLinkProvision action="doctor">
            <Appointments />
          </RouterLinkProvision>
        ),
      },
      {
        path: "/app/pat/appointments",
        element: (
          <RouterLinkProvision action="patient">
            <Appointments />
          </RouterLinkProvision>
        ),
      },
      {
        path: "/app/profile",
        element: <Profile />,
      },
    ],
  },
]);
export default router;

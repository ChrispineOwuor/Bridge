import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import Calender from "../../components/Calender";

export default function DoctorsDashboard() {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState({
    appointments: 0,
    completedAppointments: 0,
    health_records: 0,
    completedHealth_recors: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_KEY}/doctor/dash/data`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex top justify-between">
        <div className="top">
          <h1 className="text-xl font-semibold stick top-8">My Dashboard</h1>
        </div>
      </div>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] ">
        <div className="p-8 gap-4 w-full left grid grid-cols-1 sm:grid-cols-2 ">
          <div className="flex flex-col items-start justify-start p-4 rounded bg-gray-50 h-48 dark:bg-gray-800">
            <p className="font-[500] text-gray-700 dark:text-gray-500 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-8"
              >
                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
              </svg>
            </p>
            <h2 className="text-xl font-bold mb-2">Appointments</h2>
            <p className="font-semibold text-xl text-gray-700 dark:text-gray-500 ">
              Pending : {data.appointments}
            </p>
            <p className="font-semibold text-xl text-gray-700 dark:text-gray-500 ">
              Completed : {data.completedAppointments}
            </p>
            <Link
              to={"/app/doc/appointments"}
              className="bg-gray-500 text-white p-2 rounded"
            >
              View All
            </Link>
          </div>
          <div className="flex flex-col items-start justify-start p-4 rounded bg-gray-50 h-48 dark:bg-gray-800">
            <p className="font-[500] text-gray-700 dark:text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-8"
              >
                <path
                  fillRule="evenodd"
                  d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </p>

            <h2 className="text-xl font-bold mb-2">Health Records</h2>
            <p className="font-semibold text-xl text-gray-700 dark:text-gray-500 ">
              Pending :{data.health_records}
            </p>
            <p className="font-semibold text-xl text-gray-700 dark:text-gray-500 ">
              Closed :    {data.completedHealth_recors}
            </p>
            <Link
              to={"/app/medical-records"}
              className="bg-gray-500 text-white p-2 rounded"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="right w-max ">
          <h1 className="text-xl text-right text-gray-700 mb-10">
            My Calendar
          </h1>
          <Calender />
        </div>
      </div>
    </>
  );
}

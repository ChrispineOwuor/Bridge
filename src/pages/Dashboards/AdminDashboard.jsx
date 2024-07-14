import "react-calendar/dist/Calendar.css";
import Calender from "../../components/Calender";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Contexts/AuthContext";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {token } = useContext(AuthContext)// Replace this with the actual token

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_KEY}/admin/all/system/records`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <>
      <div className="flex top justify-between">
        <div className="top">
          <h1 className="text-xl font-semibold stick top-8">My Dashboard</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] ">
        <div className="p-8 gap-4 w-full left grid grid-cols-1 sm:grid-cols-2 ">
          <div className="flex flex-col items-start justify-start p-3 rounded bg-gray-50 h-48 dark:bg-gray-800">
            <p className="font-[500] text-gray-900 dark:text-gray-500 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-8"
              >
                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
              </svg>
            </p>
            <h2 className="text-xl font-bold mb-2"> System Users</h2>
            <ul className="list-disc ml-4">
              <li className="font-semibold text-xl text-gray-900 dark:text-gray-500 ">
                Patients: {data.patients}
              </li>
              <li className="font-semibold text-xl text-gray-900 dark:text-gray-500 ">
                Doctors: {data.doctors}
              </li>
              <li className="font-semibold text-xl text-gray-900 dark:text-gray-500 ">
                All Users: {data.users}
              </li>
              <li className="font-semibold text-xl text-gray-900 dark:text-gray-500 ">
                System Admins: {data.admins}
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-start justify-start p-4 rounded bg-gray-50 h-48 dark:bg-gray-800">
            <p className="font-[500]  text-gray-900 dark:text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </p>

            <p className="text-2xl text-gray-400 dark:text-gray-500"></p>
            <h2 className="text-xl font-bold mb-2">System Records</h2>
            <ul className="list-disc ml-4">
              <li className="font-semibold text-xl text-gray-900 dark:text-gray-500 ">
                Health Records: {data.recordCounts}
              </li>
              <li className="font-semibold text-xl text-gray-900 dark:text-gray-500 ">
                Appointments: {data.appointments}
              </li>
            </ul>
          </div>
        </div>
        <div className="right w-max ">
          <h1 className="text-xl text-right text-gray-700 mb-10">
            My Calender
          </h1>
          <Calender />
        </div>
      </div>
    </>
  );
}

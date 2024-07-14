import Calender from "../../components/Calender";
import "react-calendar/dist/Calendar.css";
import { useContext, useEffect, useState } from "react";
import BookModal from "../../components/Bookmodal";
import AddRecordModal from "../../components/AddRecordModal";
import { AuthContext } from "../../Contexts/AuthContext";
import axios from "axios";

export default function PatientDashboard () {
  
  let { user } = useContext(AuthContext);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);

  const openBookModal = () => {
    setIsBookModalOpen(!isBookModalOpen);
  };
  const openHealthModal = () => {
    setIsHealthModalOpen(!isHealthModalOpen);
  };
  const closeHealthModal = () => {
    setIsHealthModalOpen(!isHealthModalOpen);
  };
  const closeBookModal = () => {
    setIsBookModalOpen(!isBookModalOpen);
  };
   const [data, setData] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const { token } = useContext(AuthContext);

   useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await axios.get(
           `${import.meta.env.VITE_BACKEND_API_KEY}/patient/dash/data`,
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
     return <div>Loading...</div>;
   }

   if (!data) {
     return <div>No data available</div>;
   }

  return (
    <>
      <div className="flex top justify-between">
        <div className="top">
          <h1 className="text-xl font-semibold stick top-8">
            {user.name}&apos;s Dashboard
          </h1>
        </div>
        <div className="top bg-gray-500 p-2 rounded-lg">
          <h2
            onClick={openHealthModal}
            className=" text-white font-semibold stick top-8 cursor-pointer"
          >
            Add Health Record
          </h2>
          {isHealthModalOpen && (
            <AddRecordModal
              onClose={closeHealthModal}
              isHealthModalOpen={isHealthModalOpen}
              closeHealthModal={closeHealthModal}
            />
          )}
        </div>
      </div>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] ">
        <div className="p-8 gap-4 w-full left grid grid-cols-1 sm:grid-cols-2 ">
          <div className="flex flex-col items-start justify-start p-4 rounded bg-gray-50 h-44 dark:bg-gray-800">
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
            <h2 className="text-xl font-bold mb-2">Health Stats</h2>
            <p className="font-[500] text-gray-900 dark:text-gray-500 ">
              My Appointments:{data.appointments}
            </p>
            <p className="font-[500] text-gray-900 dark:text-gray-500">
              My Records:{data.records}
            </p>
          </div>
          <div className="flex flex-col items-start justify-start p-4 rounded bg-gray-50 h-44 dark:bg-gray-800">
            <p className="font-[500]  text-gray-700 dark:text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-8"
              >
                <path
                  fillRule="evenodd"
                  d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
                  clipRule="evenodd"
                />
                <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" />
              </svg>
            </p>
            <h2 className="text-xl font-bold mb-2">Reminders</h2>
            <ul className="font-[500] text-gray-700 dark:text-gray-500 list-disc ml-4">
              <li>Take prenatal vitamins</li>
              <li>Drink 8 glasses of water</li>
              <li>30 minutes of light exercise</li>
            </ul>

            <p className="font-[500]  text-gray-400 dark:text-gray-500"></p>
          </div>
          <div className="flex flex-col items-start justify-start p-4 rounded bg-gray-50 h-44 dark:bg-gray-800">
            <p className="font-[500]  text-gray-700 dark:text-gray-500">
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
            <h2 className="text-xl font-bold mb-2">Book an Appointment</h2>
            <button
              onClick={openBookModal}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Schedule Now
            </button>
            {isBookModalOpen && (
              <BookModal
                onClose={closeBookModal}
                isBookModalOpen={isBookModalOpen}
                closeBookModal={closeBookModal}
              />
            )}
          </div>
          <div className="flex flex-col items-start justify-start p-4 rounded bg-gray-50 h-44 dark:bg-gray-800">
            <p className="font-[500]  text-gray-900 dark:text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-8"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                  clipRule="evenodd"
                />
              </svg>
            </p>
            <h2 className="text-xl font-bold mb-2">Pregnancy Progress</h2>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gray-500 h-4 rounded-full"
                style={{ width: "50%" }}
              ></div>
            </div>
            <p className="mt-2">Week 20 of 40</p>{" "}
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

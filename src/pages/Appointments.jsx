import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CompleteAppointmentModal from "../components/CompleteAppointmentModal";
import { AuthContext } from "../Contexts/AuthContext";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const { token } = useContext(AuthContext);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_KEY}/doctor/appointments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(response.data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, [token]);

  const closeBookModal = () => {
    setIsBookModalOpen(false);
  };

  const openBookModal = (id) => {
    setSelectedAppointment(id);
    setIsBookModalOpen(true);
  };

  return (
    <>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Patient name
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments &&
              appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {appointment.patient_name}
                  </td>
                  <td className="px-6 py-4">{appointment.status}</td>
                  <td className="px-6 py-4">{appointment.appointment_time}</td>
                  <td className="px-6 py-4">{appointment.appointment_date}</td>
                  <td className="px-6 py-4">
                    <p
                      onClick={() => openBookModal(appointment.id)}
                      className="font-medium cursor-pointer text-blue-600 dark:text-blue-500"
                    >
                      View
                    </p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {isBookModalOpen && (
        <CompleteAppointmentModal
          onClose={closeBookModal}
          isBookModalOpen={isBookModalOpen}
          closeBookModal={closeBookModal}
          selectedAppointment={selectedAppointment}
        />
      )}
    </>
  );
}

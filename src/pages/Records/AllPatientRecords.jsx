import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AddRecommendationModal from "../../components/AddRecommendationModal";
import { AuthContext } from "../../Contexts/AuthContext";

export default function AllPatientRecords() {
  const { role, token } = useContext(AuthContext);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const closeBookModal = () => {
    setIsBookModalOpen(!isBookModalOpen);
  };

  const openBookModal = (id) => {
    setSelectedRecord(id)
    setIsBookModalOpen(!isBookModalOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_KEY}/doctor/all/medical/records`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setRecords(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <div className="flex top justify-between">
        <div className="top">
          <h1 className="text-xl font-semibold stick top-8">All User Records</h1>
        </div>
      </div>{" "}
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Patient name
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Date Created
              </th>
              {role === "doctor" && (
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr
                key={index}
                className="bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {record.name}
                </th>
                <td className="px-6 py-4">{record.type}</td>
                <td className="px-6 py-4">{record.status}</td>
                <td className="px-6 py-4">
                  {new Date(record.created_at).toLocaleDateString()}
                </td>
                {role === "doctor" && (
                  <td className="px-6 py-4">
                    <p
                      onClick={() => openBookModal(record.id)}
                      className="font-medium cursor-pointer text-blue-600 dark:text-blue-500"
                    >
                      Add Recommendation
                    </p>
                  </td>
                )}
              </tr>
            ))}

            {isBookModalOpen && (
              <AddRecommendationModal
                onClose={closeBookModal}
                isBookModalOpen={isBookModalOpen}
                closeBookModal={closeBookModal}
                selectedRecord={selectedRecord}
              />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

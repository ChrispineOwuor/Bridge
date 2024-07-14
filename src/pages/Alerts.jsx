import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";

export default function Alerts() {
  const [name, setName] = useState("");
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_KEY}/doctor/add-symptom`,
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("Symptom added successfully!");
        setName("");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Add Common Pregnancy Symptoms
        </h3>
      </div>
      <form onSubmit={handleSubmit} className="p-4 md:p-5 w-full">
        <div className="col-span-2 mb-4">
          <textarea
            id="description"
            rows="4"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write Symptom here..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Symptom
        </button>
      </form>
    </div>
  );
}

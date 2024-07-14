import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../Contexts/AuthContext";
import DeleteUserModal from "../../components/DeleteUserModal";

export default function AllUsersRecods() {
  const { role ,token} = useContext(AuthContext);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const closeBookModal = () => {
    setIsBookModalOpen(!isBookModalOpen);
  };

  const openBookModal = () => {
    setIsBookModalOpen(!isBookModalOpen);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_KEY}/admin/system/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User name
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Date Created
              </th>
              {role === "admin" && (
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.name}
                </th>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                {role === "admin" && (
                  <td className="px-6 py-4">
                    <p
                      onClick={openBookModal}
                      className="font-medium cursor-pointer text-red-600 dark:text-red-500"
                    >
                      Delete User
                    </p>
                  </td>
                )}
              </tr>
            ))}

            {isBookModalOpen && (
              <DeleteUserModal
                onClose={closeBookModal}
                isBookModalOpen={isBookModalOpen}
                closeBookModal={closeBookModal}
              />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

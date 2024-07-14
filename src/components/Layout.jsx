import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { LayoutProvision } from "../pages/RouteProvisioners/DashboardProvision";
import { AuthContext } from "../Contexts/AuthContext";
import axios from "axios";

export default function Layout() {
  let { role, user } = useContext(AuthContext);

  const links = [
    {
      link: `/app/dashboard/${role}`,
      name: "Dashboard",
      roles: ["doctor", "admin", "patient"],
    },
    {
      link: "/app/my-health-records",
      name: "My Medical records",
      roles: ["patient"],
    },
    {
      link: "/app/medical-records",
      name: "All Medical Records",
      roles: ["doctor"],
    },
    {
      link: "/app/system/records",
      name: "All System Records",
      roles: ["admin"],
    },
    {
      link: "/app/alerts",
      name: "Alerts",
      roles: ["doctor", "admin", "patient"],
    },
    {
      link: "/app/educational-content",
      name: "Educational Content",
      roles: ["patient"],
    },
    {
      link: "/app/analytics",
      name: "Analytics",
      roles: ["admin"],
    },
    {
      link: "/app/doc/appointments",
      name: "Appointments",
      roles: ["doctor"],
    },
    {
      link: "/app/pat/appointments",
      name: "My Appointments",
      roles: ["ppatient"],
    },
  ];
  const { token } = useContext(AuthContext);
  const [logout, setLogout] = useState(false);
  const HandleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_KEY}/auth/logout`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        setLogout(true);
      }
    } catch (error) {
      alert(error.response.data.message);
    }    

  };
  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-screen px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          {user && (
            <div>
              <NavLink
                to="/"
                className="flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap text-xl font-bold">
                  BridgeHealth
                </span>
              </NavLink>
            </div>
          )}
          {logout && <Navigate to={"/"} replace={true} />}

          <ul className="space-y-2 font-medium">
            {links.map((link, index) => {
              return (
                <LayoutProvision
                  key={index}
                  userRole={role}
                  linkRoles={link.roles}
                >
                  <li>
                    <NavLink
                      to={link.link}
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        {link.name}
                      </span>
                      {link.name === "Alerts" && (
                        <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                          4
                        </span>
                      )}
                    </NavLink>
                  </li>
                </LayoutProvision>
              );
            })}
          </ul>
          {user && (
            <div>
              <NavLink
                to="/app/profile"
                className="flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className=" flex-shrink-0 w-8 h-10 text-gray-900 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Hello {user.name}
                </span>
              </NavLink>
            </div>
          )}
          {user && (
            <div onClick={HandleLogout} className="cursor-pointer mt-4">
              <p className="flex items-center p-2 w-full text-white rounded-lg dark:text-white bg-gray-500 group">
                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
              </p>
            </div>
          )}
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <Outlet />
        </div>
      </div>
    </>
  );
}

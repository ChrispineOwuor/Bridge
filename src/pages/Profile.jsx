import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";

export default function Profile() {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_KEY}/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setData(response.data.user[0]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);
  return (
    <div className="w-full px-6 py-6 mx-auto drop-zone loopple-min-height-78vh text-slate-500">
      {/* header */}
      <div
        className="relative flex flex-col flex-auto min-w-0 p-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-slate-100 bg-clip-border mb-4 draggable"
        draggable="true"
      >
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-auto max-w-full px-3">
            <div className="text-base ease-soft-in-out h-16 w-16 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
              <img
                src="https://demos.creative-tim.com/soft-ui-dashboard-tailwind/assets/img/bruce-mars.jpg"
                alt="profile_image"
                className="w-full shadow-soft-sm rounded-xl"
              />
            </div>
          </div>
          <div className="flex-none w-auto max-w-full px-3 my-auto">
            <div className="h-full">
              <h5 className="mb-1">
                {" "}
                {!loading ? data && data.name : "loading"}
              </h5>
            </div>
          </div>
          <div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12"></div>
        </div>
      </div>

      <div className="w-full pb-6 mx-auto removable">
        <div className="flex flex-wrap -mx-3 drop-zone">
          {/* profile information */}
          <div
            className="w-full max-w-full px-3 lg-max:mt-6 xl:w-4/12 mb-4 draggable"
            draggable="true"
          >
            <div className="relative flex flex-col h-max min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                <div className="flex flex-wrap -mx-3">
                  <div className="flex items-center w-full max-w-full shrink-0 md:w-8/12 md:flex-none">
                    <h6 className="mb-0"> Profile Information</h6>
                  </div>
                </div>
              </div>
              <div className="flex-auto ">
                <hr className="h-px my-4 bg-transparent bbg-gradient-to-r from-transparent via-black/40 to-transparent" />
                <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                  <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
                    <strong className="text-slate-700">User Name:</strong>{" "}
                    &nbsp; {!loading ? data && data.name : "loading ..."}
                  </li>

                  <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                    <strong className="text-slate-700">Email:</strong> &nbsp;
                    {!loading ? data && data.email : "loading ..."}
                  </li>
                </ul>
              </div>
            </div>
            {/* update profile info */}
          </div>
          {/* security */}

          {/* profile info */}
        </div>
      </div>
    </div>
  );
}

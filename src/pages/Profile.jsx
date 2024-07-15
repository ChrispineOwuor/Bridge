import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";

export default function Profile() {
  const { token, role } = useContext(AuthContext);
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

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    residence: "",
    phoneNumber: "",
    emergencyContact: "",
    date_of_birth: "",
    blood_type: "",
  });
  useEffect(() => {
    if (data && role === "patient") {
      setFormData({
        email: data.email,
        fullName: data.name,
        residence: data.Patient.residence || "",
        phoneNumber: data.Patient.phoneNumber || "",
        emergencyContact: data.Patient.emergencyContact || "",
        date_of_birth: data.Patient.date_of_birth || "",
        blood_type: data.Patient.blood_type || "",
      });
    } else if (data && role === "doctor") {
      setFormData({
        email: data.email,
        fullName: data.name,
        phoneNumber: data.doctor.phone_number || "",
      });
    } else if (data && role === "admin") {
      setFormData({
        email: data.email,
        fullName: data.name,
        phoneNumber: data.admin.phone_number || "",
      });
    } else {
      setFormData({
        email: "",
        fullName: "",
      });
    }
  }, [data, role]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelectChange = (e) => {
    setFormData({
      ...formData,
      blood_type: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = { ...formData, name: formData.fullName };

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_API_KEY}/patient/profile/update`,
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        alert("Profile updated successfully!");
      } else {
        alert(
          "Failed to update profile. Please try again." + response.data.message
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "An error occurred while updating the profile. Please try again." +
          error.response.data.message
      );
    }
  };
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

      <div className="w-full pb-6 mx-auto ">
        <div className="flex flex-wrap -mx-3 drop-zone">
          {/* profile information */}
          <div className="w-full max-w-full px-3 lg-max:mt-6 xl:w-4/12 mb-4 draggable">
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
                  {role === "doctor" && (
                    <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                      <strong className="text-slate-700">Phone Number:</strong>{" "}
                      &nbsp;
                      {!loading
                        ? data && data.doctor.phone_number
                        : "loading ..."}
                    </li>
                  )}
                  {role === "admin" && (
                    <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                      <strong className="text-slate-700">Phone Number:</strong>{" "}
                      &nbsp;
                      {!loading
                        ? data && data.admin.phone_number
                        : "loading ..."}
                    </li>
                  )}
                  <>
                    {role === "patient" && (
                      <>
                        <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                          <strong className="text-slate-700">
                            Phone Number:
                          </strong>{" "}
                          &nbsp;
                          {!loading
                            ? data && data.Patient.phoneNumber
                            : "loading ..."}
                        </li>

                        <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                          <strong className="text-slate-700">
                            Emergency Contact :
                          </strong>{" "}
                          &nbsp;
                          {!loading
                            ? data && data.Patient.emergencyContact
                            : "loading ..."}
                        </li>
                        <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                          <strong className="text-slate-700">
                            Residence :
                          </strong>{" "}
                          &nbsp;
                          {!loading
                            ? data && data.Patient.residence
                            : "loading ..."}
                        </li>
                        <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                          <strong className="text-slate-700">
                            Date of birth :
                          </strong>{" "}
                          &nbsp;
                          {!loading
                            ? data && data.Patient.date_of_birth
                            : "loading ..."}
                        </li>
                        <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                          <strong className="text-slate-700">
                            Blood Group :
                          </strong>{" "}
                          &nbsp;
                          {!loading
                            ? data && data.Patient.blood_type
                            : "loading ..."}
                        </li>
                      </>
                    )}
                  </>
                </ul>
              </div>
            </div>
          </div>
          {/* security */}
          <>
            {role === "patient" && (
              <div className="relative flex flex-col h-max min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                  <div className="flex flex-wrap -mx-3">
                    <div className="flex items-center w-full max-w-full shrink-0 md:w-8/12 md:flex-none">
                      <h6 className="mb-0"> Update Profile Information</h6>
                    </div>
                  </div>
                </div>
                <div className="flex-auto ">
                  <hr className="h-px my-4 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
                  <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <label
                        htmlFor="email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Email address
                      </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                      <label
                        htmlFor="fullName"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Full name
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="residence"
                        id="residence"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={formData.residence}
                        onChange={handleChange}
                        required
                      />
                      <label
                        htmlFor="residence"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Residence
                      </label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="tel"
                          name="phoneNumber"
                          id="phoneNumber"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          required
                        />
                        <label
                          htmlFor="phoneNumber"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Phone number
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="tel"
                          name="emergencyContact"
                          id="emergencyContact"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={formData.emergencyContact}
                          onChange={handleChange}
                          required
                        />
                        <label
                          htmlFor="emergencyContact"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Emergency Contact
                        </label>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6 text-gray-500 mb-4">
                      <div className="">
                        <label
                          htmlFor="blood_type"
                          className="block text-sm font-medium leading-6 text-gray-500"
                        >
                          Blood Group
                        </label>
                        <div className="mt-2">
                          <select
                            id="blood_type"
                            name="blood_type       "
                            className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            value={formData.blood_type}
                            onChange={handleSelectChange}
                          >
                            {" "}
                            <option value="">Select blood group</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="AB">AB</option>
                            <option value="O">O</option>
                          </select>
                        </div>
                      </div>
                      <div className="">
                        <label
                          htmlFor="date_of_birth"
                          className="block text-sm font-medium leading-6 text-gray-500"
                        >
                          Date Of Birth
                        </label>
                        <div className="mt-2 text-gray-500 ">
                          <input
                            type="date"
                            name="date_of_birth"
                            id="date_of_birth"
                            className="outline outline-1 rounded-sm w-full outline-gray-500"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            )}
          </>

          {/* profile info */}
        </div>
      </div>
    </div>
  );
}

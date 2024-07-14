import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import axios from "axios";

export default function SinglePatientRecords() {
  const { token } = useContext(AuthContext);
  const [records, setRecords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_KEY}/patient/records`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setRecords(response.data[0].records);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);
  console.log(records);
  return (
    <>
      <div className="top">
        <div className="top">
          <h1 className="text-xl font-semibold stick top-8">
            My Health records
          </h1>
        </div>
      </div>
      <ul>
        {records &&
          records.map((record) => {
            return (
              <li
                key={record.id}
                className="relative px-2 py-8 sm:px-10 border-b-[1px] border-gray-300"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-500">
                    {" "}
                    Type: {record.type}
                  </h3>
                  <p className="inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-3 text-slate-900 ring-1 ring-slate-900/10 hover:ring-slate-900/20">
                    <span>{record.status}</span>
                  </p>
                </div>
                <div className="flex items-start gap-8 text-sm text-slate-600">
                  <div className="lex">
                    <p>Your Symptoms Included</p>
                  </div>
                  {
                    <ul className="li list-disc">
                      <>
                        {record.symptoms &&
                          record.symptoms.map((symptom) => {
                            return <li key={symptom.id}>{symptom.name}</li>;
                          })}
                      </>
                    </ul>
                  }
                </div>
                <h1 className="text-sm leading-6 text-slate-600">
                  Doctors Recommendations
                </h1>
                <p className="mt-3 ml-4 text-sm leading-6 text-slate-600">
                  {record.recommendations.length === 0
                    ? "There are no recommendations"
                    : record.recommendations[0]}
                </p>
              </li>
            );
          })}
      </ul>
    </>
  );
}

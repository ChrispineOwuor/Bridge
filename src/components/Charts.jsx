import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import { AuthContext } from "../Contexts/AuthContext";

const DashboardCharts = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_KEY}/analytics/all/records`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const symptomsData = {
    labels: data.most_common_symptoms.map((symptom) => symptom.name),
    datasets: [
      {
        label: "Most Common Symptoms",
        data: data.most_common_symptoms.map((symptom) => symptom.total),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const ageGroupsData = {
    labels: Object.keys(data.mothers_age_groups),
    datasets: [
      {
        data: Object.values(data.mothers_age_groups),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const healthRecordsData = {
    labels: data.health_records_per_day.map((record) => record.date),
    datasets: [
      {
        label: "Health Records Per Day",
        data: data.health_records_per_day.map((record) => record.total),
        fill: false,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
      },
    ],
  };

  const registeredPerMonthData = {
    labels: Object.keys(data.mothers_registered_per_month),
    datasets: [
      {
        label: "Mothers Registered Per Month",
        data: Object.values(data.mothers_registered_per_month),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const appointmentsPerMonthData = {
    labels: Object.keys(data.appointments_per_month),
    datasets: [
      {
        label: "Appointments Per Month",
        data: Object.values(data.appointments_per_month),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const appointmentsStatusesData = {
    labels: Object.keys(data.appointments_statuses),
    datasets: [
      {
        data: Object.values(data.appointments_statuses),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <div className="dashboard-charts grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="chart-container w-full h-max">
        <h2>Most Common Symptoms</h2>
        <Bar data={symptomsData} />
      </div>
      <div className="chart-container h-max w-full">
        <h2>Health Records Per Day</h2>
        <Line data={healthRecordsData} />
      </div>
      <div className="chart-container h-max w-full">
        <h2>Mothers Registered Per Month</h2>
        <Bar data={registeredPerMonthData} />
      </div>
      <div className="chart-container h-max w-full">
        <h2>Appointments Per Month</h2>
        <Bar data={appointmentsPerMonthData} />
      </div>
      <div className="chart-container h-max w-full">
        <h2>Appointments Statuses</h2>
        <Pie data={appointmentsStatusesData} />
      </div>{" "}
      <div className="chart-container h-max w-full">
        <h2>Mothers Age Groups</h2>
        <Pie data={ageGroupsData} />
      </div>
    </div>
  );
};

export default DashboardCharts;

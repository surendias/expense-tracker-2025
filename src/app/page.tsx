"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import TransactionForm from "@/components/TransactionForm";
import TransactionsList from "@/components/TransactionsList"; // Import the new component

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [activeTab, setActiveTab] = useState("form");
  const [timePeriod, setTimePeriod] = useState("monthly");
  const { isAuthenticated, setAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setAuthenticated(true);
    }
  }, [router, setAuthenticated]);

  const handleSignOut = () => {
    localStorage.removeItem("token"); // Remove token from storage
    router.push("/login"); // Redirect to login page
  };

  const transactions = [
    {
      id: 1,
      amount: 500,
      category: "Food",
      date: "2025-01-01",
      type: "Expense",
      description: "Grocery shopping at Walmart",
    },
    {
      id: 2,
      amount: 2000,
      category: "Salary",
      date: "2025-01-15",
      type: "Income",
      description: "January paycheck",
    },
    // Add more transactions here
  ];

  const totalPages = 3; // Example for pagination

  // Mock data for chart
  const chartData = {
    labels:
      timePeriod === "monthly"
        ? ["Week 1", "Week 2", "Week 3", "Week 4"]
        : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Income",
        data:
          timePeriod === "monthly"
            ? [1000, 1200, 800, 1500]
            : [200, 300, 150, 250, 300, 400, 500],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Expense",
        data:
          timePeriod === "monthly"
            ? [600, 700, 500, 800]
            : [100, 150, 100, 200, 250, 300, 400],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="mb-6 border-b border-gray-200 flex justify-between">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab("form")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "form"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500"
              } border-b-2 focus:outline-none`}
            >
              Transactions Form
            </button>
            <button
              onClick={() => setActiveTab("list")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "list"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500"
              } border-b-2 focus:outline-none`}
            >
              Transactions List
            </button>
            <button
              onClick={() => setActiveTab("summary")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "summary"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500"
              } border-b-2 focus:outline-none`}
            >
              Summary Graph
            </button>
          </nav>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-red-500 text-sm font-medium  hover:bg-red-600 rounded-md hover:text-white focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
          >
            Sign Out
          </button>
        </div>

        {activeTab === "form" && (
          <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
              Transactions Form
            </h1>
            <TransactionForm />
          </div>
        )}

        {activeTab === "list" && <TransactionsList />}

        {activeTab === "summary" && (
          <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
              Transactions Summary
            </h1>
            <div className="mb-4">
              <label
                htmlFor="timePeriod"
                className="block text-sm font-medium text-gray-700"
              >
                Time Period
              </label>
              <select
                id="timePeriod"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            <div>
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: `Transaction Summary - ${
                        timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)
                      }`,
                    },
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

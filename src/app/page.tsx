"use client";
import { useState } from "react";
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
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-4">
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
        </div>

        {activeTab === "form" && (
          <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
              Transactions Form
            </h1>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Amount
                </label>
                <input
                  type="text"
                  id="amount"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter category"
                />
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter description"
                  rows={3}
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <select
                  id="type"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option>Income</option>
                  <option>Expense</option>
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "list" && (
          <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
              Transactions List
            </h1>
            <form className="mb-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="filterCategory"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="filterCategory"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Filter by category"
                  />
                </div>
                <div>
                  <label
                    htmlFor="filterType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Type
                  </label>
                  <select
                    id="filterType"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option>All</option>
                    <option>Income</option>
                    <option>Expense</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Apply Filters
              </button>
            </form>

            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-4 border rounded-md shadow-sm bg-gray-50"
                >
                  <div className="flex justify-between">
                    <h2 className="text-lg font-semibold text-gray-700">
                      {transaction.category}
                    </h2>
                    <span
                      className={`text-sm ${
                        transaction.type === "Income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </div>
                  <p className="text-gray-600">{transaction.description}</p>
                  <div className="text-sm text-gray-500">
                    {transaction.date} - {transaction.amount}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md text-sm font-medium hover:bg-gray-300"
                disabled={true} // Replace with logic for pagination
              >
                Previous
              </button>
              <span className="text-sm text-gray-500">
                Page 1 of {totalPages}
              </span>
              <button
                className="px-4 py-2 bg-gray-200 rounded-md text-sm font-medium hover:bg-gray-300"
                disabled={false} // Replace with logic for pagination
              >
                Next
              </button>
            </div>
          </div>
        )}

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

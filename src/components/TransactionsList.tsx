import React, { useState, useEffect } from "react";

interface Transaction {
  id: number;
  amount: number;
  category: { name: string };
  date: string;
  type: string;
  description: string;
}

const TransactionsList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch transactions from the API
  const fetchTransactions = async () => {
    setLoading(true);
    setError("");

    try {
      // Ensure the `type` parameter is valid or undefined
      const url = `/api/transactions?category=${filterCategory}&type=${
        filterType === "Income" || filterType === "Expense" ? filterType : ""
      }&page=${page}&pageSize=${pageSize}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch transactions.");
      }
      const data = await response.json();
      setTransactions(data.transactions);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching transactions."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch transactions when filters or pagination change
  useEffect(() => {
    fetchTransactions();
  }, [filterCategory, filterType, page, pageSize]);

  const handleFilterCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterCategory(e.target.value);
    setPage(1); // Reset to the first page when filters change
  };

  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
    setPage(1); // Reset to the first page when filters change
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading) {
    return <p>Loading transactions...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  return (
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
              value={filterCategory}
              onChange={handleFilterCategoryChange}
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
              value={filterType}
              onChange={handleFilterTypeChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
        </div>
      </form>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="p-4 border rounded-md shadow-sm bg-gray-50"
          >
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold text-gray-700">
                {transaction.category.name}
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
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
        <span className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded-md text-sm font-medium hover:bg-gray-300"
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsList;

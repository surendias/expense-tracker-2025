import React, { useState } from "react";

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
    type: "Income", // Default value
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, type: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate input
    if (
      !formData.amount ||
      !formData.category ||
      !formData.date ||
      !formData.type
    ) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(formData.amount),
          category: formData.category,
          date: formData.date,
          description: formData.description,
          type: formData.type.toUpperCase(), // Match the enum in Prisma
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save transaction.");
      }

      setSuccess("Transaction saved successfully!");
      setFormData({
        amount: "",
        category: "",
        date: "",
        description: "",
        type: "Income",
      }); // Reset form
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}

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
          value={formData.amount}
          onChange={handleInputChange}
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
          value={formData.category}
          onChange={handleInputChange}
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
          value={formData.date}
          onChange={handleInputChange}
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
          value={formData.description}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter description"
          rows={3}
        ></textarea>
      </div>
      <div>
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700">
            Type
          </legend>
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input
                id="type-income"
                name="type"
                type="radio"
                value="Income"
                checked={formData.type === "Income"}
                onChange={handleTypeChange}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="type-income"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Income
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="type-expense"
                name="type"
                type="radio"
                value="Expense"
                checked={formData.type === "Expense"}
                onChange={handleTypeChange}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="type-expense"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Expense
              </label>
            </div>
          </div>
        </fieldset>
      </div>
      <div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 font-semibold rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 ${
            loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {loading ? "Saving..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;

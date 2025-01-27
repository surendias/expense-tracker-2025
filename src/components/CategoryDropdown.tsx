import React from "react";
import { useCategories } from "@/context/CategoryContext"; // Adjust the import path

interface CategoryDropdownProps {
  value: number | string; // Accepts both number (for form) and string (for filter)
  onChange: (value: number | string) => void; // Handles both number and string
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  value,
  onChange,
}) => {
  const { categories, loading, error } = useCategories(); // Use the context

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange(selectedValue); // Pass the selected value to the parent component
  };

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  return (
    <select
      id="category"
      value={value}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    >
      <option value="">Select a category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategoryDropdown;

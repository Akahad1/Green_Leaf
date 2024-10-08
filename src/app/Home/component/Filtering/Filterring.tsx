import React from "react";

// interface FilterBarProps {
//   selectedCategory: string;
//   onCategoryChange: (category: string) => void;
// }

const FilterBar: React.FC = () => {
  const categories = ["All", "Vegetables", "Flowers", "Herbs", "Fruits"];

  return (
    <div className="flex justify-between items-center w-96 bg-white shadow-md p-4 rounded-lg mb-6">
      <h2 className="text-lg font-semibold">Filter by Category</h2>
      <select
        // value={selectedCategory}
        // onChange={(e) => onCategoryChange(e.target.value)}
        className="select select-bordered w-40"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;

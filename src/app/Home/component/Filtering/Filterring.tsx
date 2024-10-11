// components/SearchFilter.tsx
interface FilterParams {
  name?: string;
  value?: string;
  // Add any other filter parameters here
}
interface SearchFilterProps {
  setParm: React.Dispatch<React.SetStateAction<FilterParams>>;
}
const SearchFilter: React.FC<SearchFilterProps> = ({ setParm }) => {
  return (
    <div className="flex space-x-4 items-center">
      <input
        type="text"
        onChange={(e) => setParm({ name: "search", value: e.target.value })}
        placeholder="Search posts..."
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 lg:w-80"
      />

      <select
        onChange={(e) => setParm({ name: "catagory", value: e.target.value })}
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 lg:w-52 bg-white"
      >
        <option value="">All Categories</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Flowers">Flowers</option>
        <option value="Herbs">Herbs</option>
        <option value="Fruits">Fruits</option>
      </select>
    </div>
  );
};

export default SearchFilter;

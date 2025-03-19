import { Search } from "lucide-react";
import { useState } from "react";

const SearchInput =({ setGlobalFilter }: { setGlobalFilter: (filter: any) => void }) => {
  const [filterValue, setFilerValue]=useState('')
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilerValue(event.target.value);
    setGlobalFilter((prev: any) => ({ ...prev, search: event.target.value }));
  };
    return (
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} /> 
        <input
          type="text"
          value={filterValue}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="w-52 pl-10 pr-4 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>    
    );
  };

export default SearchInput;

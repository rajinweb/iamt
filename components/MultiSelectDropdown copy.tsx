import { useState, useEffect, useRef, useCallback } from "react";
import { Check, X, Search, ChevronDown, Loader } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectDropdownProps {
  asyncUrl?: string; // API endpoint (optional)
  staticOptions?: Option[]; // Static options (optional)
  placeholder?: string;
  debounceTime?: number;
  asyncResponse?:(data:any)=> Option[]
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  asyncUrl,
  staticOptions = [],
  placeholder = "Search...",
  debounceTime = 300,
  asyncResponse
}) => {
  const [selected, setSelected] = useState<Option[]>([]);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<Option[]>(staticOptions);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cacheRef = useRef<Map<string, Option[]>>(new Map());

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchOptions = useCallback ( async (query: string) => {
    if (!asyncUrl || !asyncResponse) return;
    if (cacheRef.current.has(query)) {
        // Use cached data if available
        setOptions(cacheRef.current.get(query)!);
        return;
      }
    setLoading(true);
    try {
      const response = await fetch(`${asyncUrl}${query && '/search?q='+ query}`);

        if(!response.ok){
            if (response.status === 404) {
                console.warn("API returned 404: Not Found");
                setOptions([{ value: "", label: "No results found" }]); // Show message
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        }else{
            const data = await response.json();
            const processedData = asyncResponse(data);
            // Store response in cache
            cacheRef.current.set(query, processedData);
            setOptions(processedData);
        }

    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setLoading(false);
    }
  },[asyncUrl, asyncResponse]);

  const handleSearchChange = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    setSearch(value);
  
    if (asyncUrl) {
      // Debounce API call for better performance
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => fetchOptions(value), debounceTime);
    } else {
      // Filter static options
      setOptions(
        staticOptions.filter((option) =>
          option.label.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };
  useEffect(() => {
     fetchOptions("");
  },[])

  const toggleSelect = (option: Option) => {
    setSelected((prev) =>
      prev.some((s) => s.value === option.value)
        ? prev.filter((s) => s.value !== option.value) // Deselect option
        : [...prev, option] // Select option
    );
  };

  const removeSelected = (option: Option) => {
    setSelected(selected.filter((s) => s.value !== option.value));
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected([]);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Search & Select Field */}
      <div
        className="border border-gray-300 p-2 rounded-md cursor-text flex flex-wrap items-center min-h-[40px] relative gap-1"
        onClick={() => {
            setIsOpen((prev) => {
              const newState = !prev;
              setTimeout(() => {
                const inputElement = dropdownRef.current?.querySelector("input");
                if (newState) {
                  inputElement?.focus();
                } else {
                  inputElement?.blur();
                }
              }, 0);
              return newState;
            });
          }}
      >
  

        {/* Selected Items */}
        <div className="flex flex-grow items-center gap-2 text-gray-400 cursor-pointer ">
           {/* Search Icon (Left) */}
          <Search size={18} className="flex-shrink-0" />

           {/* Input Field for Search */}
            <input
                type="text"
                placeholder={placeholder}
                className="outline-none text-gray-700 w-full"
                value={search}
                onChange={handleSearchChange}
            />

            {/* Clear All Button (Right) */}

            {selected.length > 0 && (
            <X size={18} className=" hover:text-red-500 flex-shrink-0" onClick={clearAll} />
            )}

            {/* Select Arrow (Right) */}
            <ChevronDown size={18}
                className={`flex-shrink-0 transition-transform duration-200 ${ isOpen ? "rotate-180" : "" }`}
            />
        </div>

          {selected.map((item) => (
            <span key={item.value} className="bg-blue-500 text-white px-2 py-1 rounded flex items-center gap-1">
              {item.label}
              <X className="w-4 h-4 cursor-pointer" onClick={(e) => {
                e.stopPropagation();
                removeSelected(item);
              }} />
            </span>
          ))}

      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-md z-10">
          <ul className="max-h-40 overflow-y-auto">
            {loading ? (
              <li className="p-2 text-gray-500 flex items-center">
                <Loader className="w-4 h-4 animate-spin mr-2" /> Loading...
              </li>
            ) : options.length > 0 ? (
              options.map((opt) => (
                <li
                  key={opt.value}
                  className={`p-2 cursor-pointer flex justify-between items-center ${
                    selected.some((s) => s.value === opt.value) ? "bg-blue-100" : "hover:bg-gray-100"
                  }`}
                  onClick={() => toggleSelect(opt)}
                >
                  {opt.label}
                  {selected.some((s) => s.value === opt.value) && <Check className="w-4 h-4 text-blue-600" />}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;

import Dropdown from "../Dropdown";
import { Combine } from "lucide-react";

const GroupedTable = ({ setGlobalFilter }: { setGlobalFilter: (filter: any) => void }) => {
  const options = ["all", "user", "account", "entitlement"];

  const handleViewChange = (value: string) => {
    setGlobalFilter((prev: any) => ({ ...prev, group: value }));
  };

  return (
    <Dropdown Icon={Combine} title="Group view">
      {options.map((option) => (
        <li
          key={option}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer capitalize"
          onClick={() => handleViewChange(option)}
        >
          {option}
        </li>
      ))}
    </Dropdown>
  );
};

export default GroupedTable;

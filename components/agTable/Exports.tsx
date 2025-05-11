import { exportToCSV, exportToJSON, exportToExcel } from "@/utils/utils";
import { Download } from "lucide-react";
import Dropdown from "@/components/Dropdown";

const Exports = ({ gridApi }: { gridApi: any }) => {
  return (
    <Dropdown
      Icon={Download}
      className="w-9 h-9 flex items-center justify-center"
    >
      <li
        onClick={exportToCSV.bind(null, gridApi)}
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
      >
        Export CSV
      </li>
      <li
        onClick={exportToJSON.bind(null, gridApi)}
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
      >
        Export JSON
      </li>
      <li
        onClick={exportToExcel.bind(null, gridApi)}
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
      >
        Export Excel
      </li>
    </Dropdown>
  );
};
export default Exports;

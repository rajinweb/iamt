import { exportToCSV, exportToJSON } from '@/utils/exportUtils';
import { Download } from 'lucide-react';
import Dropdown from '@/components/Dropdown';

const Exports=({ table }: { table: any })=> {

return(
    <Dropdown Icon={Download}>
        <li onClick={() => { exportToCSV(table.getFilteredRowModel().rows); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Export CSV
        </li>
        <li  onClick={() => {
            exportToJSON(table.getFilteredRowModel().rows);  }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Export JSON
        </li>
    </Dropdown>
    )
}
export default Exports
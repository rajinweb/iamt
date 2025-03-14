
import { useState, useEffect } from 'react';
import ActionButtons from './ActionButtons';

const SelectAll = ({ table }: { table: any })=> {

const [selectedRows, setSelectedRows] = useState<any[]>([]);
const [isAllSelected, setIsAllSelected] = useState(false);
const [isIndeterminate, setIsIndeterminate] = useState(false);


  
useEffect(() => {
  const selectedRowCount = table.getFilteredSelectedRowModel().rows.length;
  const totalRowCount = table.getFilteredRowModel().rows.length;

  setSelectedRows(table.getFilteredSelectedRowModel().rows);
  setIsAllSelected(selectedRowCount === totalRowCount && totalRowCount > 0);
  setIsIndeterminate(selectedRowCount > 0 && selectedRowCount < totalRowCount);
}, [table.getFilteredSelectedRowModel().rows.length]);

return (
  <div className="flex items-center">
    <div className='divide-x-1 divide-gray-300 h-9 flex items-center'>
      <label className="text-sm font-medium cursor-pointer pr-4 items-center h-9 flex">
        <input
        type="checkbox"
        checked={isAllSelected}
        ref={(el) => {
          if (el) el.indeterminate = isIndeterminate;
        }}
        onChange={() => {
          table.toggleAllRowsSelected(!isAllSelected);
        }}
        className="mr-2 cursor-pointer"
      />
      Select All
      </label>
      {/* Selected Rows Count */}
      <div className="px-4 text-blue-600 text-sm ">
        {selectedRows.length}  Selected
      </div>
  </div>
  {/* Action Buttons */}
  {selectedRows.length > 0 && table && <ActionButtons  table={table} selectedRows={selectedRows} viewChangeEnable setData={table.setData} />}

</div>

  );
}
export default SelectAll;
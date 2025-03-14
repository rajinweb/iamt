
  import { useState, useEffect } from 'react';
  import ActionButtons from './ActionButtons';
  import IndeterminateCheckbox from './IndeterminateCheckbox';

  const SelectAll = ({ table }: { table: any })=> {

  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  useEffect(() => {
    setSelectedRows(table.getRowModel().rows.filter((row: any) => row.getIsSelected()));
  }, [table.getSelectedRowModel(), table.getRowModel(), table.getState().expanded]);

  return (
    <div className="flex items-center">
      <div className='divide-x-1 divide-gray-300 h-9 flex items-center'>
        <label className="text-sm font-medium cursor-pointer pr-4 items-center h-9 flex">
        <IndeterminateCheckbox checked={table.getIsAllRowsSelected()} 
        indeterminate={ table.getIsSomeRowsSelected()} 
        onChange={ table.getToggleAllRowsSelectedHandler()
        } 
        className='mr-2'/>  Select All
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

'use client';
import { useState, useEffect } from 'react';
import ActionButtons from './ActionButtons';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import { CopyMinus, CopyPlus } from 'lucide-react';

  const SelectAll = ({ table }: { table: any })=> {

  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  useEffect(() => {
    setSelectedRows(
      table.getPaginationRowModel().rows.filter((row: any) => row.getIsSelected())
    );
  }, [table.getSelectedRowModel(), 
    table.getPaginationRowModel(),
    table.getState().expanded, 
    table.getState().pagination]);

  // Function to get all row IDs (including nested ones)
  const getAllRowIds = (rows: any[]): string[] => {
    let ids: string[] = [];
    rows.forEach((row) => {
      ids.push(row.id);
      if (row.subRows?.length) {
        ids = ids.concat(getAllRowIds(row.subRows));
      }
    });
    return ids;
  };

  // Function to check if all rows are expanded
  const areAllRowsExpanded = () => {
    const expandedState = table.getState().expanded;
    const allRowIds = getAllRowIds(table.getRowModel().rows);
    return allRowIds.every((id) => expandedState[id]);
  };
  
  return (
    <div className="flex items-center text-gray-700 text-sm">
      <div className='divide-x-1 divide-gray-300 h-9 flex items-center'>
        
        <button 
          onClick={() => {
            const allExpanded = areAllRowsExpanded();
            const allRowIds = getAllRowIds(table.getPaginationRowModel().rows);
            table.setExpanded(
              allExpanded ? {} : Object.fromEntries(allRowIds.map((id) => [id, true]))
            );       
          }}   
          className='h-9 pr-4 flex items-center gap-1 cursor-pointer'
        >
          {areAllRowsExpanded() ? 
            (<><CopyMinus strokeWidth={1} size={18}/> Collapse All</>) : 
            (<><CopyPlus strokeWidth={1} size={18} /> Expand All</>)}
        </button>

        <label className="cursor-pointer px-4 items-center h-9 flex"> 
        <IndeterminateCheckbox checked={table.getIsAllRowsSelected()} 
        indeterminate={ table.getIsSomeRowsSelected()} 
        onChange={ table.getToggleAllRowsSelectedHandler()
        } 
        className='mr-2'/>  Select All
        </label>
        {/* Selected Rows Count */}
        <div className="px-4 text-blue-600">
          {selectedRows.length}  Selected
        </div>
    </div>
   
    {/* Action Buttons */}
    {selectedRows.length > 0 && table && <ActionButtons  table={table} selectedRows={selectedRows} setData={table.setData} />}

  </div>

    );
  }
  export default SelectAll;
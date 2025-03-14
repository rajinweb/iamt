'use client';

import React, { HTMLProps } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import SelectAll from './SelectAll';
import ColumnSettings from './ColumnSettings';
import Pagination from './Pagination';

import { rowData } from './data';
import { columns } from './columns';


const DataTable = () => {
  const rerender = React.useReducer(() => ({}), {})[1];

 

  const [data, setData] = React.useState(rowData);
  const refreshData = () => setData(rowData.map(row => ({ ...row })));

  const [expanded, setExpanded] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    state: { expanded },
    onExpandedChange: setExpanded,
    getSubRows: row => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
  });

  return (
    <>
      <div className="flex items-center justify-between mb-4 relative z-10">
        <SelectAll table={table} />
        <div className='flex items-center'>
        <Pagination table={table} />  
        <ColumnSettings table={table} />
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto bg-white border border-gray-300 border-b-0 rounded-lg shadow-md">
        <table className="w-full text-sm text-left text-gray-600">
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b border-gray-300 hover:bg-[#E5EEFC] transition">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </>
  );
};


export default DataTable;

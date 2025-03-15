'use client';
import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  flexRender,
} from '@tanstack/react-table';
import SelectAll from './SelectAll';
import ColumnSettings from './ColumnSettings';
import Pagination from './Pagination';

import { rowData } from './data';
import { columns } from './columns';


const DataTable = () => {
  const [data, setData] = React.useState(rowData);
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
      <div className="flex items-center justify-between mb-8 mt-4  relative z-10">
        <SelectAll table={table} />
        <div className='flex items-center'>
        <Pagination table={table} />  
        <ColumnSettings table={table} />
        </div>
      </div>
      {/* Table */}
      <div className="overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-md">
        <table className="w-full text-sm text-left text-gray-600">
          <tbody className='relative'>
            {table.getRowModel().rows.map((row, index, rows) => {
             const parentRow = rows.find((r) => r.id === row.parentId); 
             const isLastInGroup = parentRow && parentRow.subRows[parentRow.subRows.length - 1]?.id === row.id;
             const isFircstInGroup = parentRow && parentRow.subRows[0]?.id === row.id;

              const rowClasses = row.depth === 1 ? `bg-[#F4F5FA] rowLevel_1` : row.depth > 1 ? `bg-[#ECEEF8] rowLevels` : "rowLevel_default";        
              return (
              <tr key={row.id} className={`${rowClasses} ${isLastInGroup ? "group-last-row" : ""} ${isFircstInGroup ? "group-first-row" : ""} hover:bg-[#E5EEFC]`}>
                {row.getVisibleCells().map(cell => {
                  return (
                  <td key={cell.id} className="p-3" style={{width: cell.column.id == 'Actions'? cell.column.getSize() : ''}}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                )}
                )}
              </tr>
            )})}  
          </tbody>  
        </table>
      </div>      
    </>
  );
};


export default DataTable;

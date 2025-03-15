'use client';
import React, { Fragment, useState } from 'react';
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
import GroupPagination from './GroupPagination';

const DataTable = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [parentPagination, setParentPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [subPagination, setSubPagination] = useState<{ [key: string]: { pageIndex: number; pageSize: number } }>({});

  const table = useReactTable({
    data: rowData,
    columns,
    state: { expanded, pagination: parentPagination },
    onExpandedChange: (updaterOrValue) => setExpanded(updaterOrValue as Record<string, boolean>),
    onPaginationChange: setParentPagination,
    getSubRows: (row) => row.subRows || [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <>
      <div className="flex items-center justify-between mb-8 mt-4 relative z-10">
        <SelectAll table={table} />
        <div className="flex items-center">
          <Pagination table={table} />
          <ColumnSettings table={table} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-md">
        <table className="w-full text-sm text-left text-gray-600">
          <tbody className="relative">
            {table.getRowModel().rows.map((row) => {
              if (row.depth > 0) return null; // Prevent looping over subrows at the top level

              const isExpanded = expanded[row.id];

              // Get pagination settings for the subrows
              const rowPagination = subPagination[row.id] || { pageIndex: 0, pageSize: 5 };

              // Paginate only direct children (Depth 1)
              const paginatedSubRows =
                isExpanded && row.subRows
                  ? row.subRows.slice(
                      rowPagination.pageIndex * rowPagination.pageSize,
                      (rowPagination.pageIndex + 1) * rowPagination.pageSize
                    )
                  : [];

              return (
                <Fragment key={row.id}>
                  {/* Main Parent Row */}
                  <tr className={`bg-white hover:bg-[#E5EEFC] level_0`}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-3" style={{width: cell.column.id == 'Actions'? cell.column.getSize() : ''}}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>

                  {/* Render Depth 1 Subrows */}
                  {isExpanded &&
                    paginatedSubRows.map((subRow, subRowIndex) => {
                      const isSubExpanded = expanded[subRow.id];

                      // Get pagination settings for depth 2 subrows
                      const subRowPagination = subPagination[subRow.id] || { pageIndex: 0, pageSize: 5 };

                      // Paginate depth 2+ subrows (only direct children of the subRow)
                      const paginatedNestedSubRows =
                        isSubExpanded && subRow.subRows
                          ? subRow.subRows.slice(
                              subRowPagination.pageIndex * subRowPagination.pageSize,
                              (subRowPagination.pageIndex + 1) * subRowPagination.pageSize
                            )
                          : [];

                      return (
                        <Fragment key={subRow.id}>
                          {/* SubRow Depth 1 */}
                          <tr className={`bg-[#F4F5FA] level_1 ${(paginatedSubRows.length -1) == subRowIndex ? 'group-last-row' : ''} ${subRowIndex==0 ? 'group-first-row' : ''}`}>
                            {subRow.getVisibleCells().map((cell) => (
                              <td key={cell.id} className="p-3" style={{width: cell.column.id == 'Actions'? cell.column.getSize() : ''}}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </td>
                            ))}
                          </tr>

                          {/* Render Depth 2+ Subrows (ONLY ONCE) */}
                          {isSubExpanded &&
                            paginatedNestedSubRows.map((nestedSubRow, nestedSubRowIndex) => (
                              <tr key={nestedSubRow.id}  className={`bg-[#ECEEF8] no_level ${(paginatedNestedSubRows.length -1) == nestedSubRowIndex ? 'group-last-row' : ''} ${nestedSubRowIndex ==0 ? 'group-first-row' : ''}`}>
                                {nestedSubRow.getVisibleCells().map((cell) => (
                                  <td key={cell.id} className="p-3" style={{width: cell.column.id == 'Actions'? cell.column.getSize() : ''}}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                  </td>
                                ))}
                              </tr>
                            ))}

                          {/* Pagination Controls for Depth 2+ */}
                          {isSubExpanded && subRow.subRows && subRow.subRows.length > subRowPagination.pageSize && (
                            <tr className='row-pagination'>
                              <td colSpan={subRow.getAllCells().length} className="p-3">
                                <GroupPagination
                                  table={table}
                                  totalCount={subRow.subRows.length}
                                  pageIndex={subRowPagination.pageIndex}
                                  pageSize={subRowPagination.pageSize}
                                  onPageChange={(newPageIndex: any, newPageSize = subRowPagination.pageSize) =>
                                    setSubPagination({
                                      ...subPagination,
                                      [subRow.id]: { pageIndex: newPageIndex, pageSize: newPageSize },
                                    })
                                  }
                                />
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      );
                    })}

                  {/* Pagination Controls for Depth 1 */}
                  {isExpanded && row.subRows && row.subRows.length > rowPagination.pageSize && (
                    <tr className='row-pagination'>
                      <td colSpan={row.getAllCells().length} className="p-3">
                        <GroupPagination
                          table={table}
                          totalCount={row.subRows.length}
                          pageIndex={rowPagination.pageIndex}
                          pageSize={rowPagination.pageSize}
                          onPageChange={(newPageIndex: any, newPageSize = rowPagination.pageSize) =>
                            setSubPagination({
                              ...subPagination,
                              [row.id]: { pageIndex: newPageIndex, pageSize: newPageSize },
                            })
                          }
                        />
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;

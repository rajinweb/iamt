import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const Pagination = ({ table }: { table: any }) => {
  return (
    <>  
      {/* Showing Row Count */}
      {/* <span className="text-gray-700 text-sm font-medium">
        Showing <strong>{table.getRowModel().rows.length}</strong> Rows
      </span> */}

      {/* Pagination Controls */}
      <div className="flex items-center px-3">
        <button
       onClick={() => table.setPageIndex(0)}
       disabled={!table.getCanPreviousPage()}
       className={`cursor-pointer rounded-sm hover:opacity-80 focus-within:bg-[#6D6E73]/20 disabled:opacity-50`}
      >
      <ChevronsLeft color="#35353A" size="32" className="transform scale-[0.6]" />
      </button>


        <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className={`cursor-pointer rounded-sm hover:opacity-80 focus-within:bg-[#6D6E73]/20 disabled:opacity-50`}
        >
         <ChevronLeft color="#35353A" size="32" className="transform scale-[0.6]" />
   
        </button>

        {/* Page Info */}
        <span className="text-gray-700 text-sm font-medium">
           <strong>{table.getState().pagination.pageIndex + 1}</strong> of {table.getPageCount()}
        </span>

        <button
          className={`cursor-pointer rounded-sm hover:opacity-80 focus-within:bg-[#6D6E73]/20 disabled:opacity-50`}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
           <ChevronRight color="#35353A" size="32" className="transform scale-[0.6]" />

        </button>
        <button
          className={`cursor-pointer rounded-sm hover:opacity-80 focus-within:bg-[#6D6E73]/20 disabled:opacity-50`}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight color="#35353A" size="32" className="transform scale-[0.6]" />
        </button>
     
        <span className="text-gray-700 text-sm px-2">Rows per page:</span>
        <select
          className="border border-gray-300 rounded-md p-1 text-sm"
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Pagination;

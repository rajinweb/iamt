"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface GroupPaginationProps {
  table: any;
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  onPageChange: (pageIndex: number, pageSize?: number) => void;
}

const GroupPagination: React.FC<GroupPaginationProps> = ({ table, totalCount, pageIndex, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="flex items-center justify-between space-x-4 py-2 float-right z-10 relative">
      {/* Page Count Display */}
      <span className="text-gray-700 text-sm">
        Page <strong>{pageIndex + 1}</strong> of {totalPages}
      </span>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(0)}
          disabled={pageIndex === 0}
          className="p-2 rounded-md disabled:opacity-50 hover:bg-gray-100"
        >
          <ChevronsLeft size={18} />
        </button>

        <button
          onClick={() => onPageChange(pageIndex - 1)}
          disabled={pageIndex === 0}
          className="p-2 rounded-md disabled:opacity-50 hover:bg-gray-100"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={() => onPageChange(pageIndex + 1)}
          disabled={(pageIndex + 1) * pageSize >= totalCount}
          className="p-2 rounded-md disabled:opacity-50 hover:bg-gray-100"
        >
          <ChevronRight size={18} />
        </button>

        <button
          onClick={() => onPageChange(totalPages - 1)}
          disabled={pageIndex >= totalPages - 1}
          className="p-2 rounded-md disabled:opacity-50 hover:bg-gray-100"
        >
          <ChevronsRight size={18} />
        </button>
      </div>

      {/* Rows Per Page Dropdown */}
      <div className="flex items-center space-x-2">
        <span className="text-gray-700 text-sm">Rows per page:</span>
        <select
          className="border rounded-md p-1 text-sm"
          value={pageSize}
          onChange={(e) => onPageChange(pageIndex, Number(e.target.value))}
        >
          {[5, 10, 20, 30, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GroupPagination;

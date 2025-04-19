'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GridApi } from 'ag-grid-enterprise';

const CustomPagination = ({ gridApi }: { gridApi: GridApi | null }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowRange, setRowRange] = useState("0 - 0 of 0");

  useEffect(() => {
    if (!gridApi) return;

    const updatePagination = () => {
      const total = gridApi.paginationGetTotalPages();
      const current = gridApi.paginationGetCurrentPage() + 1;
      setTotalPages(total);
      setCurrentPage(current);

      // ✅ Update displayed row range (e.g., "1 - 10 of 52")
      const pageSize = gridApi.paginationGetPageSize();
      const startRow = Math.min(current * pageSize - (pageSize - 1), gridApi.getDisplayedRowCount());
      const endRow = Math.min(current * pageSize, gridApi.getDisplayedRowCount());
      setRowRange(`${startRow} - ${endRow} of ${gridApi.getDisplayedRowCount()}`);
    };

    // ✅ Listen for pagination changes
    gridApi.addEventListener("paginationChanged", updatePagination);
    updatePagination(); // ✅ Initialize on mount

    return () => {
      gridApi.removeEventListener("paginationChanged", updatePagination);
    };
  }, [gridApi]);

  const goToPage = (page: number) => {
    if (!gridApi || page < 1 || page > totalPages) return;
    gridApi.paginationGoToPage(page - 1);
  };

  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-700">{rowRange}</span>
      <div className="flex items-center space-x-2">
        <button
          className={`p-2 ${currentPage === 1 ? "text-gray-400" : "text-blue-600"}`}
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          className={`p-2 ${currentPage === totalPages ? "text-gray-400" : "text-blue-600"}`}
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CustomPagination;

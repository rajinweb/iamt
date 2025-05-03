"use client";

import React, { useState, useEffect, useCallback } from "react";
import { GridApi } from "ag-grid-community";
import { CopyMinus, CopyPlus } from "lucide-react";

interface ExpandCollapseToggleProps {
  gridApi: GridApi | null;
}

const ExpandCollapse: React.FC<ExpandCollapseToggleProps> = ({ gridApi }) => {
  const [allExpanded, setAllExpanded] = useState(false);

  // Check if all master rows are expanded
  const areAllRowsExpanded = useCallback(() => {
    if (!gridApi) return false;

    let hasMasterRows = false;
    let expanded = true;

    gridApi.forEachNode((node) => {
      if (node.master) {
        hasMasterRows = true;
        if (!node.expanded) {
          expanded = false;
        }
      }
    });

    return hasMasterRows && expanded;
  }, [gridApi]);

  // Update initial expanded state on mount or gridApi change
  useEffect(() => {
    if (!gridApi) return;

    const check = areAllRowsExpanded();
    setAllExpanded(check);

    const updateState = () => {
      setAllExpanded(areAllRowsExpanded());
    };

    // Listen for manual expand/collapse or data changes
    gridApi.addEventListener("rowGroupOpened", updateState);
    gridApi.addEventListener("rowDataUpdated", updateState);

    // Clean up listeners
    return () => {
      gridApi.removeEventListener("rowGroupOpened", updateState);
      gridApi.removeEventListener("rowDataUpdated", updateState);
    };
  }, [areAllRowsExpanded, gridApi]);

  // Handle button click
  const toggleExpandCollapse = () => {
    if (!gridApi) return;

    const shouldExpand = !allExpanded;

    gridApi.forEachNode((node) => {
      if (node.master) {
        node.setExpanded(shouldExpand);
      }
    });

    setAllExpanded(shouldExpand);
  };

  return (
    <button
      onClick={toggleExpandCollapse}
      className="h-9 pr-4 flex items-center gap-1 cursor-pointer mr-4 min-w-[115px]"
    >
      {allExpanded ? (
        <>
          <CopyMinus strokeWidth={1} size={18} />
          Collapse All
        </>
      ) : (
        <>
          <CopyPlus strokeWidth={1} size={18} />
          Expand All
        </>
      )}
    </button>
  );
};

export default ExpandCollapse;

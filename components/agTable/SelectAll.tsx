"use client";

import React, { useCallback, useEffect, useState } from "react";
import { GridApi, RowNode } from "ag-grid-community";
import ActionButtons from "./ActionButtons";
import ExpandCollapse from "./ExpandCollapse";

interface SelectAllProps {
  gridApi: GridApi | null;
  detailGridApis: Map<string, GridApi>;
  clearDetailGridApis: () => void;
}

const SelectAll: React.FC<SelectAllProps> = ({
  gridApi,
  detailGridApis,
  clearDetailGridApis,
}) => {
  const [selectedCount, setSelectedCount] = useState(0);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isIndeterminate, setIsIndeterminate] = useState(false);

  const getVisibleTopLevelNodes = useCallback((): RowNode[] => {
    const visible: RowNode[] = [];
    gridApi?.forEachNodeAfterFilter((node) => {
      if (!node.group && !node.footer && node.level === 0) {
        visible.push(node as RowNode);
      }
    });
    return visible;
  }, [gridApi]);

  const updateSelectedCount = useCallback(() => {
    if (!gridApi) return;

    let totalVisible = 0;
    let totalSelected = 0;

    // Top level
    const visibleTopRows = getVisibleTopLevelNodes();
    totalVisible += visibleTopRows.length;
    totalSelected += gridApi
      .getSelectedNodes()
      .filter(
        (node) => (node as RowNode).level === 0 && visibleTopRows.includes(node as RowNode)
      ).length;

    // Detail levels
    detailGridApis.forEach((detailApi) => {
      if (!detailApi) return;

      const visibleRows: RowNode[] = [];
      detailApi.forEachNodeAfterFilter((node) => visibleRows.push(node as RowNode));
      totalVisible += visibleRows.length;
      totalSelected += detailApi.getSelectedNodes().map((node) => node as RowNode).length;
    });

    setSelectedCount(totalSelected);
    setIsAllSelected(totalSelected > 0 && totalSelected === totalVisible);
    setIsIndeterminate(totalSelected > 0 && totalSelected < totalVisible);
  }, [gridApi, detailGridApis, getVisibleTopLevelNodes]);

  const handleToggleSelectAll = () => {
    if (!gridApi) return;

    if (isAllSelected || isIndeterminate) {
      // Deselect all
      gridApi.deselectAll();
      detailGridApis.forEach((api) => api.deselectAll());
    } else {
      // Select all visible
      const visibleTopRows = getVisibleTopLevelNodes();
      visibleTopRows.forEach((node) => node.setSelected(true));

      detailGridApis.forEach((api) => {
        api.forEachNodeAfterFilter((node) => {
          (node as RowNode).setSelected(true);
        });
      });
    }

    updateSelectedCount();
  };

  useEffect(() => {
    if (!gridApi) return;

    gridApi.addEventListener("selectionChanged", updateSelectedCount);
    return () => {
      gridApi.removeEventListener("selectionChanged", updateSelectedCount);
    };
  }, [gridApi, updateSelectedCount]);

  useEffect(() => {
    // Watch detail grid selections
    detailGridApis.forEach((api) => {
      api.addEventListener("selectionChanged", updateSelectedCount);
    });
  }, [detailGridApis, updateSelectedCount]);

  return (
    <div className="flex items-center text-sm">
      <div className="divide-x-1 divide-gray-300 h-9 flex items-center">
        <ExpandCollapse gridApi={gridApi} />

        <label className="font-medium cursor-pointer pr-4 items-center h-9 flex">
          <input
            type="checkbox"
            checked={isAllSelected}
            ref={(el) => {
              if (el) el.indeterminate = isIndeterminate;
            }}
            onChange={handleToggleSelectAll}
            className="mr-2 w-4 h-4 cursor-pointer"
          />
          Select All
        </label>

        <div className="px-4 text-blue-600">{selectedCount} Selected</div>
      </div>

      {selectedCount > 0 && gridApi && (
        <ActionButtons
          api={gridApi}
          selectedRows={[]} // optionally pass selected rows here
          viewChangeEnable
        />
      )}
    </div>
  );
};

export default SelectAll;

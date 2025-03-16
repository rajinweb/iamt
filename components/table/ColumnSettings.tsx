import { useState } from "react";
import { Settings } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import Dropdown from "../Dropdown";

const ColumnSettings = ({ table }: { table: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempColumnsOrder, setTempColumnsOrder] = useState(
    table.getAllColumns().map((col: { id: number; }) => col.id)
  );
  const [tempVisibleColumns, setTempVisibleColumns] = useState(
    table.getAllColumns().filter((col: { getIsVisible: () => void; }) => col.getIsVisible()).map((col: { id: number; }) => col.id)
  );

  // Handle Drag End for Sorting
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tempColumnsOrder.indexOf(active.id);
    const newIndex = tempColumnsOrder.indexOf(over.id);
    setTempColumnsOrder(arrayMove(tempColumnsOrder, oldIndex, newIndex));
  };

  // Toggle Column Visibility
  const toggleColumn = (columnId: string) => {
    setTempVisibleColumns((prev: string[]) =>
      prev.includes(columnId) ? prev.filter((col) => col !== columnId) : [...prev, columnId]
    );
  };

  // Apply Changes
  const applyChanges = () => {
    // Update column order
    table.setColumnOrder(tempColumnsOrder);

    // Update column visibility
    table.getAllColumns().forEach((col: { toggleVisibility: (arg0: any) => void; id: any; }) => {
      col.toggleVisibility(tempVisibleColumns.includes(col.id));
    });

    setIsOpen(false);
  };

  return (
    <Dropdown Icon={Settings} title="Change column settings" menuWidth={230}>
        <h3 className="h-10 flex items-center border-b border-gray-300 font-bold px-3 mb-2">
            Configure Table
          </h3>

          {/* Column Sorting & Visibility */}
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={tempColumnsOrder} strategy={verticalListSortingStrategy}>
              {tempColumnsOrder.map((colId: number) => {
                const col = table.getColumn(colId);
                return col ? (
                  <SortableItem
                  key={colId}
                  field={colId}
                  colId={colId} 
                  table={table} 
                  toggleColumn={toggleColumn}
                  isVisible={tempVisibleColumns.includes(colId)}
                />
                ) : null;
              })}
            </SortableContext>
          </DndContext>

          {/* Action Buttons */}
          <div className="flex justify-between mt-2 py-3 border-t border-gray-300">
            <button className="text-gray-600 px-3 py-2 rounded hover:bg-gray-100 bg-gray-200 cursor-pointer" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button className="bg-[#15274E] text-white px-3 py-2 rounded hover:bg-[#15274E]/80 cursor-pointer" onClick={applyChanges}>
              Apply
            </button>
          </div>
    </Dropdown>
  );
};

export default ColumnSettings;

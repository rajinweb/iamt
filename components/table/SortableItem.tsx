import { useSortable } from "@dnd-kit/sortable";
import { GripVertical, Eye, EyeOff } from "lucide-react";
import { flexRender } from "@tanstack/react-table"; // ✅ Import flexRender

const SortableItem = ({ field, colId, table, toggleColumn, isVisible }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: field });

  const column = table.getColumn(colId);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="flex items-center cursor-pointer hover:bg-gray-100 gap-2 w-full p-2"
      style={{ transform: transform ? `translateY(${transform.y}px)` : undefined, transition }}
    >
      <GripVertical className="w-4 h-4 text-gray-500 cursor-grab" {...listeners} />
      
     {isVisible ? (
        <Eye className="w-4 h-4 text-green-500" onMouseDown={(e:React.MouseEvent) => {
          e.stopPropagation();
          toggleColumn(field)}
        } />
      ) : (
        <EyeOff className="w-4 h-4 text-gray-400" onMouseDown={(e:React.MouseEvent) => {
          e.stopPropagation();
          toggleColumn(field)
        }} />
      )}
       <small>
        {column?.columnDef.header
          ? flexRender(column.columnDef.header, {}) 
          : column?.columnDef.header}
      </small>
    </div>
  );
};

export default SortableItem;

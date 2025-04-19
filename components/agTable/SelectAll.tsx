
import { GridApi } from 'ag-grid-enterprise';
import { useState, useEffect } from 'react';
import ActionButtons from './ActionButtons';
import ExpandCollapse from './ExpandCollapse';

interface SelectAllProps {
  gridApi: GridApi | null;
}
const SelectAll: React.FC<SelectAllProps> = ({ gridApi }) => {

const [selectedRows, setSelectedRows] = useState<any[]>([]);
const [isAllSelected, setIsAllSelected] = useState(false);
const [isIndeterminate, setIsIndeterminate] = useState(false);

const toggleSelectAll = () => {
  if (!gridApi) return null;
  if (isAllSelected) {
    gridApi.deselectAll();
  } else {
    gridApi.selectAll('filtered');
  }
 updateSelectedRows();
};

const updateSelectedRows = () => {
  if (!gridApi) return;
  const selectedNodes = gridApi.getSelectedNodes();
  const totalRows = gridApi.getDisplayedRowCount();
  const selectedCount = selectedNodes.length;

  setSelectedRows(selectedNodes.map((node) => node.data));
  setIsAllSelected(selectedCount === totalRows && totalRows > 0);
  setIsIndeterminate(selectedCount > 0 && selectedCount < totalRows);
};

useEffect(() => {
  if (!gridApi) return;
    gridApi.addEventListener("selectionChanged", updateSelectedRows);
  return () => {
    gridApi.removeEventListener("selectionChanged", updateSelectedRows);
  };
 
}, [gridApi, updateSelectedRows]);
return (
  <div className="flex items-center text-sm">
    <div className='divide-x-1 divide-gray-300 h-9 flex items-center'>
       <ExpandCollapse gridApi={gridApi}/>

      <label className="font-medium cursor-pointer pr-4 items-center h-9 flex">
        <input
        type="checkbox"
        checked={isAllSelected}
        ref={(el) => {
          if (el) el.indeterminate = isIndeterminate;
        }}
        onChange={toggleSelectAll}
        className="mr-2 w-4 h-4 cursor-pointer"
      />
      Select All
      </label>
      {/* Selected Rows Count */}
      <div className="px-4 text-blue-600">
        {selectedRows.length}  Selected
      </div>
  </div>
  {/* Action Buttons */}
  {selectedRows.length > 0 && gridApi && <ActionButtons  api={gridApi} selectedRows={selectedRows} viewChangeEnable />}

</div>

  );
}
export default SelectAll;
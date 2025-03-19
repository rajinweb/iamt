import { CircleCheck, CircleOff, Combine, MoreVertical } from "lucide-react";
import Dropdown from '@/components/Dropdown';
interface ActionButtonsProps {
  table: any;
  selectedRows: any[];
  setData: (updateFn: (oldData: any[]) => any[]) => void; //Update Function for React Table
}

const ActionButtons = ({ table, selectedRows, setData }: ActionButtonsProps) => {

  //Bulk Approve
  const handleApprove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedRows.length === 0) return;

    setData((prevData) =>
      prevData.map((row) =>
        selectedRows.some((selected) => selected.id === row.id) ? { ...row, status: "Approved" } : row
      )
    );
  };

  //Bulk Revoke
  const handleRevoke = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedRows.length === 0) return;

    setData((prevData) =>
      prevData.map((row) =>
        selectedRows.some((selected) => selected.id === row.id) ? { ...row, status: "Revoked" } : row
      )
    );
  };

  //Bulk Comment
  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedRows.length === 0) return;
    alert(`Adding comment for ${selectedRows.length} selected rows`);
  };

  return (
    <div className="flex space-x-4 h-full items-center">
      {/* Approve Button */}
      <button onClick={handleApprove} title="Approve">
        <CircleCheck className="cursor-pointer hover:opacity-80" color="#5C48DF" strokeWidth="1" size="32" />
      </button>

      {/* Revoke Button */}
      <button onClick={handleRevoke} title="Revoke">
        <CircleOff className="cursor-pointer hover:opacity-80 transform rotate-90" color="#FF2D55" strokeWidth="1" size="32" />
      </button>
      
      <button onClick={handleComment} title="Comment">
      <svg width="32" height="32" viewBox="0 0 32 32">
        <path fill="#2684FF" d="M.5 0v19.555h2.88v6.221c0 .177.042.349.12.495.08.147.193.26.324.328a.6.6 0 0 0 .417.05.7.7 0 0 0 .369-.243c1.843-2.283 5.548-6.851 5.548-6.851H24.98V0zm1.44 1.778h21.6v15.999H9.562L4.82 23.63v-5.854H1.94zm2.88 3.555v1.778h11.52V5.333zm21.6 0v1.778h1.44V23.11h-2.88v5.854l-4.742-5.854H9.14L7.7 24.888h11.942s3.705 4.568 5.548 6.85c.1.125.23.21.37.245a.6.6 0 0 0 .416-.05.8.8 0 0 0 .323-.329c.08-.146.121-.318.121-.494v-6.222h2.88V5.333zM4.82 8.888v1.778h5.76V8.888zm0 3.556v1.777h14.4v-1.777z"/>
      </svg>
      </button>

        {/* More Actions Dropdown */}
        <Dropdown Icon={MoreVertical} title="More Actions">
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Proxy</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delegate</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Remediate</li>
      </Dropdown>
    </div>
  );
};

export default ActionButtons;

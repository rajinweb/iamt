import ActionButtons from "@/components/table/ActionButtons";
import IndeterminateCheckbox from "@/components/table/IndeterminateCheckbox";
import { ColumnDef, Row, Table } from "@tanstack/react-table";

// Extend TableMeta to include updateData
declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    updateData?: (data: TData[]) => void;
  }
}
import { Calendar, ChevronDown, ChevronRight, ClipboardList, ListOrdered, RectangleEllipsis, User } from "lucide-react";
type Campaign = {
  id: string; // Add this property
  status: string; // Add this property
  campaignName: string;
  description: string;
  instances: number;
  progress: string;
  expiryDate: string;
  owner: string;
  actions?: string;
};

export const CampaignColumns: ColumnDef<Campaign>[] = [
    {
      accessorKey: 'campaignName',
      header: 'Campaign Name',
      size: 250,
      cell: ({ row, column, getValue }) => {
        const cellText = getValue();
        const headerText = column?.columnDef?.header;
        return (
          <div className="flex items-center space-x-2">
            {row.getCanExpand() ? (
              <button className="text-gray-600 hover:text-gray-900 cursor-pointer" onClick={row.getToggleExpandedHandler()}>
                {row.getIsExpanded() ? <ChevronDown size={20} color="#B9BAC2" /> : <ChevronRight size={20} color="#B9BAC2" />}
              </button>
            ) : (
              <ChevronRight size={20} color="#B9BAC2" />
            )}
  
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
  
            <ClipboardList size={18} strokeWidth={1.5} />
  
            <div className="flex flex-col gap-0">
              <span className="font-semibold text-[#175AE4] text-[12px]">{headerText as string}</span>
              <span className="text-gray-800 font-bold text-[12px]">{cellText as string}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'description',
      header: 'Description',
      size: 300,
      cell: ({ column, getValue }) => {
        const cellText = getValue();
        const headerText = column?.columnDef?.header;
        return (
          <div className="flex flex-col gap-0">
            <span className="font-semibold text-[#175AE4] text-[12px]">{headerText as string}</span>
            <span className="text-gray-800 text-[12px]">{cellText as string}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'instances',
      header: '# of Instances',
      size: 150,
      cell: ({ column, getValue }) => {
        const cellText = getValue();
        const headerText = column?.columnDef?.header;
        return (
          <div className="flex items-center gap-2">
            <ListOrdered size={18} strokeWidth={1.5} />
            <div className="flex flex-col gap-0">
              <span className="font-semibold text-[#175AE4] text-[12px] whitespace-nowrap">{headerText as string}</span>
              <span className="text-gray-800 font-bold">{cellText as string }</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'progress',
      header: 'Progress',
      size: 150,
      cell: ({ column, getValue }) => {
        const cellText = getValue();
        const headerText = column?.columnDef?.header;
        return (
          <div className="flex items-center gap-2">
            <RectangleEllipsis  size={18} strokeWidth={1.5} />
            <div className="flex flex-col gap-0">
              <span className="font-semibold text-[#175AE4] text-[12px]">{headerText as string}</span>
              <span className="text-gray-800 text-[12px]">{cellText as string}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'expiryDate',
      header: 'Expiry Date',
      size: 180,
      cell: ({ column, getValue }) => {
        const cellText = getValue();
        const headerText = column?.columnDef?.header;
        return (
          <div className="flex items-center gap-2">
            <Calendar size={18} strokeWidth={1.5} />
            <div className="flex flex-col gap-0">
              <span className="font-semibold text-[#175AE4] text-[12px]">{headerText as string}</span>
              <span className="text-gray-800 text-[12px]">{cellText as string}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'owner',
      header: 'Owner',
      size: 200,
      cell: ({ column, getValue }) => {
        const cellText = getValue();
        const headerText = column?.columnDef?.header;
        return (
          <div className="flex items-center gap-2">
            <User size={18} strokeWidth={1.5} />
            <div className="flex flex-col gap-0">
              <span className="font-semibold text-[#175AE4] text-[12px]">{headerText as string}</span>
              <span className="text-gray-800 font-bold text-[12px]">{cellText as string}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      size: 200,
      cell: ({ row, table }: { row: Row<Campaign>; table: Table<Campaign> }) => (
        <ActionButtons 
          selectedRows={[row.original]} 
          table={table} 
          setData={(updateFn) => {
            const updatedRows = updateFn(
              table.getRowModel().rows.map((row) => row.original as Campaign)
            ) as Campaign[]; // Ensure the result is cast to Campaign[]
            if (table.options.meta?.updateData) {
              table.options.meta.updateData(updatedRows);
            } else {
              console.warn("updateData is not defined in table meta");
            }
          }}
        />
      ),
    },
  ];
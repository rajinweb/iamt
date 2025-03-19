import { ColumnDef } from "@tanstack/react-table";
import ActionButtons from "./ActionButtons";
import IndeterminateCheckbox from "./IndeterminateCheckbox";
import React from "react";
import { ChevronDown, ChevronRight, MoveUp, User} from "lucide-react";

export const columns: ColumnDef<any>[] = [
      {
      accessorKey: 'user',
      header: 'User', 
      size:150,
      cell: ({ row, column, getValue, table }) => {
        const cellText = getValue();
        const headerText = column?.columnDef?.header;
        const rowDepth = row.depth; 
        return (
          <div className="flex items-center space-x-2">
             {row.getCanExpand() ? (
              <button className="text-gray-600 hover:text-gray-900 cursor-pointer" onClick={row.getToggleExpandedHandler()}>
              {row.getIsExpanded() ?
                 <ChevronDown size={20} color="#B9BAC2" /> : 
                 <ChevronRight size={20} color="#B9BAC2" />}
              </button>
            ) 
            : (
            ' ' // <ChevronRight  size={20} color="#B9BAC2"/>
            )
            }
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            className={`${row.depth >1 && 'ml-1'}`}/>
          
            {rowDepth === 0 ? ( // Parent row
                row.original.avatar ? (
                  <img src={row.original.avatar} width={30} alt="User Avatar" className="rounded-full" />
                ) : (
                  <MoveUp strokeWidth={1} />
                )
              ) : rowDepth === 1 ? ( // First child row
                <MoveUp strokeWidth={1} />
              ) : ( // Subsequent child rows
                <User strokeWidth={1} />
              )}

            <div className="flex flex-col gap-0">
              <span className="font-semibold text-[#175AE4] text-[12px]">{headerText as string}</span>
              <span className="text-gray-800 font-bold">{cellText as string}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "risk",
      header: "Risk",
      size:150,
      cell: ({ column, getValue }) => {
        const cellText = getValue() as keyof typeof riskConfig;
        const headerText = column?.columnDef?.header;
    
        // Define icons & colors based on risk level
        const riskConfig = {
          Critical: { icon: <div className="bg-red-600 w-3 h-3 rounded-full" />, color: "text-red-600" },
          High: { icon: <div className="bg-orange-500 w-3 h-3 rounded-full"  />, color: "text-orange-500" },
          Medium: { icon: <div className="bg-yellow-500 w-3 h-3 rounded-full" />, color: "text-yellow-500" },
          Low: { icon: <div className="bg-green-500 w-3 h-3 rounded-full" />, color: "text-green-500" },
        };
    
        const { icon, color } = riskConfig[cellText as keyof typeof riskConfig] || { icon: null, color: "text-gray-800" };
    
        return (
          <div className="flex flex-col gap-0">
            <span className="font-semibold text-[#175AE4] text-[12px]">{headerText as string}</span>
            <span className="text-gray-800 font-bold" title={cellText as string}>{icon}</span>
            {/* <span className={`font-semibold ${color}`}>{cellText as string}</span> */}
          </div>
        );
      },
    },
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ column, getValue }) => {
        const cellText = getValue();
        const headerText = column?.columnDef?.header;
        return (
            <div className="flex flex-col gap-0">
              <span className="font-semibold text-[#175AE4] text-[12px]">{headerText as string}</span>
              <span className="text-gray-800">{cellText as string}</span>
            </div>  
        );
      } 
    },
    {
      accessorKey: 'jobTitle',
      header: 'Job Title',
      cell: ({ column, getValue }) => {
        const cellText = getValue();
        const headerText = column?.columnDef?.header;
        return (
            <div className="flex flex-col gap-0">
              <span className="font-semibold text-[#175AE4] text-[12px]">{headerText as string}</span>
              <span className="text-gray-800">{cellText as string}</span>
            </div>  
        );
      } 
    },
    {
      accessorKey: 'changeSinceLastReview',
      header: 'Change Since Last Review',
      cell: ({ column, getValue }) => {
        const cellText = getValue();
        const headerText = column?.columnDef?.header;
        return (
            <div className="flex flex-col gap-0">
              <span className="font-semibold text-[#175AE4] text-[12px]">{headerText as string}</span>
              <span className="text-gray-800">{cellText as string}</span>
            </div>  
        );
      } 
    },
    {
      accessorKey: 'aIAssistConfidence',
      header: 'AI Assist Confidence',
      cell: ({ column, getValue }) => {
        const cellText = getValue();
        const headerText = column?.columnDef?.header;
        return (
            <div className="flex flex-col gap-0">
              <span className="font-semibold text-[#175AE4] text-[12px]">{headerText as string}</span>
              <span className="text-gray-800"> {
                cellText=="thumbs-up" ?
                <svg width="21" height="18" viewBox="0 0 21 18" >
                <path fill="#34C759" d="M3.76 7.5V18.76H0V7.5H3.76ZM18.76 6.24C18.9277 6.23138 19.0954 6.25807 19.2522 6.31834C19.409 6.37861 19.5513 6.47112 19.6701 6.58989C19.7889 6.70866 19.8814 6.85103 19.9417 7.00781C20.0019 7.16458 20.0286 7.33226 20.02 7.5V12.16C19.9961 12.3819 19.9353 12.5982 19.84 12.8L17 17.54C16.772 17.9044 16.4571 18.2066 16.0837 18.4195C15.7102 18.6324 15.2898 18.7494 14.86 18.76H7.5C6.83696 18.76 6.20107 18.4966 5.73223 18.0278C5.26339 17.5589 5 16.923 5 16.26V7.12C5.00576 6.55515 5.19531 6.00753 5.54 5.56L10 0C10.3342 0 10.6547 0.13275 10.891 0.369045C11.1273 0.605341 11.26 0.925827 11.26 1.26V6.26L18.76 6.24Z" />
                </svg>
                : 
                <svg width="21" height="19" viewBox="0 0 21 19" fill="none">
                <path fill="#FF2D55" d="M3.76 11.24V0H0V11.26L3.76 11.24ZM18.76 12.5C18.9277 12.5086 19.0954 12.4819 19.2522 12.4217C19.409 12.3614 19.5513 12.2689 19.6701 12.1501C19.7889 12.0313 19.8814 11.889 19.9417 11.7322C20.0019 11.5754 20.0286 11.4077 20.02 11.24V6.58C19.9961 6.35812 19.9353 6.1418 19.84 5.94L17 1.2C16.7678 0.836499 16.4487 0.53649 16.0717 0.327006C15.6946 0.117522 15.2713 0.00514447 14.84 0H7.5C6.83696 0 6.20107 0.263392 5.73223 0.732233C5.26339 1.20107 5 1.83696 5 2.5V11.62C5 12.1933 5.18 12.7133 5.54 13.18L10 18.74C10.3342 18.74 10.6547 18.6073 10.891 18.371C11.1273 18.1347 11.26 17.8142 11.26 17.48V12.48L18.76 12.5Z"/>
                </svg>
                }
              </span>
            </div> 
        );
      } 
    },
    {
      accessorKey: '',
      header: 'Actions',
      size:200,
      cell: ({ row, table }: { row: any; table: any }) => <ActionButtons selectedRows={[row.original]} table={table} setData={table.options.meta?.updateData} />,
    }
  ]
  
 
  
'use client';
import React from "react";
import Tabs from "@/components/tabs";
import {campData} from '@/components/data';
import dynamic from "next/dynamic";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronRight, Calendar, User, ListOrdered, RectangleEllipsis, ClipboardList } from "lucide-react";
  import ActionButtons from "@/components/table/ActionButtons";
import IndeterminateCheckbox from "@/components/table/IndeterminateCheckbox";
const DataTable = dynamic(() => import('@/components/table/DataTable'), { ssr: false });

export const CampaignColumns: ColumnDef<any>[] = [
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
    cell: ({ row, table }: { row: any; table: any }) => (
      <ActionButtons selectedRows={[row.original]} table={table} setData={table.options.meta?.updateData} />
    ),
  },
];


export default function Campaigns() {
  const tabsData = [
    { label: "Active", icon: ChevronDown, iconOff: ChevronRight, component: () => {
            return !campData || campData.length === 0 ? <div>Loading...</div> : <DataTable data={campData} columns={CampaignColumns} filerColumns={['campaignName']} />;
          }
      },
    { label: "Completed", icon: ChevronDown, iconOff: ChevronRight, component: () => <p> Coming Soon...</p> },
    { label: "Template",  icon: ChevronDown, iconOff: ChevronRight, component: () => <p > Coming Soon...</p> }
  ];
  
  return (
    <>
    <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-6 border-b border-gray-300 pb-2 text-blue-950">All Campaigns 
          <p className="font-normal text-sm">Access review campaigns are used to manage the certification of access for your users. to start an access review campaign, click the ‘Create’ button at the top of this page.</p>
        </h1>
      <div>
        <button
            className="bg-[#15274E] text-white p-2 rounded-sm text-sm mt-2 ">
            Create Campaign
          </button>
      </div>
    </div>
    <Tabs tabs={tabsData} 
      activeClass='bg-[#15274E] text-white rounded-sm -ml-1' 
      buttonClass="h-9.5 -mt-1 w-30" 
      className=" ml-0.5 border border-gray-300 w-80 h-8 rounded-md"/>
    </>
  );
}
"use client";

import React, { useRef } from "react";
import Tabs from "@/components/tabs";

import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { AgGridReact } from "ag-grid-react";
import { AgGridReact as AgGridReactType } from "ag-grid-react";
import "@/lib/ag-grid-setup";
import { CampaignColumns } from "./new/CampaignColumns";

/*** dummy data  ***/
const campData = [
  {
    id: 1,
    campaignName: "Quarterly Access Review",
    description:
      "Review user permissions and access levels across departments.",
    instances: 150,
    progress: "75%",
    expiryDate: "2025-04-15",
    owner: "John Doe",
  },
  {
    id: 2,
    campaignName: "Finance Role Audit",
    description:
      "Verify finance department users have appropriate access rights.",
    instances: 75,
    progress: "50%",
    expiryDate: "2025-05-01",
    owner: "Alice Johnson",
  },
  {
    id: 3,
    campaignName: "MFA Compliance Check",
    description:
      "Ensure all employees have enabled Multi-Factor Authentication.",
    instances: 200,
    progress: "90%",
    expiryDate: "2025-03-30",
    owner: "Robert Smith",
  },
  {
    id: 4,
    campaignName: "Privileged Account Review",
    description: "Identify and validate privileged users' access rights.",
    instances: 50,
    progress: "60%",
    expiryDate: "2025-04-10",
    owner: "Emily White",
  },
];
export default function Campaigns() {
  const gridRef = useRef<AgGridReactType>(null);
  const tabsData = [
    {
      label: "Active",
      icon: ChevronDown,
      iconOff: ChevronRight,
      component: () => {
        if (!campData || campData.length === 0) return <div>Loading...</div>;
        return (
          <div className="ag-theme-alpine h-72">
            <AgGridReact
              ref={gridRef}
              rowData={campData}
              columnDefs={CampaignColumns}
              rowSelection="multiple"
              context={{ gridRef }}
              rowModelType="clientSide"
              animateRows={true}
              defaultColDef={{
                sortable: true,
                filter: true,
                resizable: true,
              }}
            />
          </div>
        );
      },
    },
    {
      label: "Completed",
      icon: ChevronDown,
      iconOff: ChevronRight,
      component: () => <p>Coming Soon...</p>,
    },
    {
      label: "Template",
      icon: ChevronDown,
      iconOff: ChevronRight,
      component: () => <p>Coming Soon...</p>,
    },
  ];

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-6 border-b border-gray-300 pb-2 text-blue-950">
          All Campaigns
          <p className="font-normal text-sm">
            Access review campaigns are used to manage the certification of
            access for your users. to start an access review campaign, click the
            ‘Create’ button at the top of this page.
          </p>
        </h1>
        <div className="pt-4">
          <Link
            href="/campaigns/new"
            className="bg-[#15274E] text-white p-3 rounded-sm text-sm  cursor-pointer "
          >
            Create Cert Definition
          </Link>
        </div>
      </div>
      <Tabs
        tabs={tabsData}
        activeClass="bg-[#15274E] text-white rounded-sm -ml-1"
        buttonClass="h-9.5 -mt-1 w-30"
        className=" ml-0.5 border border-gray-300 w-80 h-8 rounded-md"
      />
    </>
  );
}

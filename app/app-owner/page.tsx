"use client";
import { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "@/lib/ag-grid-setup";

import { appOwnerColumns } from "./appOwnerColumns";

type DataItem = {
  label: string;
  value: number | string;
  color?: string;
};
/*** dummy data  ***/
const rowData = [
  {
    user: "Derrick Watson",
    id: 7243915,
    avatar: "https://avatar.iran.liara.run/public/9",
    risk: "High",
    jobTitle: "Financial Analyst",
    role: "Contractor",
    employeetype: "Full Time",
    lastLogin: "2025-03-01 14:25:43",
    accessHistory: "2025-03-01 14:25:43",
    changeSinceLastReview: 3,
    aiAssistConfidence: "thumbs-down",
    email: "Derrick.Watson@example.com",
    status: "Active",
    subRows: [
      {
        account: "dwatson",
        id: 8243916,
        role: "Administrator",
        risk: "Low",
        applications: ["SAP ERP", "Slack"],
        roleType: "Full Access",
        subRows: [
          {
            id: 9243915,
            entitlement: "SP_DBA_CONTRIBUTOR",
            risk: "Medium",
            description: "Write",
            justification: "Needs access for reporting",
            accessHistory: "2025-03-01 14:25:43",
            aiAssistConfidence: "thumbs-down",
          },
          {
            id: 1043915,
            entitlement: "SP_ANALYST",
            risk: "30 Medium",
            description: "Read",
            justification: "View only access",
            accessHistory: "2025-02-15 10:12:30",
            aiAssistConfidence: "thumbs-up",
          },
        ],
      },
      {
        account: "awatson",
        id: 1143917,
        role: "User",
        risk: "Low",
        applications: ["Google Drive", "Teams"],
        roleType: "Limited Access",
        subRows: [
          {
            id: 1243917,
            entitlement: "SP_VIEWER",
            risk: "Low",
            description: "Read-Only",
            justification: "Basic user access",
            accessHistory: "2025-02-28 12:40:10",
            aiAssistConfidence: "thumbs-up",
          },
        ],
      },
    ],
  },
  {
    user: "Sophia Davis",
    id: 7243215,
    avatar: "https://avatar.iran.liara.run/public/9",
    risk: "High",
    jobTitle: "Financial Analyst",
    role: "Contractor",
    employeetype: "Full Time",
    lastLogin: "2025-03-01 14:25:43",
    accessHistory: "2025-03-01 14:25:43",
    changeSinceLastReview: 3,
    aiAssistConfidence: "thumbs-down",
    email: "Derrick.Watson@example.com",
    status: "Active",
    subRows: [
      {
        account: "dwatson",
        id: 8243116,
        role: "Administrator",
        risk: "Low",
        applications: ["SAP ERP", "Slack"],
        roleType: "Full Access",
        subRows: [
          {
            id: 922915,
            entitlement: "SP_DBA_CONTRIBUTOR",
            risk: "Medium",
            description: "Write",
            justification: "Needs access for reporting",
            accessHistory: "2025-03-01 14:25:43",
            aiAssistConfidence: "thumbs-down",
          },
          {
            id: 10243915,
            entitlement: "SP_ANALYST",
            risk: "30 Medium",
            description: "Read",
            justification: "View only access",
            accessHistory: "2025-02-15 10:12:30",
            aiAssistConfidence: "thumbs-up",
          },
        ],
      },
      {
        account: "awatson",
        id: 114617,
        role: "User",
        risk: "Low",
        applications: ["Google Drive", "Teams"],
        roleType: "Limited Access",
        subRows: [
          {
            id: 1244917,
            entitlement: "SP_VIEWER",
            risk: "Low",
            description: "Read-Only",
            justification: "Basic user access",
            accessHistory: "2025-02-28 12:40:10",
            aiAssistConfidence: "thumbs-up",
          },
        ],
      },
    ],
  },
];

const data: {
  accountSummary: DataItem[];
  entitlementSummary: DataItem[];
  accountActivity: DataItem[];
  changeReview: DataItem[];
} = {
  accountSummary: [
    { label: "Regular Accounts", value: 40 },
    { label: "Elevated Accounts", value: 40 },
    { label: "Orphan Accounts", value: 40 },
    { label: "Terminated User Accounts", value: 40 },
  ],
  entitlementSummary: [
    { label: "High", value: 40 },
    { label: "Medium", value: 40 },
    { label: "Low Risk", value: 40 },
  ],
  accountActivity: [
    { label: "Active in past 30 days", value: 40 },
    { label: "Active in past 30-60 days", value: 40 },
    { label: "Active in past more than 90 days", value: 40 },
  ],
  changeReview: [
    { label: "New accounts", value: "+30" },
    { label: "Old accounts", value: "-20" },
    { label: "New entitlements", value: 20 },
  ],
};

export default function AppOwner() {
  const [selected, setSelected] = useState<{ [key: string]: number | null }>(
    {}
  );
  const gridRef = useRef<AgGridReact>(null);

  const handleSelect = (category: string, index: number) => {
    setSelected((prev) => ({
      ...prev,
      [category]: prev[category] === index ? null : index,
    }));
  };

  const clearFilters = () => setSelected({});

  return (
    <>
      <h1 className="text-xl font-bold mb-6 border-b border-gray-300 pb-2 text-blue-950">
        Application Owner
      </h1>
      <div className="grid grid-cols-4 gap-10">
        {Object.entries(data).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-semibold text-sm mb-2 capitalize">
              {category.replace(/([A-Z])/g, " $1")}
            </h3>
            <div className="space-y-2">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`flex text-sm relative items-center p-3 rounded-sm cursor-pointer transition-all ${
                    selected[category] === index
                      ? "bg-[#6574BD] text-white"
                      : "bg-[#F0F2FC] hover:bg-[#e5e9f9]"
                  } ${item.color || ""}`}
                  onClick={() => handleSelect(category, index)}
                >
                  <span>{item.label}</span>
                  <span
                    className={`font-semibold absolute -right-2 bg-white border p-1 text-[12px]  rounded-sm ${
                      selected[category] === index
                        ? "border-[#6574BD] text-[#6574BD]"
                        : "border-[#e5e9f9]"
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        className="bg-[#15274E] text-white p-2 rounded-sm text-sm mt-4 cursor-pointer "
        onClick={clearFilters}
      >
        {" "}
        Clear Filter{" "}
      </button>

      <div className="ag-theme-alpine mt-6 h-72">
        {rowData && rowData.length > 0 ? (
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={appOwnerColumns}
            rowSelection="multiple"
            animateRows={true}
            context={{ gridRef }}
            rowModelType="clientSide"
            defaultColDef={{
              sortable: true,
              filter: true,
              resizable: true,
            }}
          />
        ) : (
          <div className="mt-4">Loading...</div>
        )}
      </div>
    </>
  );
}

'use client';
import { useState } from "react";
import dynamic from "next/dynamic";
// const DataTable = dynamic(() => import('@/components/table/DataTable'), { ssr: false });
// import {rowData} from '@/components/data';
// import {columns} from '@/components/table/columns'

type DataItem = {
  label: string;
  value: number | string;
  color?: string;
};

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
  const [selected, setSelected] = useState<{ [key: string]: number | null }>({});

  const handleSelect = (category: string, index: number) => {
    setSelected((prev) => ({
      ...prev,
      [category]: prev[category] === index ? null : index,
    }));
  };

  const clearFilters = () => setSelected({});
  
  return (
    <>
    <h1 className="text-xl font-bold mb-6 border-b border-gray-300 pb-2 text-blue-950">Application Owner</h1>
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
                <span className={`font-semibold absolute -right-2 bg-white border p-1 text-[12px]  rounded-sm ${ selected[category] === index
                    ? "border-[#6574BD] text-[#6574BD]"
                    : "border-[#e5e9f9]"
                }`}>{item.value}</span>
              </div>  
            ))}
          </div>
        </div>
      ))}   
    </div>
    <button className="bg-[#15274E] text-white p-2 rounded-sm text-sm mt-4 cursor-pointer " onClick={clearFilters}> Clear Filter </button>
      {/* {!rowData || rowData.length === 0 ?  <div>Loading...</div> :
                <DataTable data={rowData} columns={columns} filerColumns={['risk']} />
                } */}
    </>
  );
}
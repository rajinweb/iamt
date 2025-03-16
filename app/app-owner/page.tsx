'use client';
import { useState } from "react";

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
    <div className="grid grid-cols-4 gap-6">
      {Object.entries(data).map(([category, items]) => (
        <div key={category}>
          <h3 className="font-semibold text-sm mb-2 capitalize">
            {category.replace(/([A-Z])/g, " $1")}
          </h3>
          <div className="space-y-2">
            {items.map((item, index) => (
              <div
                key={index}
                className={`flex text-sm justify-between items-center p-2 rounded-lg cursor-pointer transition-all ${
                  selected[category] === index
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                } ${item.color || ""}`}
                onClick={() => handleSelect(category, index)}
              >
                <span>{item.label}</span>
                <span className="font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="col-span-4 mt-4 flex justify-start">
        <button
          className="bg-blue-900 text-white px-4 py-2 rounded-md font-medium"
          onClick={clearFilters}
        >
          Clear Filter
        </button>
      </div>
    </div>
    </>
  );
}
import ActionButtons from '@/components/agTable/ActionButtons';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { MoveUp, User } from 'lucide-react';
import Image from 'next/image';
import React, { JSX } from 'react';

type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export const appOwnerColumns: ColDef[] = [
  {
    field: 'user',
    headerName: 'User',
    cellRenderer: (params: { data: any; node: any; }) => {
      const { data, node } = params;
      const depth = node.level;

      return (
        <div className="flex items-center space-x-2">
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={node.isSelected()}
            onChange={() => node.setSelected(!node.isSelected())}
            className={`${depth > 1 ? 'ml-1' : ''}`}
          />

          {/* Avatar or Icons */}
          {depth === 0 ? (
            data.avatar ? (
              <Image
                src={data.avatar}
                alt="User Avatar"
                width={30}
                height={30}
                className="rounded-full"
              />
            ) : (
              <MoveUp strokeWidth={1} />
            )
          ) : depth === 1 ? (
            <MoveUp strokeWidth={1} />
          ) : (
            <User strokeWidth={1} />
          )}

          {/* Text */}
          <div className="flex flex-col gap-0">
            <span className="font-semibold text-[#175AE4] text-[12px]">User</span>
            <span className="text-gray-800 font-bold text-[12px]">{data.user}</span>
          </div>
        </div>
      );
    },
  },
  {
    field: 'risk',
    headerName: 'Risk',
    cellRenderer: (params:ICellRendererParams) => {
      const value = params.value as RiskLevel;
      const riskConfig:Record<RiskLevel, JSX.Element> = {
        Critical: <div className="bg-red-600 w-3 h-3 rounded-full" />,
        High: <div className="bg-orange-500 w-3 h-3 rounded-full" />,
        Medium: <div className="bg-yellow-500 w-3 h-3 rounded-full" />,
        Low: <div className="bg-green-500 w-3 h-3 rounded-full" />,
      }

      return (
        <div className="flex flex-col gap-0">
          <span className="font-semibold text-[#175AE4] text-[12px]">Risk</span>
          <span className="text-gray-800 font-bold">{riskConfig[value]}</span>
        </div>
      );
    },
  },
  {
    field: 'id',
    headerName: 'ID',
    cellRenderer: (params:ICellRendererParams) => (
      <div className="flex flex-col gap-0">
        <span className="font-semibold text-[#175AE4] text-[12px]">ID</span>
        <span className="text-gray-800">{params.value}</span>
      </div>
    ),
  },
  {
    field: 'jobTitle',
    headerName: 'Job Title',
    cellRenderer: (params:ICellRendererParams) => (
      <div className="flex flex-col gap-0">
        <span className="font-semibold text-[#175AE4] text-[12px]">Job Title</span>
        <span className="text-gray-800">{params.value}</span>
      </div>
    ),
  },
  {
    field: 'changeSinceLastReview',
    headerName: 'Change Since Last Review',
    cellRenderer: (params:ICellRendererParams) => (
      <div className="flex flex-col gap-0">
        <span className="font-semibold text-[#175AE4] text-[12px]">Change Since Last Review</span>
        <span className="text-gray-800">{params.value}</span>
      </div>
    ),
  },
  {
    field: 'aIAssistConfidence',
    headerName: 'AI Assist Confidence',
    cellRenderer: (params:ICellRendererParams) => {
      const icon =
        params.value === 'thumbs-up' ? (
          <svg width="21" height="18" viewBox="0 0 21 18">
            <path fill="#34C759" d="M3.76 7.5V18.76H0V7.5H3.76ZM18.76 6.24..." />
          </svg>
        ) : (
          <svg width="21" height="19" viewBox="0 0 21 19">
            <path fill="#FF2D55" d="M3.76 11.24V0H0V11.26L3.76 11.24ZM18.76 12.5..." />
          </svg>
        );

      return (
        <div className="flex flex-col gap-0">
          <span className="font-semibold text-[#175AE4] text-[12px]">AI Assist Confidence</span>
          <span className="text-gray-800">{icon}</span>
        </div>
      );
    },
  },
  {
    field: 'actions',
    headerName: 'Actions',
    cellRenderer: (params:ICellRendererParams) => {
      return <ActionButtons api={params.api} selectedRows={[params.data]} />;
    },
  },
];

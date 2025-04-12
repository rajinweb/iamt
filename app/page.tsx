'use client';
import { Eye, EyeOff } from 'lucide-react';
import dynamic from 'next/dynamic';
import Tabs from '@/components/tabs';
import Accordion from '@/components/Accordion';
const ChartComponent = dynamic(() => import('@/components/ChartComponent'), { ssr: false });

// import {rowData} from '@/components/data';
// import { columns } from '@/components/table/columns';
// const DataTable = dynamic(() => import('@/components/table/DataTable'), { ssr: false });
   {/* {!rowData || rowData.length === 0 ?  <div>Loading...</div> :
      <DataTable data={rowData} columns={columns} filerColumns={['risk']} />
      } */}

import { columnDefs, defaultColDef } from '@/components/dashboard/columnDefs';
import './globals.css';
import AgGridTable from '@/components/AgGridTable';
import { getCertifications } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import SelectAll from '@/components/table//SelectAll';
// import CustomPagination from '@/components/table/CustomPagination';
import ColumnSettings from '@/components/table//ColumnSettings';
import { GridApi, RowClickedEvent } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';

const reviewerId = 'S276692'; // You can make this dynamic later if needed

export interface CertificationRow {
  reviewerId: string;
  certificationId: string;
  campaignId: string;
  certificationName: string;
  certificationType: string;
  certificationCreatedOn: string;
  certificationExpiration: string;
  status: string;
  certificationSignedOff: boolean;
  certificateRequester: string;
  percentageCompleted: number;
  totalActions: number;
  totalActionsCompleted: number;
}

export default function Home() {

  const tabsData = [
    { label: "Summary Dashboard", icon: Eye, iconOff: EyeOff, component:  ChartComponent },
    { label: "Reports Dashboard", icon: Eye, iconOff: EyeOff, component: () => <p className='p-8'>View reports and analytics Dashboard <br/> Coming Soon...</p> },
  ];
  const gridRef = useRef<AgGridReact | null>(null);
  const gridApiRef = useRef<GridApi | undefined>(undefined);

  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  const [certifications, setCertifications] = useState<CertificationRow[]>([]);
  const router = useRouter();

  useEffect(() => { 
    (async () => {
      const res = await getCertifications(reviewerId);

      const data = res.items.map((item: any) => {
        const certInfo = item.reviewerCertificationInfo?.[0] || {};
        const actionInfo = item.reviewerCertificateActionInfo?.[0] || {};

        return {
          reviewerId: item.reviewerId,
          certificationId: item.certificationId,
          campaignId: item.campaignId,
          certificationName: certInfo.certificationName,
          certificationType: certInfo.certificationType,
          certificationCreatedOn: certInfo.certificationCreatedOn,
          certificationExpiration: certInfo.certificationExpiration,
          status: certInfo.status,
          certificationSignedOff: certInfo.certificationSignedOff,
          certificateRequester: certInfo.certificateRequester,
          percentageCompleted: actionInfo.percentageCompleted,
          totalActions: actionInfo.totalActions,
          totalActionsCompleted: actionInfo.totalActionsCompleted,
        };
      });

      setCertifications(data);
    })(); 
  }, []);

  const handleRowClick = (e: RowClickedEvent<CertificationRow>) => {
    const clickedReviewerId = e.data?.reviewerId;
    const clickedCertificationId = e.data?.certificationId;
    if (clickedReviewerId && clickedCertificationId) {
      router.push(`/manager-action/${clickedReviewerId}/${clickedCertificationId}`);
    }
  };
  return (  
    <>
       <Accordion iconClass='absolute top-1 right-0 rounded-full text-white bg-purple-800' title='Expand/Collapse'>
       <Tabs tabs={tabsData} className="border-b border-b-gray-300" />
      </Accordion>
   
      <div className="ag-theme-quartz w-full h-[600px] p-6">
      <div className="flex items-center justify-between mb-4 relative z-10">
        {/* <SelectAll gridApi={gridApiRef.current}  /> */}
        <div className="flex items-center">
          {/* <CustomPagination gridApi={gridApiRef.current}  />
          <ColumnSettings
            columnDefs={columnDefs}
            gridRef={gridRef}
            visibleColumns={() => {
              const visibleCols: string[] = [];
              columnDefs.forEach((colDef) => {
                if (colDef.field) {
                  visibleCols.push(colDef.field);
                }
              });
              return visibleCols;
            }}
          /> */}
        </div>
      </div>
      <div className="h-1/2">
      <AgGridTable
        ref={gridApiRef} 
        rowData={certifications}   
        columnDefs={columnDefs}
        treeData={false}
        rowModelType="clientSide" 
        getDataPath={(data) => [data?.reviewerId, data?.certificationId]}
        onRowClicked={handleRowClick}
        //getDataPath={(data: { reviewerId: any; certificationId: any; }) => [data?.reviewerId, data?.certificationId]}
        setGridApi={setGridApi} 
      />
      </div>
    </div>
    </>
  );
}
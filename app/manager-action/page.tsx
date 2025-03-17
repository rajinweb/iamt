'use client';
import dynamic from 'next/dynamic';
const DataTable = dynamic(() => import('@/components/table/DataTable'), { ssr: false });
import {rowData} from '@/components/data';
import { columns } from '@/components/table/columns';
export default function ManagerAction() {
  return (  
    <>
      <h1 className="text-xl font-bold mb-6 border-b border-gray-300 pb-2 text-blue-950">Manager Actions</h1>
       {!rowData || rowData.length === 0 ?  <div>Loading...</div> :
            <DataTable data={rowData} columns={columns} filerColumns={['risk']} />
            }
    </>
  );
}
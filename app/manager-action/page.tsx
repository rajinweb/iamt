'use client';
import dynamic from 'next/dynamic';
const DataTable = dynamic(() => import('@/components/table/DataTable'), { ssr: false });

export default function ManagerAction() {
  return (  
    <>
      <h1 className="text-xl font-bold mb-6 border-b border-gray-300 pb-2 text-blue-950">Manager Actions</h1>
      <DataTable />
    </>
  );
}
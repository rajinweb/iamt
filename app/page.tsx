'use client';
import { Eye, EyeOff } from 'lucide-react';
import dynamic from 'next/dynamic';
import Tabs from '@/components/tabs'
import {rowData} from '@/components/data';
import { columns } from '@/components/table/columns';
import Accordion from '@/components/Accordion';
const DataTable = dynamic(() => import('@/components/table/DataTable'), { ssr: false });
const ChartComponent = dynamic(() => import('@/components/ChartComponent'), { ssr: false });

export default function Home() {

  const tabsData = [
    { label: "Summary Dashboard", icon: Eye, iconOff: EyeOff, component:  ChartComponent },
    { label: "Reports Dashboard", icon: Eye, iconOff: EyeOff, component: () => <p className='p-8'>View reports and analytics Dashboard <br/> Coming Soon...</p> },
  ];
  return (  
    <>
       <Accordion iconClass='absolute top-1 right-0 rounded-full text-white bg-purple-800' title='Expand/Collapse'>
       <Tabs tabs={tabsData} className="border-b border-b-gray-300" />
      </Accordion>
      {!rowData || rowData.length === 0 ?  <div>Loading...</div> :
      <DataTable data={rowData} columns={columns} filerColumns={['risk']} />
      }
    </>
  );
}
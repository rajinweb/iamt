'use client';
import { Eye, EyeOff } from 'lucide-react';
import dynamic from 'next/dynamic';
import Tabs from '@/components/tabs';
const DataTable = dynamic(() => import('@/components/table/DataTable'), { ssr: false });
const ChartComponent = dynamic(() => import('@/components/ChartComponent'), { ssr: false });

export default function Home() {

  const tabsData = [
    { label: "Summary Dashboard", icon: Eye, iconOff: EyeOff, component:  ChartComponent },
    { label: "Reports Dashboard", icon: Eye, iconOff: EyeOff, component: () => <p className='p-8'>View reports and analytics Dashboard <br/> Coming Soon...</p> },
  ];
  return (  
    <div className="p-6">
      <Tabs tabs={tabsData} />
      <DataTable />
    </div>
  );
}
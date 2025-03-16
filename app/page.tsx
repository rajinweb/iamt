'use client';
import ChartComponent from '@/components/ChartComponent';
import DataTable from '@/components/table/DataTable';
import Tabs from "@/components/tabs";  
import { Eye, EyeOff } from 'lucide-react';

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
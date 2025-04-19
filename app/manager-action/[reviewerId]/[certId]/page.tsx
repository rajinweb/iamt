'use client';
import TreeClient from "./TreeClient";
import dynamic from 'next/dynamic';
import { Eye, EyeOff } from 'lucide-react';
//import Tabs from '@/components/tabs';
import Accordion from '@/components/Accordion';
const ChartComponent = dynamic(() => import('@/components/ChartComponent'), { ssr: false });

export default async function CertificationDetailsPage({ params }: { params: Promise<{ reviewerId: string, certId: string }> }) {
  const { reviewerId, certId } = await params; 
    const tabsData = [
      { label: "Summary Dashboard", icon: Eye, iconOff: EyeOff, component:  ChartComponent },
      { label: "Reports Dashboard", icon: Eye, iconOff: EyeOff, component: () => <p className='p-8'>View reports and analytics Dashboard <br/> Coming Soon...</p> },
    ];
  return (
    <>
      <h1 className="text-xl font-bold mb-6 border-b border-gray-300 pb-2 text-blue-950">Manager Actions</h1>
      <Accordion iconClass='absolute top-1 right-0 rounded-full text-white bg-purple-800' title='Expand/Collapse'>
       {/* <Tabs tabs={tabsData} className="border-b border-b-gray-300" /> */}
       <ChartComponent/>
      </Accordion>
      <TreeClient reviewerId={reviewerId} certId={certId} />
    </>
  );
};

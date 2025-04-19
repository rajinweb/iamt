'use client';
import React from "react";
import Tabs from "@/components/tabs";
import {campData} from '@/components/data';
import dynamic from "next/dynamic";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { CampaignColumns } from "./new/CampaignColumns";
// const DataTable = dynamic(() => import('@/components/table/DataTable'), { ssr: false });

export default function Campaigns() {
  const tabsData = [
    { label: "Active", icon: ChevronDown, iconOff: ChevronRight, component: () => {
            return !campData || campData.length === 0 ? <div>Loading...</div> : <>dasdf </>
            //<DataTable data={campData} columns={CampaignColumns} filerColumns={['campaignName']} />;
          }
      },
    { label: "Completed", icon: ChevronDown, iconOff: ChevronRight, component: () => <p> Coming Soon...</p> },
    { label: "Template",  icon: ChevronDown, iconOff: ChevronRight, component: () => <p > Coming Soon...</p> }
  ];
  
  return (
    <>
    <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-6 border-b border-gray-300 pb-2 text-blue-950">All Campaigns 
          <p className="font-normal text-sm">Access review campaigns are used to manage the certification of access for your users. to start an access review campaign, click the ‘Create’ button at the top of this page.</p>
        </h1>
      <div className="pt-4">
        <Link
          href="/campaigns/new"
            className="bg-[#15274E] text-white p-3 rounded-sm text-sm  cursor-pointer ">
            Create Cert Definition
        </Link>
      </div>
    </div>
    <Tabs tabs={tabsData} 
      activeClass='bg-[#15274E] text-white rounded-sm -ml-1' 
      buttonClass="h-9.5 -mt-1 w-30" 
      className=" ml-0.5 border border-gray-300 w-80 h-8 rounded-md"/>
    </>
  );
}
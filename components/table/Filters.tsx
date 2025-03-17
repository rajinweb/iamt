'use client';
import react, { useEffect, useState } from 'react'
import Dropdown from '../Dropdown'
import { CircleX, Filter, FilterX } from 'lucide-react';

const Filters=({ table, columns }: { table: any, columns?:string[] })=> {
    const [riskFilter, setRiskFilter] = useState<string | null>(null);
    useEffect(() => {
        if(columns){            
            columns.map(col =>table?.getColumn(col)?.setFilterValue(riskFilter))   
        }
      }, [riskFilter]);
      
    return( 
        <div className='relative flex items-center'>
         {riskFilter && <span title="Clear Filter" className='rounded-full bg-red-700 absolute -top-1 -left-1 w-4 h-4 text-[11px] text-white text-center z-10'>1</span>}
        <Dropdown Icon={riskFilter ? FilterX : Filter} className={`${riskFilter ? "bg-[#6D6E73]/20" : ''}`}>
         
            <li className='px-4 pb-2  border-b border-b-gray-300 font-semibold mb-2 flex justify-between relative'>
            Filter by 
            {riskFilter &&  <span title="Clear Filter" className='rounded-full bg-red-600 absolute right-0'><CircleX color="#fff"  size={20} onClick={() => setRiskFilter('')} /></span> }  
            </li>
            <li  onClick={(e) => setRiskFilter('Pending')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Pending 
            </li>
            <li onClick={(e) => setRiskFilter('High')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Approved   
            </li>
            <li  onClick={(e) => setRiskFilter('Medium')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Revoked 
            </li>
            <li  onClick={(e) => setRiskFilter('Low')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Delegated   
            </li>
            <li  onClick={(e) => { alert('Remediated') }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Remediated
            </li>
        </Dropdown>
        </div>
    )
}
export default Filters
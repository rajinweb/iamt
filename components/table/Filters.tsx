'use client';
import { useEffect, useState } from 'react'
import Dropdown from '../Dropdown'
import { CircleX, Filter, FilterX } from 'lucide-react';

const Filters=({ table, columns, appliedFilter }: { table: any, columns?:string[], appliedFilter?:(filter: string) => void })=> {
    const [filter, setFilter] = useState<string | null>(null);
    useEffect(() => {
        if(columns){            
            columns.map(col =>table?.getColumn(col)?.setFilterValue(filter)) 
            appliedFilter && appliedFilter(filter ?? '')  
        }
      }, [filter]);
      
    return( 
        <div className='relative flex items-center'>
         {filter && <span title="Clear Filter" className='rounded-full bg-red-700 absolute -top-1 -left-1 w-4 h-4 text-[11px] text-white text-center z-10'>1</span>}
       
        <Dropdown Icon={filter ? ()=> 
            <div className='flex h-8 items-center gap-2 px-2'><FilterX/> 
            <small>{filter}</small> 
                <span title="Clear Filter" className='rounded-full bg-red-600 '>
                    <CircleX color="#fff"  size={18} onClick={() => setFilter('')} />
                </span>
            </div> 
            : 
            Filter
            } 
            className={`${filter ? "bg-[#6D6E73]/20" : ''}`}>
         
            <li className='px-4 pb-2  border-b border-b-gray-300 font-semibold mb-2 flex justify-between relative'>
            Filter by 
            {
            // filter && <span title="Clear Filter" className='rounded-full bg-red-600 absolute right-0'>
            // <CircleX color="#fff"  size={20} onClick={() => setFilter('')} />
            // </span>
            }  
            </li>
            {["Pending", "Approved", "Revoked", "Delegated", "Remediated"].map((status) => (
            <li
                key={status}
                onClick={() => setFilter(status)}   
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
                {status}
            </li>
        ))}
        </Dropdown>
        </div>
    )
}
export default Filters
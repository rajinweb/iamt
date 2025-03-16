import react, { useEffect, useState } from 'react'
import Dropdown from '../Dropdown'
import { CircleX, Filter, FilterX } from 'lucide-react';

const Filters=({ table }: { table: any })=> {
    const [riskFilter, setRiskFilter] = useState<string | null>(null);
    useEffect(() => {
        table.getColumn('risk')?.setFilterValue(riskFilter);
      }, [riskFilter]);
      
    return( 
        <Dropdown Icon={riskFilter ? FilterX : Filter} className={`${riskFilter ? "bg-[#6D6E73]/20" : ''}`}>
            {riskFilter && <li  onClick={() => setRiskFilter('')} className="px-4 py-1 bg-green-100 hover:bg-green-200 cursor-pointer  rounded-sm">
           <small className='flex gap-2'> <CircleX  size={14}/>  Clear Filter </small>
            </li>}
            <li  onClick={() => setRiskFilter('Pending')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Pending 
            </li>
            <li  onClick={() => setRiskFilter('High')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Approved   
            </li>
            <li  onClick={() => setRiskFilter('Medium')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Revoked 
            </li>
            <li  onClick={() => setRiskFilter('Low')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Delegated   
            </li>
            <li  onClick={() => { alert('Remediated') }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Remediated
            </li>
        </Dropdown>
    )
}
export default Filters
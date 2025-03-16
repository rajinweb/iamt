import react from 'react'
import Dropdown from '../Dropdown'
import { Filter } from 'lucide-react';

const Filters=()=>{
    return(
        <Dropdown Icon={Filter}>
            <li  onClick={() => { alert('Pending') }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Pending 
            </li>
            <li  onClick={() => { alert('Approved') }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Approved   
            </li>
            <li  onClick={() => { alert('Revoked') }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Revoked 
            </li>
            <li  onClick={() => { alert('Delegated') }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Delegated   
            </li>
            <li  onClick={() => { alert('Remediated') }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Remediated
            </li>
        </Dropdown>
    )
}
export default Filters
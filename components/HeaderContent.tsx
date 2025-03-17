import { RefreshCcw, Wand2, Bell } from 'lucide-react';
import Dropdown from './Dropdown';


const HeaderContent = () => {
  return (
    <div className="flex h-full w-full items-center justify-between text-sm ">

      <h1 className="text-md font-semibold min-w-[210px]">
        Quarterly Q1 FY25 Review
      </h1>

       <div className="flex h-full divide-x-1 divide-[#C3C4C8]">
        <div className=" flex items-center w-48 h-full">
          <p className='text-sm font-medium  text-red-500 '>Due on March 15, 2025<br/>
          <span className="font-bold">Time Left: 12h 30m</span>
          </p>
        </div>

        <div className="h-full flex items-center border-l-2  border-l-white">
          <button className="flex items-center bg-transparent text-blue-600 hover:text-blue-800 px-3 h-full mr-1 cursor-pointer">
            <RefreshCcw className="mr-2 w-5 h-5" /> App/Data Sync on
          </button>
        </div>

        <div className="h-full flex items-center border-l-2  border-l-white">
        <button className="flex items-center bg-transparent text-blue-600 hover:text-blue-800 px-3 h-full mr-1 cursor-pointer">
          <Wand2 className="mr-2 w-5 h-5" /> Gen AI Assistant
        </button>
        </div>

        <div className="h-full flex items-center w-32 justify-end border-l-2 gap-6  border-l-white">
        <Bell strokeWidth='1'/>
            <Dropdown Icon={()=><img src='https://avatar.iran.liara.run/public/1' alt="User Avatar"
            className=" w-7 h-7 object-cover cursor-pointer" />} className="!rounded-full border border-gray-500" title="User profile">
      
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Profile
              </a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Settings
              </a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Logout
              </a>
        
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default HeaderContent;

import { RefreshCcw, Wand2, UserCircle, Flag } from 'lucide-react';

const HeaderContent = () => {
  return (
    <div className="flex h-full w-full items-center justify-between px-4">

      <h1 className="text-md font-semibold min-w-[210px]">
        Quarterly Q1 FY25 Review
      </h1>

 
      <div className="flex h-full items-center space-x-4">

        <div className="text-red-500 font-medium w-48">
          <p>Due on March 15, 2025</p>
          <span className="font-bold">Time Left: 12h 30m</span>
        </div>

    
        <button className="flex items-center bg-transparent text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md transition">
          <RefreshCcw className="mr-2 w-5 h-5" /> App/Data Sync on
        </button>


        <button className="flex items-center bg-transparent text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md transition">
          <Wand2 className="mr-2 w-5 h-5" /> Gen AI Assistant
        </button>


        <div className="flex items-center space-x-4">
          <Flag className="text-gray-600 hover:text-gray-800 cursor-pointer transition w-6 h-6" />
          <UserCircle className="text-gray-600 hover:text-gray-800 cursor-pointer transition w-7 h-7" />
        </div>
      </div>
    </div>
  );
};

export default HeaderContent;

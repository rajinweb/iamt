import { useState } from "react";

interface Tab {
  label: string;
  icon: React.ElementType;
  iconOff: React.ElementType;
  component: React.ComponentType;
}

interface TabsProps {
  tabs: Tab[];
}

const   Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const ActiveComponent = tabs[activeTab].component; // Get active tab's component

  return (
    <>
      {/* Tab Headers */}
      <div className="      mb-4 border-b border-b-gray-300 flex gap-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex items-center px-2 gap-2 py-2 text-sm cursor-pointer
              ${activeTab === index ? "border-b-4 -mb-0.5 border-blue-500 text-blue-600" : "text-gray-500"}
              hover:text-blue-500 transition-all`}
          >
            <small className="flex gap-2">
           {activeTab === index ? <tab.icon size={16} /> : <tab.iconOff size={16} />}
            {tab.label}</small>
          </button>
        ))}
      </div>

      {/* Render Dynamic Component */}
     
        <ActiveComponent />
  
    </>
  );
};

export default Tabs;

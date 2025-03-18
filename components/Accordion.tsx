'user client';
import { useState } from "react";
import { CircleMinus, CirclePlus } from "lucide-react";


interface AccordionProps {
  headerText?: string;
  title?:string;
  children: React.ReactNode;
  iconSize?:number;
  iconClass?:string;
}

const Accordion = ({ headerText, children, iconSize, title, iconClass }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="transition-all duration-150 ease-in-out transform min-h-8">
      <button
        className={`flex cursor-pointer items-center ${iconClass}`}
        onClick={handleToggle}
        title={title}
      > 
        {isOpen ? <CircleMinus size={iconSize || 22} /> : <CirclePlus size={iconSize || 22} />}
        {headerText && <small>{headerText}</small>}
      </button>

      {isOpen && <div>{children}</div>}
    </div>
  );
};

export default Accordion;

import { ChevronDown, ChevronUp , Eye, EyeClosed, EyeOff } from "lucide-react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

const Accordion = ({ title, children, isOpen, onToggle }: AccordionProps) => {
  return (
    <div className="transition-all">
      <button
        className="flex gap-2 p-2 cursor-pointer items-center w-full "
        onClick={onToggle}
      >
        {isOpen ? <Eye size={16} /> : <EyeOff size={16} />}
        <small className="">{title}</small>
      </button>

      {/* Content */}
      {isOpen && <>{children}</>}
    </div>
  );
};

export default Accordion;

import {  useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface DropdownProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { 
  children: React.ReactNode[];
  Icon: React.ElementType;
  name?: string;
  menuWidth?: number,
  className?: string
}

const Dropdown = ({ Icon, children, name, className,  menuWidth, ...props }: DropdownProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);  
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });


  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);

    if (menuButtonRef.current) {

      const rect = menuButtonRef.current.getBoundingClientRect();
      const extra=menuRef.current?.getBoundingClientRect()
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left - (menuWidth ? (menuWidth - 32) : 128) + window.scrollX,
      });
    }
  };

//Handle Click Outside
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      menuButtonRef.current &&
      !menuButtonRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  if (isMenuOpen) {
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
  }

  return () => document.removeEventListener("mousedown", handleClickOutside);
}, [isMenuOpen]);
    return(
    <>
    <button
      ref={menuButtonRef}
      onClick={toggleMenu}
      title="Download Menu"
      className={`cursor-pointer rounded-sm hover:opacity-80 ${className} ${isMenuOpen ? "bg-[#6D6E73]/20" : ""}`}
      {...props}
    >
    <Icon color="#35353A" size="32" className="transform scale-[0.6]"/> {name}
    </button>
   {isMenuOpen && createPortal( 
            <div  ref={menuRef} className="absolute  bg-white border border-gray-300 shadow-lg rounded-md z-50  p-2"
            style={{
                position: "fixed",
                top: `${menuPosition.top}px`,
                left: `${menuPosition.left}px`,
                minWidth: menuWidth || "160px",
                padding: "8px",
            }}>
            <ul className="text-sm text-gray-700">
             {children}
            </ul>
            </div>,
        document.body
    )}
</>)
}
export default Dropdown
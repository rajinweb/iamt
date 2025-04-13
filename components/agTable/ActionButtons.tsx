'use client';
import { GridApi } from 'ag-grid-enterprise';
import { createPortal } from "react-dom";
import { CircleCheck, CircleOff, MoreVertical } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface ActionButtonsProps {
  api: GridApi;
  selectedRows: any[];
  viewChangeEnable?: boolean;
}

const ActionButtons = ({ api, selectedRows, viewChangeEnable }: ActionButtonsProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null); 
    const menuRef = useRef<HTMLDivElement>(null);
    const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  
  
        // Bulk Approve
    const handleApprove = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!api || selectedRows.length === 0) return;
        api.applyTransaction({ update: selectedRows.map((row) => ({ ...row, status: "Approved" })) });
    };

    //Bulk Revoke
    const handleRevoke = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!api || selectedRows.length === 0) return;
        api.applyTransaction({ update: selectedRows.map((row) => ({ ...row, status: "Revoked" })) });
    };

    //Bulk Comment
    const handleComment = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedRows.length === 0) return;
        alert(`Adding comment for ${selectedRows.length} selected rows`);
    };
    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen((prev) => !prev);

        if (menuButtonRef.current) {
        const rect = menuButtonRef.current.getBoundingClientRect();
        setMenuPosition({
            top: rect.bottom, 
            left: rect.left - 128, 
        });
        }
    };
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
  

    useEffect(() => {
        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
          } else {
            document.removeEventListener("mousedown", handleClickOutside);
          }
      
          return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMenuOpen]);

  return (
    <div className="flex space-x-4 h-full items-center">
      
      <button onClick={handleApprove} title="Approve">
        <CircleCheck className="cursor-pointer  hover:opacity-80" color="#5C48DF" strokeWidth="1" size="32" />
      </button>
 
      <button onClick={handleRevoke} title="Revoke">
        <CircleOff className="cursor-pointer hover:opacity-80 transform rotate-90"  color="#FF2D55" strokeWidth="1" size="32" />
      </button>

      <button onClick={handleComment} title="Comment">
        <svg width="30" height="30" viewBox="0 0 32 32" className="cursor-pointer hover:opacity-80">
            <path d="M0.700195 0V19.5546H3.5802V25.7765C3.57994 25.9525 3.62203 26.1247 3.70113 26.2711C3.78022 26.4176 3.89277 26.5318 4.02449 26.5992C4.15621 26.6666 4.30118 26.6842 4.44101 26.6498C4.58085 26.6153 4.70926 26.5304 4.80996 26.4058C6.65316 24.1232 10.3583 19.5546 10.3583 19.5546H25.1802V0H0.700195ZM2.1402 1.77769H23.7402V17.7769H9.76212L5.0202 23.6308V17.7769H2.1402V1.77769ZM5.0202 5.33307V7.11076H16.5402V5.33307H5.0202ZM26.6202 5.33307V7.11076H28.0602V23.11H25.1802V28.9639L20.4383 23.11H9.34019L7.9002 24.8877H19.8421C19.8421 24.8877 23.5472 29.4563 25.3904 31.7389C25.4911 31.8635 25.6195 31.9484 25.7594 31.9828C25.8992 32.0173 26.0442 31.9997 26.1759 31.9323C26.3076 31.8648 26.4202 31.7507 26.4993 31.6042C26.5784 31.4578 26.6204 31.2856 26.6202 31.1096V24.8877H29.5002V5.33307H26.6202ZM5.0202 8.88845V10.6661H10.7802V8.88845H5.0202ZM5.0202 12.4438V14.2215H19.4202V12.4438H5.0202Z" fill="#2684FF"/>
        </svg>
      </button>

    {viewChangeEnable && (
      <button onClick={handleComment} title="Change view">
        <svg width="32" height="30.118" viewBox="0 0 32 30.118" className="cursor-pointer hover:opacity-80 transfrom scale-[0.6]">
            <path fill="#35353A" d="M30.08 13.749H13.34a.64.64 0 0 0-.425.16.53.53 0 0 0-.175.388v15.275a.53.53 0 0 0 .175.386c.113.102.265.16.425.16h16.744a.63.63 0 0 0 .424-.16.53.53 0 0 0 .177-.386V14.296c0-.301-.269-.546-.602-.546m-4.655 13.694-9.464-.004a.32.32 0 0 1-.211-.079.26.26 0 0 1-.088-.194V15.718c0-.267.491-.38.659-.16l9.212 11.45c.137.183.134.433-.107.433M18.116 0h-16.8a.66.66 0 0 0-.425.16.6.6 0 0 0-.132.177.6.6 0 0 0-.044.209v14.746q0 .109.045.207a.6.6 0 0 0 .13.179q.085.075.196.119.109.04.23.041h6.615c.16 0 .312-.056.425-.16l5.728-3.94h4.032a.66.66 0 0 0 .425-.16.6.6 0 0 0 .13-.177.6.6 0 0 0 .045-.209V.546a.6.6 0 0 0-.043-.207.6.6 0 0 0-.132-.179.66.66 0 0 0-.425-.16M6.573 26.839h3.981a.66.66 0 0 1 .424.16.6.6 0 0 1 .132.177.6.6 0 0 1 .045.209v2.187a.6.6 0 0 1-.045.207.6.6 0 0 1-.132.179.66.66 0 0 1-.425.16H3.569a.8.8 0 0 1-.23-.041.6.6 0 0 1-.196-.119.6.6 0 0 1-.132-.177.6.6 0 0 1-.043-.211v-6.889H1.165a.64.64 0 0 1-.324-.085.56.56 0 0 1-.222-.232.51.51 0 0 1 .09-.584l3.605-3.827a.66.66 0 0 1 .913 0l3.605 3.827q.113.12.137.279a.5.5 0 0 1-.049.305.56.56 0 0 1-.22.232.64.64 0 0 1-.326.087H6.573zm17.95-23.503h-3.68a.66.66 0 0 1-.425-.16.6.6 0 0 1-.132-.177.6.6 0 0 1-.043-.209V.604q0-.109.045-.211a.6.6 0 0 1 .13-.177.66.66 0 0 1 .425-.16h6.682a.66.66 0 0 1 .427.16q.085.079.13.177a.6.6 0 0 1 .045.211v6.889h1.803q.173 0 .324.085.147.087.22.232a.51.51 0 0 1-.088.584l-3.605 3.827a.66.66 0 0 1-.913 0l-3.605-3.827a.51.51 0 0 1-.088-.584.56.56 0 0 1 .22-.232.64.64 0 0 1 .324-.087h1.803z"/>
        </svg>
     </button>  
    )}

     {/* Dropdown */}
      <button ref={menuButtonRef} onClick={toggleMenu} title="More Actions" className={`cursor-pointer rounded-sm hover:opacity-80 ${isMenuOpen ? 'bg-[#6D6E73]/20' : ''}`}  >
          <MoreVertical color="#35353A" size="32"  className="transfrom scale-[0.6]"  />
      </button>
      <div className="relative flex items-center">
        {isMenuOpen && createPortal(
           <div 
           ref={menuRef}        
           className="absolute bg-white border border-gray-300 shadow-lg rounded-md z-50"
           style={{
            position: "fixed",
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
            minWidth: "160px",
            padding: "8px",
          }}
         >
            <ul className="py-2 text-sm text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Proxy</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delegate</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Remediate</li>
            </ul>
          </div>, document.body
        )}
      </div>

    </div>
  );
};

export default ActionButtons;

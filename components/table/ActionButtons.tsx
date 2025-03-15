import { createPortal } from "react-dom";
import { CircleCheck, CircleOff, MoreVertical } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface ActionButtonsProps {
  table: any;
  selectedRows: any[];
  setData: (updateFn: (oldData: any[]) => any[]) => void; //Update Function for React Table
  viewChangeEnable?: boolean;
}

const ActionButtons = ({ table, selectedRows, setData, viewChangeEnable }: ActionButtonsProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  //Bulk Approve
  const handleApprove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedRows.length === 0) return;

    setData((prevData) =>
      prevData.map((row) =>
        selectedRows.some((selected) => selected.id === row.id) ? { ...row, status: "Approved" } : row
      )
    );
  };

  //Bulk Revoke
  const handleRevoke = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedRows.length === 0) return;

    setData((prevData) =>
      prevData.map((row) =>
        selectedRows.some((selected) => selected.id === row.id) ? { ...row, status: "Revoked" } : row
      )
    );
  };

  //Bulk Comment
  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedRows.length === 0) return;
    alert(`Adding comment for ${selectedRows.length} selected rows`);
  };

  //Toggle Dropdown Menu
  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);

    if (menuButtonRef.current) {
      const rect = menuButtonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left - 128 + window.scrollX,
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

  return (
    <div className="flex space-x-4 h-full items-center">
      {/* Approve Button */}
      <button onClick={handleApprove} title="Approve">
        <CircleCheck className="cursor-pointer hover:opacity-80" color="#5C48DF" strokeWidth="1" size="32" />
      </button>

      {/* Revoke Button */}
      <button onClick={handleRevoke} title="Revoke">
        <CircleOff className="cursor-pointer hover:opacity-80 transform rotate-90" color="#FF2D55" strokeWidth="1" size="32" />
      </button>
      
      <button onClick={handleComment} title="Comment">
      <svg width="32" height="32" viewBox="0 0 32 32">
        <path fill="#2684FF" d="M.5 0v19.555h2.88v6.221c0 .177.042.349.12.495.08.147.193.26.324.328a.6.6 0 0 0 .417.05.7.7 0 0 0 .369-.243c1.843-2.283 5.548-6.851 5.548-6.851H24.98V0zm1.44 1.778h21.6v15.999H9.562L4.82 23.63v-5.854H1.94zm2.88 3.555v1.778h11.52V5.333zm21.6 0v1.778h1.44V23.11h-2.88v5.854l-4.742-5.854H9.14L7.7 24.888h11.942s3.705 4.568 5.548 6.85c.1.125.23.21.37.245a.6.6 0 0 0 .416-.05.8.8 0 0 0 .323-.329c.08-.146.121-.318.121-.494v-6.222h2.88V5.333zM4.82 8.888v1.778h5.76V8.888zm0 3.556v1.777h14.4v-1.777z"/>
      </svg>
      </button>

      
      {viewChangeEnable && (
      <button onClick={handleComment} title="Change view">
        <svg width="32" height="30.118" viewBox="0 0 32 30.118" className="cursor-pointer hover:opacity-80 transfrom scale-[0.6]">
            <path fill="#35353A" d="M30.08 13.749H13.34a.64.64 0 0 0-.425.16.53.53 0 0 0-.175.388v15.275a.53.53 0 0 0 .175.386c.113.102.265.16.425.16h16.744a.63.63 0 0 0 .424-.16.53.53 0 0 0 .177-.386V14.296c0-.301-.269-.546-.602-.546m-4.655 13.694-9.464-.004a.32.32 0 0 1-.211-.079.26.26 0 0 1-.088-.194V15.718c0-.267.491-.38.659-.16l9.212 11.45c.137.183.134.433-.107.433M18.116 0h-16.8a.66.66 0 0 0-.425.16.6.6 0 0 0-.132.177.6.6 0 0 0-.044.209v14.746q0 .109.045.207a.6.6 0 0 0 .13.179q.085.075.196.119.109.04.23.041h6.615c.16 0 .312-.056.425-.16l5.728-3.94h4.032a.66.66 0 0 0 .425-.16.6.6 0 0 0 .13-.177.6.6 0 0 0 .045-.209V.546a.6.6 0 0 0-.043-.207.6.6 0 0 0-.132-.179.66.66 0 0 0-.425-.16M6.573 26.839h3.981a.66.66 0 0 1 .424.16.6.6 0 0 1 .132.177.6.6 0 0 1 .045.209v2.187a.6.6 0 0 1-.045.207.6.6 0 0 1-.132.179.66.66 0 0 1-.425.16H3.569a.8.8 0 0 1-.23-.041.6.6 0 0 1-.196-.119.6.6 0 0 1-.132-.177.6.6 0 0 1-.043-.211v-6.889H1.165a.64.64 0 0 1-.324-.085.56.56 0 0 1-.222-.232.51.51 0 0 1 .09-.584l3.605-3.827a.66.66 0 0 1 .913 0l3.605 3.827q.113.12.137.279a.5.5 0 0 1-.049.305.56.56 0 0 1-.22.232.64.64 0 0 1-.326.087H6.573zm17.95-23.503h-3.68a.66.66 0 0 1-.425-.16.6.6 0 0 1-.132-.177.6.6 0 0 1-.043-.209V.604q0-.109.045-.211a.6.6 0 0 1 .13-.177.66.66 0 0 1 .425-.16h6.682a.66.66 0 0 1 .427.16q.085.079.13.177a.6.6 0 0 1 .045.211v6.889h1.803q.173 0 .324.085.147.087.22.232a.51.51 0 0 1-.088.584l-3.605 3.827a.66.66 0 0 1-.913 0l-3.605-3.827a.51.51 0 0 1-.088-.584.56.56 0 0 1 .22-.232.64.64 0 0 1 .324-.087h1.803z"/>
        </svg>
     </button>  
    )}

      {/* More Actions Dropdown */}
      <button
        ref={menuButtonRef}
        onClick={toggleMenu}
        title="More Actions"
        className={`cursor-pointer rounded-sm hover:opacity-80 ${isMenuOpen ? "bg-[#6D6E73]/20" : ""}`}
      >
        <MoreVertical color="#35353A" size="32" className="transform scale-[0.6]" />
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen &&
        createPortal(
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
          </div>,
          document.body
        )}
    </div>
  );
};

export default ActionButtons;

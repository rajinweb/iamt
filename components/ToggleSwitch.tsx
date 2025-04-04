import { Check, X } from "lucide-react";
import React from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  iconEnable?: boolean
}

const ToggleSwitch: React.FC<ToggleSwitchProps> =React.memo( ({ checked, onChange, disabled, className, iconEnable}) => {
  const isChecked = checked ?? false;
  return (
    <label className={`relative inline-block w-12 h-6 cursor-pointer ${className ? className : ''}`}>
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isChecked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
      />
      {/* Track */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-400 rounded-full peer-checked:bg-blue-500 transition-all"></div>
      {/* Thumb */}
      <div className="absolute top-1 left-1 w-4 h-4 bg-white dark:bg-blue-50 rounded-full shadow-md transition-all peer-checked:translate-x-6">
         {iconEnable &&
          (isChecked ? <Check size={16} strokeWidth={4} className="scale-80" /> : <X size={16} strokeWidth={4} className="scale-80"/>)
        }
      </div>
    </label>
  );
});

// Set display name for debugging
ToggleSwitch.displayName = "ToggleSwitch";
export default ToggleSwitch;

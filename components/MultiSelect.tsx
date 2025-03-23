'use client';
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false });
import { Control, Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";

const MultiSelect = ({ 
    name, 
    control, 
    options = [], 
    isAsync = false, 
    loadOptions, 
    placeholder = "Select...", 
    className,  
    components,
    isMulti=true,
    isSearchable=true,
    defaultValue,
    isDisabled=false
  } : { 
    name: string, 
    control: Control, 
    options?: any[], 
    isAsync?: boolean, 
    loadOptions?: (inputValue: string, callback: (options: any[]) => void) => void, 
    placeholder?: string,
    className?: string,
    components?: any,
    isMulti?:boolean,
    isSearchable?:boolean,
    defaultValue?:any[],
    isDisabled?:boolean
   }) => {


  // Fix SSR hydration issues by ensuring it's a client-only component
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  if (!isClient) return null; // Prevents SSR mismatches
  
  
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {

        const handleChange = (selected:any) => isMulti ? field.onChange(selected || []) : field.onChange(selected ? selected.value : "");
         
        const selectedValue = isMulti ? field.value || [] : options.find((opt) => opt.value === field.value) || null

        return isAsync ? 
          <AsyncSelect
            {...field}
            instanceId={name}
            isMulti={isMulti}
            cacheOptions
            defaultOptions
            isSearchable={isSearchable}
            loadOptions={loadOptions}
            placeholder={placeholder}
            onChange={handleChange}
            value={selectedValue ? selectedValue : defaultValue} 
            {...components && {components: components}}
            className={className}
            isDisabled={isDisabled}
            menuPlacement="auto"
          />
         : 
          <Select
            {...field}
            isMulti={isMulti}
            instanceId={name}
            isSearchable={isSearchable}
            options={options}          
            placeholder={placeholder}
            onChange={handleChange} 
            value={selectedValue ? selectedValue : defaultValue} 
            {...components && {components: components}}
            className={className}
            isDisabled={isDisabled}
            menuPlacement="auto"
          />
        
      }
    }
    />
  );
};

export default MultiSelect;

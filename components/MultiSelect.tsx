'use client';
import React, { JSX, useEffect, useState } from "react";
import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false });
import { Control, Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { GroupBase, OptionProps, components as component } from "react-select";

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
    isDisabled=false,
    optionCheck=false
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
    isDisabled?:boolean,
    optionCheck?:boolean
   }) => {


  // Fix SSR hydration issues by ensuring it's a client-only component
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  if (!isClient) return null; // Prevents SSR mismatches
  
  interface CustomOptionProps extends OptionProps<unknown, boolean, GroupBase<unknown>> {
    image?: string;
  }
  const Option = (props: JSX.IntrinsicAttributes & CustomOptionProps) => {
    console.log('ok', props)
    return (
      <component.Option {...props} className="!flex items-center">
        <input 
          type="checkbox" 
          checked={props.isSelected} 
          readOnly 
          style={{ marginRight: "8px" }} 
        />
         {"image" in (props.data as Record<string, unknown>) && (
            <img
              src={(props.data as { image: string }).image}
              alt={props.label}
              className="w-8 h-8 rounded-full mr-2"           
            />
          )}
        <label>{props.label}</label>
      </component.Option>
    );
  };

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
            //{...components && {components: components}}
            components={optionCheck && isMulti ? { ...components, Option } : components} 
            className={className}
            isDisabled={isDisabled}
            hideSelectedOptions={false}
            closeMenuOnSelect={isMulti? false : true}
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
            //{...components && {components: optionCheck && isMulti ? { ...components, Option } : components}}
            components={optionCheck && isMulti ? { ...components, Option } : components} 
            className={className}
            isDisabled={isDisabled}
            hideSelectedOptions={false}
            closeMenuOnSelect={isMulti? false : true}
            menuPlacement="auto"
          />
        
      }
    }
    />
  );
};

export default MultiSelect;

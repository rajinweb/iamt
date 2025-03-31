'use client';
import React, { JSX, useEffect, useState } from "react";
import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false });
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { GroupBase, OptionProps, components as component } from "react-select";

type MultiSelectProps<T extends FieldValues = FieldValues> = {
  control: Control<FieldValues>;
  // other props
//}; interface MultiSelectProps {
  name: Path<T>;
 // control: Control<FieldValues>;
  options?: { value: string; label: string; image?: string }[];
  isAsync?: boolean;
  loadOptions?: (inputValue: string, callback: (options: { value: string; label: string; image?: string }[]) => void) => void;
  placeholder?: string;
  className?: string;
  components?: Record<string, unknown>;
  isMulti?: boolean;
  isSearchable?: boolean;
  defaultValue?: { value: string; label: string; image?: string }[];
  isDisabled?: boolean;
  optionCheck?: boolean;
}
function MultiSelect<FormValues extends FieldValues>({  
  name,
  control,
  options = [],
  isAsync = false,
  loadOptions,
  placeholder = "Select...",
  className,
  components,
  isMulti = true,
  isSearchable = true,
  defaultValue,
  isDisabled = false,
  optionCheck = false,
}: MultiSelectProps<FormValues>) {
  // Fix SSR hydration issues by ensuring it's a client-only component
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  if (!isClient) return null; // Prevents SSR mismatches
  
  interface CustomOptionProps extends OptionProps<unknown, boolean, GroupBase<unknown>> {
    image?: string;
  }
  const Option = (props: JSX.IntrinsicAttributes & CustomOptionProps) => {
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
      name={name as Path<FormValues>}
      control={control}
      render={({ field }) => {
        const handleChange = (selected: any) =>
          isMulti ? field.onChange(selected || []) : field.onChange(selected ? selected.value : "");

        const selectedValue = isMulti
          ? field.value || []
          : options.find((opt) => opt.value === field.value) || null;

        return isAsync ? (
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
            components={optionCheck && isMulti ? { ...components, Option } : components}
            className={className}
            isDisabled={isDisabled}
            hideSelectedOptions={false}
            closeMenuOnSelect={isMulti ? false : true}
            menuPlacement="auto"
          />
        ) : (
          <Select
            {...field}
            isMulti={isMulti}
            instanceId={name}
            isSearchable={isSearchable}
            options={options}
            placeholder={placeholder}
            onChange={handleChange}
            value={selectedValue ? selectedValue : defaultValue}
            components={optionCheck && isMulti ? { ...components, Option } : components}
            className={className}
            isDisabled={isDisabled}
            hideSelectedOptions={false}
            closeMenuOnSelect={isMulti ? false : true}
            menuPlacement="auto"
          />
        );
      }}
    />
  );
};

export default MultiSelect;

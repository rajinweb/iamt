'use client';
import { Control, FieldValues, UseFormSetValue, UseFormWatch, useWatch } from "react-hook-form";
import { CircleX, Plus } from "lucide-react";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import Accordion from "./Accordion";

const attributes = [
  { label: "User Role", value: "user_role" },
  { label: "Department", value: "department" },
  { label: "Location", value: "location" },
  { label: "Access Level", value: "access_level" },
  { label: "Status", value: "status" },
  { label: "Job Title", value: "job_title" }
];

const operators = [
  { label: "Equals", value: "equals" },
  { label: "Not Equals", value: "not_equals" },
  { label: "Contains", value: "contains" },
  { label: "Excludes", value: "excludes" },
  { label: "IN", value: "in" },
  { label: "NOT IN", value: "not_in" }
];

const logicalOperators = [
  { label: "AND", value: "AND" },
  { label: "OR", value: "OR" }
];

interface Condition {
  id: string;
  attribute: { label: string; value: string } | null;
  operator: { label: string; value: string } | null;
  value: string;
  logicalOp: string;
}

interface ExpressionBuilderProps {
  title?: string;
  control: Control<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  fieldName: string;
}

const ExpressionBuilder: React.FC<ExpressionBuilderProps> = ({ title, control, setValue, fieldName }) => {

  const conditions: Condition[] = useWatch({ control, name: fieldName }) || [];

  useEffect(() => {
    if (!Array.isArray(conditions)) {
      setValue(fieldName, [], { shouldDirty: true });
    }
  }, [conditions, setValue, fieldName]);

  const addCondition = () => {
    const newCondition: Condition = {
      id: uuidv4(),
      attribute: null,
      operator: null,
      value: "",
      logicalOp: "AND"
    };

    setValue(fieldName, [...conditions, newCondition], { shouldDirty: true, shouldValidate: true });
  };

  const removeCondition = (id: string) => {
    setValue(fieldName, conditions.filter((cond) => cond.id !== id), { shouldDirty: true, shouldValidate: true });
  };

  const formattedExpression = conditions.map((cond) => ({
    attribute: cond.attribute?.value || "",
    operator: cond.operator?.value || "",
    value: cond.value || "",
    logicalOp: cond.logicalOp || ""
  }));

  return (
    <>
      {title && <h3 className="font-bold">{title}</h3>}
      <div className="p-4 border rounded-md w-full max-w-2xl border-gray-300 relative">
        
        {conditions.map((condition, index) => (
          <div key={ uuidv4()} className="flex space-x-2 items-center mb-2 justify-end">
            {/* Logical Operator Dropdown (Not shown for first condition) */}
            {index > 0 && (
              <Controller
                name={`${fieldName}.${index}.logicalOp`}
                control={control}
                render={({ field }) => (
                  <Select {...field} options={logicalOperators}  isSearchable={false} placeholder="AND/OR" />
                )}
              />
            )}

            {/* Attribute Dropdown */}
            <Controller
              name={`${fieldName}.${index}.attribute`}
              control={control}
              render={({ field }) => (
                <Select {...field} options={attributes} isSearchable={false} placeholder="Select Attribute" />
              )}
            />

            {/* Operator Dropdown */}
            <Controller
              name={`${fieldName}.${index}.operator`}
              control={control}
              render={({ field }) => (
                <Select {...field} options={operators} isSearchable={false}  placeholder="Condition" />
              )}
            />

            {/* Value Input */}
            <Controller
              name={`${fieldName}.${index}.value`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Enter value"
                  className="form-input !w-32 border border-gray-300 rounded-md px-2 py-1"
                />
              )}
            />

            {/* Remove Button */}
            {conditions.length > 1 && (
              <button
                type="button"
                onClick={() => removeCondition(condition.id)}
                className="text-red-500 cursor-pointer"
              >
                <CircleX size={18} />
              </button>
            )}
          </div>
        ))}

        {/* Add Condition Button is Now Clickable */}
        <button
          type="button"
          onClick={addCondition}
          className="bg-blue-500 text-white px-2 py-1 rounded flex items-center gap-1 cursor-pointer"
        >
          <Plus size={15} /> Add Condition
        </button>

        {/* Live Preview of IAM Expression */}
        <div className="mt-4 border border-gray-300 rounded bg-gray-100">
          <Accordion iconClass='absolute -top-2 right-5 bg-white rounded-full text-gray-400' iconSize={16} title='Expand/Collapse'>
            <div className="py-3 overflow-auto max-h-40">
              <pre className="text-sm  px-3">{JSON.stringify(formattedExpression, null, 2)}</pre>
            </div>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default ExpressionBuilder;

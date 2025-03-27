'use client';
import { CircleX, Plus } from "lucide-react";
import React, { useMemo, useEffect } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";

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

interface ExpressionBuilderProps {
  title?: string;
  control: any;
  setValue: any;
  watch: any;
  fieldName: string;
}

const ExpressionBuilder: React.FC<ExpressionBuilderProps> = ({ title, control, setValue, watch, fieldName }) => {
  
  const conditions = useMemo(() => watch(fieldName) || [], [watch(fieldName)]);

  
  useEffect(() => {
    if (!conditions || !Array.isArray(conditions)) {
      setValue(fieldName, []);
    }
  }, [conditions, setValue, fieldName]);

  
  const addCondition = () => {
    const newCondition = {
      id: uuidv4(),
      attribute: null,
      operator: null,
      value: "",
      logicalOp: "AND"
    };

    setValue(fieldName, [...conditions, newCondition], { shouldValidate: true });
  };

  
  const removeCondition = (id: string) => {
    setValue(fieldName, conditions.filter((cond: { id: string }) => cond.id !== id), { shouldValidate: true });
  };

  
  const formattedExpression = conditions.map((cond: any) => ({
    attribute: cond.attribute?.value || "",
    operator: cond.operator?.value || "",
    value: cond.value || "",
    logicalOp: cond.logicalOp || ""
  }));

  return (
    <>
      {title && <h3 className="font-bold">{title}</h3>}
      <div className="p-4 border rounded-md w-full max-w-2xl border-gray-300 relative">
        
        {conditions.map((condition: { id: string }, index: number) => (
          <div key={condition.id || index} className="flex space-x-2 items-center mb-2 justify-end">
            {/* Logical Operator Dropdown (Not shown for first condition) */}
            {index > 0 && (
              <Controller
                name={`${fieldName}.${index}.logicalOp`}
                control={control}
                render={({ field }) => (
                  <Select {...field} options={logicalOperators} placeholder="AND/OR" />
                )}
              />
            )}

            {/* Attribute Dropdown */}
            <Controller
              name={`${fieldName}.${index}.attribute`}
              control={control}
              render={({ field }) => (
                <Select {...field} options={attributes} placeholder="Select Attribute" />
              )}
            />

            {/* Operator Dropdown */}
            <Controller
              name={`${fieldName}.${index}.operator`}
              control={control}
              render={({ field }) => (
                <Select {...field} options={operators} placeholder="Condition" />
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
        <div className="mt-4 p-3 border border-gray-300 rounded bg-gray-100 max-h-40 overflow-auto">
          <pre className="text-sm">{JSON.stringify(formattedExpression, null, 2)}</pre>
        </div>
      </div>
    </>
  );
};

export default ExpressionBuilder;

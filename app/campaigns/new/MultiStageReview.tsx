import React from "react";
import MultiSelect from "@/components/MultiSelect";  // Assuming you already have MultiSelect component
import { UseFormRegister, Control, FieldErrors, FieldError } from "react-hook-form"; // Import types for register
import { customOption, loadUsers } from "@/components/MsAsyncData";
import { asterisk, numberToWords } from "@/utils/utils";
import { CircleMinus, CircleX, InfoIcon } from "lucide-react";

interface StageError {
  reviewer?: FieldError;
  verifyUserAttribute?: FieldError;
}

interface MultiStageReviewProps {
  index: number;
  totalStages: number;
  control: Control<any, any>;
  register: UseFormRegister<any>;
  errors: FieldErrors<{ stages: StageError[] }>;
  removeStage: () => void;
}
   

const MultiStageReview: React.FC<MultiStageReviewProps> = ({ control, register, errors, index, removeStage, totalStages }) => {
  return (
    <div className="stages w-165">
        <h2 className="font-medium mb-3 capitalize flex justify-between items-center">
          {numberToWords(index)} stage Reviewers
          <button
          type="button"
          onClick={removeStage}  // Remove this stage
          className=" text-red-500 rounded-full flex cursor-pointer items-center hover:bg-red-500 hover:text-white"
          title="Remove Stage"
        >
          <CircleMinus size={18} /> 
         
        </button>
        </h2>
        {index > 0 && index === totalStages - 1 && <small className="flex gap-2 py-2"><InfoIcon className=" text-gray-500" size={16} /> Your sum duration of all review stages connot be longer than the recurrence period.</small>}
        <div className="bg-[#F4F5FA]/60 border-1 border-gray-300 p-2 rounded-md">
        <div className={`grid grid-cols-2 items-center mb-2 w-130`}>
          <label className={`${asterisk}`}>Select reviewers</label>
          <MultiSelect
            placeholder="Select Reviewer(s)"
            control={control}  
            isAsync
            loadOptions={loadUsers}
            components={{ Option: customOption }}  
            {...register(`stages.${index}.reviewer`)}
            className="w-96"
          />
           {typeof errors?.stages?.[index]?.reviewer?.message === 'string' && (
            <p className="text-red-500">{errors.stages[index].reviewer.message}</p>
          )}
        </div>
        <div className={`grid grid-cols-2 items-center w-130`}>
          <label className={`${asterisk}`}>Stage duration</label>
          <input
            type="text"
            className="mt-1 bg-white w-96 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            {...register(`stages.${index}.verifyUserAttribute`)}
          />
        </div>
        </div>

      </div>
  );
};

export default MultiStageReview;

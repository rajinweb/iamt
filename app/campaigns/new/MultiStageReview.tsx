import React, { useEffect } from "react";
import MultiSelect from "@/components/MultiSelect";
import { UseFormRegister, Control, FieldErrors, FieldErrorsImpl, FieldValues, UseFormSetValue, UseFormWatch, UseFormUnregister, UseFormResetField } from "react-hook-form";
import { CircleMinus } from "lucide-react";
import { asterisk, reviewersOptions } from "@/utils/utils";

import { FieldError } from "react-hook-form";
import ToggleSwitch from "@/components/ToggleSwitch";
import FileDropzone from "@/components/FileDropzone";
import ExpressionBuilder from "@/components/ExpressionBuilder";

interface StageError {
  reviewer?: FieldError | FieldErrorsImpl<Record<string, unknown>> | { message?: string } | undefined;
  duration?: FieldError | FieldErrorsImpl<Record<string, unknown>> | { message?: string } | undefined;
  
}

interface MultiStageReviewProps {
  index: number;
  control: Control<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors<{ stages: StageError[] }>;
  removeStage: () => void;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  resetField: UseFormResetField<FieldValues>;
  unregister: UseFormUnregister<FieldValues>;
  children?: React.ReactNode;
}

const MultiStageReview: React.FC<MultiStageReviewProps> = ({
  control,
  register,
  errors,
  index,
  removeStage,
  watch,
  setValue,
  resetField,
  unregister,
  children
}) => {
  return (
    <div className={`stages w-full relative`}>
      {index != null && index > 0 && (
        <button
          type="button"
          onClick={removeStage}
          className="absolute -right-6 top-2 text-red-500 rounded-full flex cursor-pointer items-center hover:bg-red-500 hover:text-white"
          title="Remove Stage"
        >
          <CircleMinus size={18} />
        </button>
      )}

      <MultiStageReviewForm
        className={`${
          index > 0 && "bg-[#F4F5FA]/60 border-1 border-gray-300 p-2 rounded-md [&>div]:gap-0"
        }`}
        control={control}
        register={register}
        errors={errors?.stages?.[index] as undefined || {}}
        reviewer={`stages.${index}.reviewer`}
        duration={`stages.${index}.duration`}
        index={index > 0 ? index + 1 : null}
        watch={watch}  
        setValue={setValue} 
        resetField={resetField}
        unregister={unregister}
      >
        {children}
      </MultiStageReviewForm>
    </div>
  );
};  

export default MultiStageReview;

interface MultiStageReviewFormProps {
  className?: string;
  control: Control<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors<Record<string, unknown>>;
  reviewer: string;
  duration: string;
  index?: number | null;
  watch: UseFormWatch<FieldValues>;  
  children?: React.ReactNode;
  setValue: UseFormSetValue<FieldValues>;
  resetField: UseFormResetField<FieldValues>;
  unregister: UseFormUnregister<FieldValues>;
}

export const MultiStageReviewForm: React.FC<MultiStageReviewFormProps> = ({
  className,
  control,
  register,
  errors = {},
  reviewer,
  duration,
  index,
  watch,
  setValue,
  resetField,
  unregister,
  children
}) => {
  const base = `stages.${index}`; 

  const genericExp=`stages.${index}.genericExpression`;

  const checkedReviewerlist=`stages.${index}.reviewerlistIsChecked`;
  const custRevList= `stages.${index}.customReviewerlist`;
  const selectedReviewer=watch(reviewer);
  const reviewerlistIsChecked = watch(checkedReviewerlist);

  const customReviewerlist = watch(`stages.${index}.reviewer`);


  useEffect(() => {
    if (selectedReviewer !== "custom-reviewer") {
      resetField(custRevList);
      setValue(custRevList, null);
      setValue(checkedReviewerlist, false);
    }

    if (!reviewerlistIsChecked) {
      setValue(checkedReviewerlist, null);
    }

    if (reviewerlistIsChecked) {
      setValue(genericExp, [], { shouldValidate: false });
    }
  }, [selectedReviewer, reviewerlistIsChecked]);




  return (
    <div className={className}>
      {/* Reviewers Selection */}
      <div className="grid grid-cols-[280px_1.5fr] items-start gap-2 mb-2">
        <label className={`h-10 items-center flex ${asterisk}`}>Stage {index} Reviewers</label>
        <div>
          <MultiSelect
            name={reviewer}
            isMulti={false}
            placeholder="Select Reviewer(s)"
            control={control}
            options={reviewersOptions}
          />
          {typeof errors.reviewer?.message === "string" && (
            <p className="text-red-500">{errors.reviewer.message}</p>
          )}
      

      {/* Custom Reviewer Logic */}

      {watch(reviewer) === "custom-reviewer" && (
            <>
              <div className="flex items-center gap-1 my-2">
                <span className={`flex items-center ${!reviewerlistIsChecked ? `${asterisk} !pr-0 text-black` : 'text-black/50'}`}>
                  Write a generic Expression
                </span>
                <ToggleSwitch
                  checked={reviewerlistIsChecked}
                  onChange={(checked) => {
                    setValue(checkedReviewerlist, checked, { shouldValidate: true });
                  }}
                  className="scale-80"
                />
                <span className={`flex items-center ${reviewerlistIsChecked ? `${asterisk} !pr-0 text-black` : 'text-black/50'}`}>
                  Upload a custom reviewer list
                </span>
              </div>

              {reviewerlistIsChecked ? (
                <FileDropzone name={custRevList} control={control} />
              ) : (
                <>
                  <ExpressionBuilder
                    control={control}
                    setValue={setValue}
                    watch={watch}
                    fieldName={genericExp}
                  />
                  {errors?.genericExpression?.message && (
                    <p className="text-red-500">{String(errors.genericExpression.message)}</p>
                  )}
                </>
              )}
            </>
          )}
  </div>
  </div>
      {/* Duration Input */}
      <div className="grid grid-cols-[280px_1.5fr] items-start gap-2">
        <label className={`h-10 items-center flex ${asterisk}`}>Stage {index} Duration (days)</label>
        <div>
          <input
            type="text"
            className="form-input bg-white"
            {...register(duration)}
          />
          {errors.duration?.message &&
            typeof errors.duration?.message === "string" && (
              <p className="text-red-500">{errors.duration.message}</p>
            )}
          {children}
        </div>
      </div>
    </div>
  );
};

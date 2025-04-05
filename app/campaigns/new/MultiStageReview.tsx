import React, { useEffect } from "react";
import MultiSelect from "@/components/MultiSelect";
import { Path, FieldValues, Control, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { CircleMinus } from "lucide-react";
import { asterisk, reviewersOptions } from "@/utils/utils";
import ToggleSwitch from "@/components/ToggleSwitch";
import FileDropzone from "@/components/FileDropzone";
import ExpressionBuilder from "@/components/ExpressionBuilder";
import { MultiStageReviewFormProps, MultiStageReviewProps, Step3FormData } from "@/types/StepTypes";

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
  children,
}) => {
  const base = `stages.${index}`;
  const reviewer = `${base}.reviewer`;
  const duration = `${base}.duration` as Path<Step3FormData>;
  return (
    <div className="stages w-full relative">
      {index > 0 && (
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
          index > 0
            ? "bg-[#F4F5FA]/60 border-1 border-gray-300 p-2 rounded-md [&>div]:gap-0"
            : ""
        }`}
        control={control as Control<Step3FormData>}
        register={register}
        errors={(errors as { stages?: Record<number, unknown> })?.stages?.[index] || {}}
        reviewer={reviewer}
        duration={duration}
        index={index}
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

const MultiStageReviewForm: React.FC<MultiStageReviewFormProps> = ({
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
  children,
}) => {
  const base = `stages.${index}` as const;
  const genericExp = `${base}.genericExpression` as const;
  const checkedReviewerlist = `${base}.reviewerlistIsChecked` as const;
  const custRevList = `${base}.customReviewerlist` as const;

  const selectedReviewer = watch(reviewer as Path<Step3FormData>);
  const reviewerlistIsChecked = watch(checkedReviewerlist);

  useEffect(() => {
    if (selectedReviewer !== "custom-reviewer") {
      resetField(custRevList);
      unregister(custRevList);
      unregister(genericExp);
      setValue(checkedReviewerlist, false);
    } else {
      if (reviewerlistIsChecked) {
        unregister(genericExp);
        setValue(genericExp, [], { shouldValidate: true });
      } else {
        unregister(custRevList);
        setValue(custRevList, null);
      }
    }
  }, [selectedReviewer, reviewerlistIsChecked]);

  return (
    <div className={className}>
  
      <div className="grid grid-cols-[280px_1.5fr] items-start gap-2 mb-2">
        <label className={`h-10 items-center flex ${asterisk}`}>Stage {index} Reviewers</label>
        <div>
          <MultiSelect
            name={reviewer}
            isMulti={false}
            placeholder="Select Reviewer(s)"
            control={control as unknown as Control<FieldValues>}
            options={reviewersOptions}
          />
          {errors?.reviewer?.message && (
            <p className="text-red-500">{String(errors.reviewer.message)}</p>
          )}

          {selectedReviewer === "custom-reviewer" && (
            <>
              <div className="flex items-center gap-1 my-2">
                <span className={`flex items-center ${!reviewerlistIsChecked ? `${asterisk} text-black` : "text-black/50"}`}>
                  Write a generic Expression
                </span>
                <ToggleSwitch
                  checked={reviewerlistIsChecked ?? false}
                  onChange={(checked) =>
                    setValue(checkedReviewerlist, checked, { shouldValidate: true })
                  }
                  className="scale-80"
                />
                <span className={`flex items-center ${reviewerlistIsChecked ? `${asterisk} text-black` : "text-black/50"}`}>
                  Upload a custom reviewer list
                </span>
              </div>

              {reviewerlistIsChecked ? (
                <FileDropzone name={custRevList} control={control as unknown as Control<FieldValues>} />
              ) : (
                <>
                  <ExpressionBuilder
                    control={control as unknown as Control<FieldValues>}
                    setValue={setValue as unknown as UseFormSetValue<FieldValues>}
                    watch={watch  as unknown as UseFormWatch<FieldValues>}
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
          <input type="text" className="form-input bg-white" {...register(duration as Path<Step3FormData>)} />
          {errors?.duration?.message && (
            <p className="text-red-500">{String(errors.duration.message)}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

import { CirclePlus, Info, InfoIcon } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MultiSelect from "@/components/MultiSelect";
import { loadUsers, customOption } from "@/components/MsAsyncData";
import { asterisk, durationOptions, recurrenceOptions } from "@/utils/utils";
import DateInput from "@/components/DatePicker";
import MultiStageReview from "./MultiStageReview";

interface Step3Props {
  formData: any;
  setFormData: (data: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

const validationSchema = yup.object().shape({ 
  multiStageReview: yup.boolean().default(false), 
  reviewer: yup.array().when("multiStageReview", {
    is: false, 
    then: (schema) => schema.min(1, "Select at least one reviewer").required(),
    otherwise: (schema) => schema.min(0, "Select at least one reviewer").notRequired(),
  }),

  stages: yup.array().when("multiStageReview", {
    is: true,
    then: (schema) =>
      schema
        .min(1, "At least one stage is required")
        .of(
          yup.object().shape({
            reviewer: yup.array().min(1, "Each stage must have at least one reviewer").required(),
            verifyUserAttribute: yup.string().required("Verification is required"),
            showPreviousResults: yup.boolean(),
          })
        )
        .required(),
    otherwise: (schema) => schema.notRequired(),
  }),

  duration: yup.string().required("Duration is required"),
  reviewRecurrence: yup.string().required("Review recurrence is required"),
  startDate: yup.date().nullable().required("Start date is required"),
  end: yup.string().required("End is required"),
});



const Step3: React.FC<Step3Props> = ({ formData, setFormData, onValidationChange }) => {
  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: formData.step3,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "stages", 
  });

  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  useEffect(() => {
    const subscription = watch((values) => {
      return setFormData({...formData, step3:values})
    });
    
    return () => subscription.unsubscribe();
  }, [watch, setFormData]);


  return (
    <>
    <h2 className="text-lg font-bold">Approval Workflow</h2>
    <small className="text-gray-600 block mb-6">
    Determine review stages, reviewers, and timeline below.
    </small>
 
      <div className="mb-10 flex items-center gap-32 text-sm">
          <span className="flex gap-2 items-center">  Multi-stage Review <InfoIcon className=" text-gray-500" size={16} /></span>
          <input type="checkbox"  className="scale-130" {...register("multiStageReview")} />
      </div>
      {/* if multiStageReview off */}
      {!watch("multiStageReview") && 
        <>
        <h2 className="font-medium mb-6 mt-12">
          Specify Reviewers
        </h2>
         <div className={`grid grid-cols-2 items-center mb-2 w-138 text-sm`}>
          <label className={`pl-2 ${asterisk}`}>Select reviewers</label>
          <div> 
          <MultiSelect className="w-107" placeholder="Select Reviewer(s)" control={control} isAsync loadOptions={loadUsers}  components={{ Option: customOption }} {...register("reviewer")}/>
            {errors.reviewer?.message && typeof errors.reviewer.message === 'string' && (
            <p className="text-red-500">{errors.reviewer.message}</p>
          )}
           </div> 
        </div>
        <div className={`grid grid-cols-2 items-center mb-2 w-138 text-sm`}>
          <span className="flex gap-2 items-center pl-2">  Fallback reviewers <InfoIcon className=" text-gray-500" size={16} /></span>
          <span className="text-blue-500">+ Select fallback reviewers</span>
        </div>
      </>
      }
    {/* if multiStageReview on */}
    {watch("multiStageReview") && 
    <div className="text-sm">
      <div className="space-y-5">
      {fields.map((item, index) => (
          <MultiStageReview
            totalStages={watch("stages").length} 
            index={index}  // Pass the index for each stage
            control={control}
            register={register}
            errors={errors}
            removeStage={() => remove(index)}  // Remove stage by index
            key={item.id}
          />
    
      ))}
      </div>
     <button
        type="button"
        onClick={() => append({ reviewer: "", verifyUserAttribute: "", showPreviousResults: false })}
        className="mt-4 flex gap-2 text-blue-500 cursor-pointer group "
      >
        <CirclePlus size={18} className="group-hover:bg-blue-500 rounded-full group-hover:text-white"/> 
        Add a stage
     </button>

      <h2 className="font-medium mb-4 mt-12"> Reveal review results </h2>
      <div className="flex items-center gap-2 w-115 justify-between">
        <span className="flex items-center gap-2">Show previous stage(s) decisions to later stage reviewers <InfoIcon className=" text-gray-500" size={16} /></span>
        <input type="checkbox" className="scale-130" {...register("showPreviousResults")} />
      </div>
    </div>
    }

    <h2 className="font-medium mb-6 mt-12">
      Specify recurrence of review
      {watch("multiStageReview") &&  <small className="flex gap-2 py-2"><InfoIcon className=" text-gray-500" size={16} /> Your sum duration of all review stages connot be longer than the recurrence period.</small>}
    </h2>
        <div className={`grid grid-cols-2 items-center mb-2 w-138 text-sm`}>
        <label className={`px-2 ${asterisk}`}>Duration</label>
        <div>        
          <MultiSelect className="w-107" isSearchable={false} isMulti={false} control={control} options={durationOptions} {...register("duration")}/>
        {errors.duration?.message && typeof errors.duration.message === 'string' && (
          <p className="text-red-500">{errors.duration.message}</p>
        )}
        </div>

      </div>
        <div className={`grid grid-cols-2 items-center mb-2 w-138 text-sm`}>
            <label className={`px-2 ${asterisk}`}>Review Recurrence</label>
            <MultiSelect className="w-107" isSearchable={false} isMulti={false} control={control} options={recurrenceOptions} {...register("reviewRecurrence")}/>
            {errors.duration?.message && typeof errors.duration.message === 'string' && (
              <p className="text-red-500">{errors.duration.message}</p>
            )}
        </div>
        <div className={`grid grid-cols-2 items-center mb-2 w-138 text-sm`}>
            <label className={`px-2 ${asterisk}`}>Start Date</label>
             
             <DateInput
              control={control}
              name="startDate"
              className="w-107 px-2 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              
            />
        </div>
        <div className={`grid grid-cols-2 items-center mb-2 w-138 text-sm`}>
          <label className={`px-2 ${asterisk}`}>End</label>
            <div className="w-110">
              {["Never", "On specific date", "After number of occurences"].map((option, index) => (
                <button
                  key={option}
                  type="button"
                  className={`px-4 py-2 rounded-md border border-gray-300 ${
                    watch("end") === option ? "bg-[#15274E] text-white" : ""
                  } ${index === 0 ? "rounded-r-none" : index === 1 ? "rounded-none border-r-0  border-l-0 px-4.5" : "rounded-l-none"}`}
                  onClick={() => setValue("end", option, { shouldValidate: true })}
                >
                  {option}
                </button> 
              ))}
            </div>
        </div>
 
    </>
  );
};

export default Step3;

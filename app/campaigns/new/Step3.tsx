import { CirclePlus, Info, InfoIcon } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm, Resolver, Control, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MultiSelect from "@/components/MultiSelect";
import { asterisk, durationOptions, recurrenceOptions } from "@/utils/utils";
import DateInput from "@/components/DatePicker";
import MultiStageReview from "./MultiStageReview";
import { Step3FormData, StepProps } from "@/types/StepTypes";

const validationSchema = yup.object().shape({ 
  multiStageReview: yup.boolean().default(false), 
  stages: yup.array()
  .min(1, "At least one stage is required")
  .of(
    yup.object().shape({
      reviewer: yup.array().min(1, "Each stage must have at least one reviewer").required(),
      duration: yup.string().required("Duration is required"),
      nextReviewerAction: yup.boolean(),
    })
  ).required("Stages are required"),

  duration: yup.string().required("Duration is required"),
  reviewRecurrence: yup.string().required("Review recurrence is required"),
  startDate: yup.date().nullable().required("Start date is required"),
  end: yup.string().required("End is required"),
});



const Step3: React.FC<StepProps> = ({ formData, setFormData, onValidationChange }) => {
  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<Step3FormData>({
     resolver: yupResolver(validationSchema) as Resolver<Step3FormData>,
    mode: "onChange",
    defaultValues: {
      ...formData.step3,
      stages: formData.step3?.stages ?? [],
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "stages", 
  });

  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  useEffect(() => {
    const subscription = watch((values) => setFormData({ ...formData, step3: values as Step3FormData }));
    return () => subscription.unsubscribe();
  }, [watch, setFormData]);

  const multiStageReviewEnabled = watch("multiStageReview");
  useEffect(() => {
    if (fields.length === 0 || multiStageReviewEnabled ) {
        append({ reviewer: [], duration: "", nextReviewerAction: false }) // enable default MultiStageReview
    }
   
    if (!multiStageReviewEnabled && fields.length > 0 ) {
      fields.forEach((_, index) => {
        if (index > 0) remove(fields.length - index);
      });
    }
  },[multiStageReviewEnabled]);

  return (
    <div className="py-6">
    <h2 className="text-lg font-bold">Approval Workflow</h2>
      <small className="text-gray-600 block mb-6">
      Determine review stages, reviewers, and timeline below.
      </small>
      <div className="text-sm space-y-4 min-w-max lg:w-1/2">
      
       <div className="grid grid-cols-[280px_1.5fr] items-center gap-2 mb-10">
          <span className="flex gap-2 items-center">  Multi-stage Review <InfoIcon className=" text-gray-500" size={16} /></span>
          <div><input type="checkbox"  className="scale-130" {...register("multiStageReview")} /></div>
      </div>
      
       {
        fields.map((item, index) => {
          const totalStages = watch("stages")?.length || 0;
          return (    
            <div key={item.id+1}>     
              <MultiStageReview
                totalStages={totalStages} 
                index={index}  
                control={control as unknown as Control<FieldValues>}
                register={register}
                errors={errors}
                removeStage={() => remove(index)}  
                children={
                   index < fields.length - 1 && ( 
                    <div className="my-2 flex items-center gap-2 px-1">
                      <input type="checkbox" className="scale-130" {...register(`stages.${index}.nextReviewerAction`)} />
                      Show action to next reviewer <InfoIcon className="text-gray-500" size={16} />
                    </div>
                  )
                }
              />

            </div> 
            )

         })
        }
        { watch("multiStageReview") &&
          <button
              type="button"
              onClick={() => {
                append({ reviewer: [], duration: "", nextReviewerAction: false })                
              }}
              className="mt-4 flex gap-2 text-blue-500 cursor-pointer group "
            >
          <CirclePlus size={18} className="group-hover:bg-blue-500 rounded-full group-hover:text-white"/> 
          Add a stage
          </button>
      }
    <h2 className="font-medium mb-6 mt-12">
      Specify recurrence of review
      {watch("multiStageReview") &&  <small className="flex gap-2 py-2"><InfoIcon className=" text-gray-500" size={16} /> Your sum duration of all review stages connot be longer than the recurrence period.</small>}
    </h2>
      <div className="grid grid-cols-[280px_1.5fr] items-center gap-2 mb-2">
        <label className={`px-2 ${asterisk}`}>Duration</label>
        <div>        
          <MultiSelect className="w-107" isSearchable={false} isMulti={false} control={control as unknown as Control<FieldValues>} options={durationOptions} {...register("duration")}/>
        {errors.duration?.message && typeof errors.duration.message === 'string' && (
          <p className="text-red-500">{errors.duration.message}</p>
        )}
        </div>

      </div>
        <div className="grid grid-cols-[280px_1.5fr] items-center gap-2 mb-2">
            <label className={`px-2 ${asterisk}`}>Review Recurrence</label>
            <MultiSelect className="w-107" isSearchable={false} isMulti={false} control={control as unknown as Control<FieldValues>} options={recurrenceOptions} {...register("reviewRecurrence")}/>
            {errors.reviewRecurrence?.message && typeof errors.reviewRecurrence.message === 'string' && (
              <p className="text-red-500">{errors.reviewRecurrence.message}</p>
            )}
        </div>
        <div className="grid grid-cols-[280px_1.5fr] items-center gap-2 mb-2">
            <label className={`px-2 ${asterisk}`}>Start Date</label>
             
             <DateInput
              control={control as unknown as Control<FieldValues>}
              name="startDate"
              className="w-107 px-2 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              
            />
        </div>
        <div className="grid grid-cols-[280px_1.5fr] items-center gap-2 mb-2">
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
 
      </div>
    </div>
  );
};

export default Step3;

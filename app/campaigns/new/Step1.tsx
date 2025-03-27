import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MultiSelect from "@/components/MultiSelect";
import { loadUsers, customOption } from "@/components/MsAsyncData";
import { asterisk, template } from "@/utils/utils";

interface Step1Props {
  formData: any;
  setFormData: (data: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

const validationSchema = yup.object().shape({
  certificationName: yup.string().required("Campaign Name is required"),
  description: yup.string().required("Description is required"),
  template: yup.string(),
  duration: yup
    .string()
    .required("Duration is required")
    .test("is-number", "Duration must be a valid number", (value) => {
      return /^\d+$/.test(value.trim()); // Ensures only numbers are entered
    })
    .test("is-greater-than-1", "Duration must be greater than 1", (value) => {
      return Number(value) > 1; // Ensures number is greater than 1
    }),
  ownerType: yup.string().required("Owner Type is required"),

  ownerUser: yup
    .array()
    .when("ownerType", {
      is: "User",
      then: (schema) => schema.min(1, "Select at least one owner").required(),
      otherwise: (schema) => schema.notRequired(),
    }),

  ownerGroup: yup
    .array()
    .when("ownerType", {
      is: "Group",
      then: (schema) => schema.min(1, "Select at least one group").required(),
      otherwise: (schema) => schema.notRequired(),
    }),

  reviewer: yup.string().required("Reviewer is required"),
});


const Step1: React.FC<Step1Props> = ({ formData, setFormData, onValidationChange }) => {
  const {
    register,
    setValue,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      ...formData.step1, // Pre-fill data when returning to step
      ownerType: "User",
    }
  });

  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  useEffect(() => {
    const subscription = watch((values) => setFormData({...formData, step1:values}));
    return () => subscription.unsubscribe();
  }, [watch, setFormData]);

  // **CLEAR THE OTHER FIELD WHEN OWNER TYPE CHANGES**
  const ownerType = watch("ownerType");
  useEffect(() => {
    if (ownerType === "User") {
      setValue("ownerGroup", [], { shouldValidate: true });
    } else if (ownerType === "Group") {
      setValue("ownerUser", [], { shouldValidate: true });
    }
  }, [ownerType, setValue]);

  return (
    <div className="py-6">
      <h2 className="text-lg font-bold">Create an access review campaign</h2>
      <small className="text-gray-600 block mb-6">
        Name your new campaign and set its ownership and rules.
      </small>

    <div className="text-sm space-y-4 min-w-max lg:w-1/2">
      
      <div className={`grid grid-cols-[280px_1.5fr] gap-2`}>
        <label className={`pl-2 ${asterisk}`}>Certification Name</label>
        <div>
          <input
            type="text"
            className="form-input"
            {...register("certificationName")}
          />
          {errors.certificationName?.message && typeof errors.certificationName.message === 'string' && (
            <p className="text-red-500">{errors.certificationName.message}</p>
          )}
        
        </div>
      </div>

      <div className={`grid grid-cols-[280px_1.5fr] gap-2`}>
        <label className={`pl-2 ${asterisk}`}>Description</label>
        <div>
        <textarea
          className="form-input"
          rows={3}
          {...register("description")}
        ></textarea>
        {errors.description?.message && typeof errors.description.message === 'string' && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
        </div>
      </div>

      <div className={`grid grid-cols-[280px_1.5fr] gap-2`}>
        <label className={`pl-2`}>Copy from Template</label>
         <div className="grid grid-cols-[1fr_.5fr] gap-2">
          <MultiSelect isMulti={false} control={control} options={template} {...register("template")}/>
          {errors.template?.message && typeof errors.template.message === 'string' && (
            <p className="text-red-500">{errors.template.message}</p>
          )}

          <button className="rounded  bg-blue-500 hover:bg-blue-500/80 text-white ">Apply</button>
        </div>
      </div>

      <div className={`grid grid-cols-[280px_1.5fr] gap-2`}>
        <label className={`pl-2 ${asterisk}`}>Duration</label>
        <div>
        <input
            type="text"
            className="form-input"
            {...register("duration")}
          />
            {errors.duration?.message && typeof errors.duration.message === 'string' && (
            <p className="text-red-500">{errors.duration.message}</p>
          )}
        </div>
      </div>

      <div className={`grid grid-cols-[280px_1.5fr] gap-2`}>
        <label className={`pl-2 ${asterisk}`}>Owners</label>
        <div>
  
          {["User", "Group"].map((option, index, array) => (
            <button
              key={option}
              type="button"
              className={`px-4 relative py-2 mb-3 min-w-16 rounded-md border border-gray-300 ${
                watch("ownerType") === option ? "bg-[#15274E] text-white" : ""
              } ${index === 0 && "rounded-r-none"} ${array.length > 2 && index === 1 && "rounded-none border-r-0  border-l-0 "} ${index === array.length-1 && "rounded-l-none"}`}
              onClick={() => setValue("ownerType", option, { shouldValidate: true })}
            >
              {option}  
              {watch("ownerType") === option && <span className="absolute -bottom-2 left-[25px] peer-checked:left-[100px] transition-all duration-300 w-0 h-0
                        border-l-[10px] border-l-transparent 
                        border-r-[10px] border-r-transparent 
                        border-t-[10px] border-t-[#15274E]">
            </span>}
            </button>
          ))}

          {watch("ownerType") === "User" && 
          <><MultiSelect className="max-w-[420px]" control={control} isAsync loadOptions={loadUsers}  components={{ Option: customOption }} {...register("ownerUser")}/>
            {errors.ownerUser?.message && typeof errors.ownerUser.message === 'string' && (
            <p className="text-red-500">{errors.ownerUser.message}</p>
            )}</>
            }
          {watch("ownerType") === "Group" && 
          <><MultiSelect className="max-w-[420px]"  control={control} isAsync loadOptions={loadUsers}  components={{ Option: customOption }} {...register("ownerGroup")}/>
            {errors.ownerGroup?.message && typeof errors.ownerGroup.message === 'string' && (
            <p className="text-red-500">{errors.ownerGroup.message}</p>
            )}</>
            }
        </div>
      </div>

      <div className={`grid grid-cols-[280px_1.5fr] gap-2`}>
        <label className={`pl-2 ${asterisk}`}>Reviewer</label>
        <div>
          {["User Manager", "Application Owner", "Custom Reviewer"].map((option, index) => (
            <button
              key={option}
              type="button"
              className={`px-4 py-2 rounded-md border border-gray-300 ${
                watch("reviewer") === option ? "bg-[#15274E] text-white" : ""
              } ${index === 0 ? "rounded-r-none" : index === 1 ? "rounded-none border-r-0  border-l-0 w-37 !px-2.5" : "rounded-l-none"}`}
              onClick={() => setValue("reviewer", option, { shouldValidate: true })}
            >
              {option}
            </button>
          ))}
        </div>
        {errors.reviewer?.message && typeof errors.reviewer.message === 'string' && (
          <p className="text-red-500">{errors.reviewer.message}</p>
        )}
      </div>

    </div>
  </div>
  );
};

export default Step1;

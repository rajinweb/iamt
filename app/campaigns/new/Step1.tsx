import { ChevronDown, Search } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MultiSelect from "@/components/MultiSelect";
import { loadUsers, customOption } from "@/components/MsAsyncData";
import { asterisk, durationOptions } from "@/utils/utils";
interface Step1Props {
  formData: any;
  setFormData: (data: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

const validationSchema = yup.object().shape({
  campaignName: yup.string().required("Campaign Name is required"),
  duration: yup.string().required("Duration is required"),
  description: yup.string().required("Description is required"),
  owner: yup.array().min(1, "Select at least one owner").required(),
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
    defaultValues: formData.step1, // Pre-fill data when returning to step
  });

  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  useEffect(() => {
    const subscription = watch((values) => setFormData({...formData, step1:values}));
    return () => subscription.unsubscribe();
  }, [watch, setFormData]);

  return (
    <div className="py-6">
      <h2 className="text-lg font-bold">Create an access review campaign</h2>
      <small className="text-gray-600 block mb-6">
        Name your new campaign and set its ownership and rules.
      </small>

      <div className={`grid grid-cols-2 items-center mb-2 w-138 text-sm`}>
        <label className={`pl-2 ${asterisk}`}>Campaign Name</label>
        <div>
        <input
          type="text"
          className="mt-1 w-107 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          {...register("campaignName")}
        />
        {errors.campaignName?.message && typeof errors.campaignName.message === 'string' && (
          <p className="text-red-500">{errors.campaignName.message}</p>
        )}
        </div>
      </div>

      <div className={`grid grid-cols-2 items-center mb-2 w-138 text-sm`}>
        <label className={`pl-2 ${asterisk}`}>Description</label>
        <div>
        <textarea
          className="mt-1 w-107 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          {...register("description")}
        ></textarea>
        {errors.description?.message && typeof errors.description.message === 'string' && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
        </div>
      </div>

      <div className={`grid grid-cols-2 items-center mb-2 w-138 text-sm`}>
        <label className={`pl-2 ${asterisk}`}>Duration</label>
        <div>
          <MultiSelect className="w-107"  isSearchable={false} isMulti={false} control={control} options={durationOptions} {...register("duration")}/>
          {errors.duration?.message && typeof errors.duration.message === 'string' && (
            <p className="text-red-500">{errors.duration.message}</p>
          )}
        </div>
      </div>

      <div className={`grid grid-cols-2 items-center mb-2 w-138 text-sm`}>
        <label className={`pl-2 ${asterisk}`}>Owners</label>
        <div>
        <MultiSelect className="w-107"  control={control} isAsync loadOptions={loadUsers}  components={{ Option: customOption }} {...register("owner")}/>
        {errors.owner?.message && typeof errors.owner.message === 'string' && (
          <p className="text-red-500">{errors.owner.message}</p>
        )}
        </div>
      </div>

      <div className={`grid grid-cols-2 items-center mb-2 w-138 text-sm`}>
        <label className={`pl-2 ${asterisk}`}>Reviewer</label>
        <div className="w-110">
          {["User Manager", "Application Owner", "Custom Reviewer"].map((option, index) => (
            <button
              key={option}
              type="button"
              className={`px-4 py-2 rounded-md border border-gray-300 ${
                watch("reviewer") === option ? "bg-[#15274E] text-white" : ""
              } ${index === 0 ? "rounded-r-none" : index === 1 ? "rounded-none  border-r-0  border-l-0 px-5" : "rounded-l-none"}`}
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
  );
};

export default Step1;

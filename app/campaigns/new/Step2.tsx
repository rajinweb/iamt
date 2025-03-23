import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MultiSelect from "@/components/MultiSelect";
import { loadUsers, customOption, loadApps } from "@/components/MsAsyncData";
import FileDropzone from "@/components/FileDropzone";
import ToggleSwitch from "@/components/ToggleSwitch";
import { asterisk } from "@/utils/utils";
interface Step2Props {
  formData: any;
  setFormData: (data: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

const validationSchema = yup.object().shape({
  users: yup.array().min(1, "Select at least one user").required(),
  apps: yup.array().min(1, "Select at least one application").required(),
  reviewer: yup.string().required("Reviewer is required"),
  reviewerlistIsChecked: yup.boolean(),
  genricExpression: yup.string().when("reviewerlistIsChecked", (reviewerlistIsChecked) => 
    reviewerlistIsChecked ?  yup.string().notRequired() : yup.string().required("Generic Expression is required")
    ),
  customReviewerlist: yup.string().when("reviewerlistIsChecked", (reviewerlistIsChecked) => 
      reviewerlistIsChecked ?  
      yup.mixed().test("fileRequired", "A file must be uploaded", (value) => {
        return value instanceof File; 
      }).required("A file must be uploaded")
      : yup.mixed().notRequired()
    )
});

const Step2: React.FC<Step2Props> = ({ formData, setFormData, onValidationChange }) => {
  const {
    register,
    setValue,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: formData.step2,
  });
  
  useEffect(() => {
    onValidationChange(isValid || !!watch("genricExpression"));
  }, [isValid, watch("genricExpression"), onValidationChange]);

  useEffect(() => {
    const subscription = watch((values) => setFormData({...formData, step2:values}));
    return () => subscription.unsubscribe();
  }, [watch, setFormData]);

  return (
    <>
        <h2 className="text-lg font-bold">Campaign Scope</h2>
          <small className="text-gray-600 block mb-6">
           Name your new campaign and set its ownership and rules.
         </small>
            
         <div className={`grid grid-cols-2 items-center mb-2 w-138 text-sm`}>
          <label className={`pl-2 ${asterisk}`}>Select User</label>
          <MultiSelect className="w-107" placeholder="Select User(s)" control={control} isAsync loadOptions={loadUsers}  components={{ Option: customOption }} {...register("users")}/>
          {errors.users?.message && typeof errors.users.message === 'string' && (
          <p className="text-red-500">{errors.users.message}</p>
        )}
        </div>

        <div className={`grid grid-cols-2 items-center mb-2 w-138 text-sm`}>
          <label className={`pl-2 ${asterisk}`}>Select Application</label>
          <MultiSelect className="w-107" placeholder="Select App(s)" control={control} isAsync loadOptions={loadApps}  components={{ Option: customOption }} {...register("apps")}/>
          {errors.apps?.message && typeof errors.apps.message === 'string' && (
          <p className="text-red-500">{errors.apps.message}</p>
           )}
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
        </div>
  
        <div className={`grid grid-cols-2 items-center mb-2 w-138 text-sm`}>  
          <div className=" ml-69 col-span-2 w-107">
            <div className="flex items-center gap-1 my-2">
              <span className={`flex items-center ${!watch("reviewerlistIsChecked") ? `${asterisk} !pr-0 text-black` : 'text-black/50'}`}>Write a generic Expression</span>
              <ToggleSwitch
                  iconEnable
                  checked={watch("reviewerlistIsChecked")}
                  onChange={(checked) => {
                    setValue("reviewerlistIsChecked", checked, { shouldValidate: true });
                  }}
                  className="scale-80"
                />
              <span className={`flex items-center ${watch("reviewerlistIsChecked") ? `${asterisk} !pr-0 text-black` : 'text-black/50'}`}>Upload a custom reviewer list</span>
            </div>
        
            {watch("reviewerlistIsChecked") && <FileDropzone name="customReviewerlist" control={control} />}
            {!watch("reviewerlistIsChecked") && <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows={2 }
              {...register("genricExpression")}
            />}
            </div>
        </div>
    </>
  );
};

export default Step2;

import { InfoIcon, Mail, Search } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ToggleSwitch from "@/components/ToggleSwitch";
import MultiSelect from "@/components/MultiSelect";
import { asterisk, beforeReminders, enforceComments } from "@/utils/utils";
import { customOption, loadUsers } from "@/components/MsAsyncData";


interface Step4Props {
  formData: any;
  setFormData: (data: any) => void;
  onValidationChange: (isValid: boolean) => void;
}


const validationSchema = yup.object().shape({
  // Notifications
  socIsChecked: yup.boolean(),
  socReminders: yup.array().when("socIsChecked", (socIsChecked) => 
    socIsChecked ? yup.array().min(1, "Select at least one user").required() : yup.array().notRequired()
  ),
  eocIsChecked: yup.boolean(),
  eocReminders: yup.array().when("eocIsChecked", (eocIsChecked) => 
    eocIsChecked ? yup.array().min(1, "Select at least one user").required() : yup.array().notRequired()
  ),
  msTeamsNotification: yup.boolean(),
  allowDownloadUploadCropNetwork: yup.boolean(),

  // Campaign Management
  markUndecidedRevoke: yup.boolean(),
  disableBulkAction: yup.boolean(),
  enforceComments: yup.array().min(1, "Select at least one user").required(),

  genricExpression: yup.string().when("enforceComments", (enforceComments) => 
    enforceComments.includes("Custom Fields") ? yup.string().required("Generic Expression is required") : yup.string().notRequired()
  ),

  // Advanced Setting
  certifierUnavailableUsers: yup.array().min(1, "Select at least one user").required(),
  ticketConditionalApproval: yup.boolean(),
  authenticationSignOff: yup.boolean(),
  generatePin: yup.string().when("authenticationSignOff", (authenticationSignOff) => 
    authenticationSignOff ? yup.string().required("User Pin is required") : yup.string().notRequired()
  ),
  verifyUserAttribute: yup.string().when("authenticationSignOff", (authenticationSignOff) => 
    authenticationSignOff ? yup.string().required("User Attribute is required") : yup.string().notRequired()
  ),
  applicationScope: yup.boolean(),
});


const Step4: React.FC<Step4Props> = ({ formData, setFormData, onValidationChange }) => {
  const {
    register,
    setValue,
    getValues,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: formData.step4,
  });

  useEffect(() => {
    onValidationChange(Object.keys(errors).length === 0);
  }, [errors, onValidationChange]);

  useEffect(() => {
    const subscription = watch((values) => setFormData({...formData, step4:values}));
    return () => subscription.unsubscribe();
  }, [watch, setFormData]);

  const enforceCommentsValue = watch("enforceComments");

  return (
  <>
    <h2 className="text-lg font-bold">General Settings</h2>
      <small className="text-gray-600 block mb-6">
        Determine Settings for Notification, Campaign Management and others.
      </small>
   
    <h2 className="font-medium"> Notification(s) </h2>
    <dl className="px-4 py-8 border-b border-gray-300 space-y-4 mb-8 text-sm">
        <dt>Enable Email notification for:- </dt>
        <dd className="grid grid-cols-2 px-6">
          <label className="flex gap-4 items-center w-44">
            <span className="w-34">Start of Campaign</span>
            <input type="checkbox" className="scale-130"  {...register("socIsChecked")} />
          </label>
          <div>
          <MultiSelect isDisabled={!watch("socIsChecked")} defaultValue={[beforeReminders[0]]} isSearchable={false}  control={control} options={beforeReminders} {...register("socReminders")}/>
          {errors.socReminders?.message && typeof errors.socReminders.message === 'string' && (
            <p className="text-red-500">{errors.socReminders.message}</p>
          )}
          </div>
        </dd>
        <dd className="grid grid-cols-2 px-6">
           <label className="flex gap-4 items-center w-44">
              <span className="w-34">End of Campaign</span>
              <input type="checkbox" className="scale-130" {...register("eocIsChecked")} />
           </label>
           <div>
          <MultiSelect isDisabled={!watch("eocIsChecked")} defaultValue={[beforeReminders[0]]} isSearchable={false}  control={control} options={beforeReminders} {...register("eocReminders")}/>
          {errors.eocReminders?.message && typeof errors.eocReminders.message === 'string' && (
            <p className="text-red-500">{errors.eocReminders.message}</p>
          )}
           </div>
        </dd>
        <dd className="grid grid-cols-2">
          <span>Integrate with Microsoft Teams for notification(s)</span>
          <span className="flex gap-2 items-center">
            No<ToggleSwitch checked={watch("msTeamsNotification")} onChange={(checked) => setValue("msTeamsNotification", checked)} />Yes
          </span>
        </dd>
        <dd className="grid grid-cols-2">
          <span className="flex gap-2 items-center"> 
            Only allow Download/Upload on “Sharepoint/Corporate Network”
             <InfoIcon className=" text-gray-500" size={16} />
          </span>
          <span>
            <input type="checkbox" className="scale-130" {...register("allowDownloadUploadCropNetwork")}/>
          </span>
        </dd>
    </dl>
    <h2 className="font-medium">
    Campaign Management
    </h2>
    <dl className="px-4 py-8 border-b border-gray-300 space-y-4 mb-8 grid grid-cols-2 text-sm">
          <dt> Mark all undecided access as Revoke</dt> 
          <dd className="flex gap-2 items-center"> No<ToggleSwitch checked={watch("markUndecidedRevoke")} onChange={(checked) => setValue("markUndecidedRevoke", checked)} />Yes </dd>
          <dt> Disable Bulk Action</dt> 
          <dd className="flex gap-2 items-center"> No<ToggleSwitch checked={watch("disableBulkAction")} onChange={(checked) => setValue("disableBulkAction", checked)} />Yes </dd>
          <dt>Enforce Comments/Justification on </dt>
          <dd>
            <MultiSelect isSearchable={false} isMulti={false} control={control} options={enforceComments} {...register("enforceComments")}/>
            {errors.socReminders?.message && typeof errors.socReminders.message === 'string' && (
              <p className="text-red-500">{errors.socReminders.message}</p>
            )}
          </dd>

          {enforceCommentsValue =="Custom Fields" && 
          <>
           <dt> <span className={`flex items-center ${asterisk}`}>Write a generic Expression</span> </dt>
           <dd>
            <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows={2}
                {...register("genricExpression")}
              />
          </dd>
          </>
          }
    </dl>
    <h2 className="font-medium">
    Advanced Setting
    </h2>
    <dl className="px-4 py-8 space-y-4 mb-8 grid grid-cols-2 text-sm">
          <dt> If Certifier is Unavailable, then select user</dt>
          <dd>
           <MultiSelect placeholder="Select User(s)" control={control} isAsync loadOptions={loadUsers}  components={{ Option: customOption }}  {...register("certifierUnavailableUsers")}/>
           {errors.certifierUnavailableUsers?.message && typeof errors.certifierUnavailableUsers.message === 'string' && (
           <p className="text-red-500">{errors.certifierUnavailableUsers.message}</p>
          )}
          </dd>
          <dt>Open ticket for Conditional Approval tasks with future termination date</dt>
          <dd className="flex gap-2 items-center"> No<ToggleSwitch checked={watch("ticketConditionalApproval")} onChange={(checked) => setValue("ticketConditionalApproval", checked)} />Yes </dd>
          <dt>Enable additional Authentication for certification sign off </dt>
          <dd> 
          <div className="flex gap-2 items-center">No<ToggleSwitch checked={watch("authenticationSignOff")} onChange={(checked) => setValue("authenticationSignOff", checked)} />Yes </div>
            
          {watch("authenticationSignOff") &&
            <div className="grid grid-cols-2 gap-2 mt-6">
              <div>
              <span className={`flex items-center ${asterisk}`}>  Generate User Pin</span>
                <input
                  type="text"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  {...register("generatePin")}
                />
              </div>
              <div>
                <span className={`flex items-center ${asterisk}`}> Verify User Attribute</span>
                <input
                  type="text"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  {...register("verifyUserAttribute")}
                />
              </div>
            </div>
            }
          </dd>
      <dt>Application Scope </dt>
      <dd className="flex gap-2 items-center">
        All Active Accounts<ToggleSwitch checked={watch("applicationScope")} onChange={(checked) => setValue("applicationScope", checked)} />All User Accounts
      </dd>
    </dl> 


    </>
  );
};

export default Step4;

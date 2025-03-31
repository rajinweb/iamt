import { BookTemplate, InfoIcon } from "lucide-react";
import { useEffect } from "react";
import { Control, FieldValues, Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ToggleSwitch from "@/components/ToggleSwitch";
import MultiSelect from "@/components/MultiSelect";
import { asterisk, beforeExpiryReminders, defaultExpression, enforceComments, everyDayReminders } from "@/utils/utils";
import { customOption, loadUsers } from "@/components/MsAsyncData";
import ExpressionBuilder from "@/components/ExpressionBuilder";
import { Step4FormData, StepProps } from "@/types/StepTypes";


const validationSchema = yup.object().shape({
  // Notifications
  socReminders: yup.array(),
  eocReminders: yup.array(),
  msTeamsNotification: yup.boolean(),
  remediationTicketing: yup.boolean(),
  allowDownloadUploadCropNetwork: yup.boolean(),

   // Campaign Management
  markUndecidedRevoke: yup.boolean(),
  disableBulkAction: yup.boolean(),
  enforceComments: yup.string(),
  genericExpression: yup.array().when("enforceComments", {
      is: "Custom Fields",
      then: (schema) =>
        schema
          .of(
            yup.object().shape({
              attribute: yup.object().nullable().required("Attribute is required"),
              operator: yup.object().nullable().required("Operator is required"),
              value: yup.string().required("Value is required"),
            })
          )
          .min(1, "At least one condition is required")
          .default([]), // 👈 Ensures validation even if untouched
      otherwise: (schema) => schema.notRequired(),
    }),
  // Advanced Setting
  allowEscalation: yup.string(),
  certifierUnavailableUsers: yup.array().nullable().notRequired(),
  ticketConditionalApproval: yup.boolean(),
  authenticationSignOff: yup.boolean(),
  generatePin: yup.string().when("authenticationSignOff", {
    is: true,
    then: (schema) => schema.required("User Pin is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  verifyUserAttribute: yup.string().when("authenticationSignOff", {
    is: true,
    then: (schema) => schema.required("User Attribute is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  applicationScope: yup.boolean(),
  preDelegate: yup.boolean(),
});


const Step4: React.FC<StepProps> = ({ formData, setFormData, onValidationChange }) => {
  const {
    register,
    setValue,    
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<Step4FormData>({
    resolver: yupResolver(validationSchema) as Resolver<Step4FormData>,
    shouldUnregister: !formData.step4,
    mode: "onChange",
    defaultValues: {
      ...formData.step4,
      // genericExpression:[],
      // certifierUnavailableUsers: []
    }
  });
  const enforComments = watch("enforceComments");
  const showGenericExpression = enforComments === "Custom Fields";
  
    useEffect(() => {
      onValidationChange(isValid);
    }, [isValid, onValidationChange]);

  useEffect(() => {
    const subscription = watch((values) => setFormData({ ...formData, step4: values as Step4FormData }));
    return () => subscription.unsubscribe();
  }, [watch, setFormData]);



  return (
  <>
    <h2 className="text-lg font-bold">General Settings</h2>
      <small className="text-gray-600 block mb-6">
        Determine Settings for Notification, Campaign Management and others.
      </small>
   
    <h2 className="font-medium"> Notification(s) </h2>
    <dl className="px-4 py-8 border-b border-gray-300 space-y-4 mb-8 text-sm">

        <dd className="mb-10">
           Enable Email notification for:- 
           <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="h-10 flex gap-4 items-center">
                Start of Campaign
              </label>
              <MultiSelect placeholder="Reminders..." defaultValue={[everyDayReminders[0]]} isSearchable={false}  control={control as unknown as Control<FieldValues>} options={everyDayReminders} {...register("socReminders")}/>
              {errors.socReminders?.message && typeof errors.socReminders.message === 'string' && (
                <p className="text-red-500">{errors.socReminders.message}</p>
              )}
            </div>
            <div>
              <label className="h-10 flex gap-4 items-center">
                End of Campaign
              </label>
            
              <MultiSelect placeholder="Reminders..." defaultValue={[beforeExpiryReminders[0]]} isSearchable={false} control={control as unknown as Control<FieldValues>} options={beforeExpiryReminders} {...register("eocReminders")}/>
              {errors.eocReminders?.message && typeof errors.eocReminders.message === 'string' && (
                <p className="text-red-500">{errors.eocReminders.message}</p>
              )}
            </div>
            <div className="flex items-start mt-10 justify-center">
              <button className="h-10 flex gap-4 items-center bg-blue-500 text-white rounded-md px-4">
                <BookTemplate size={16} />
                Review and Edit Template
              </button>
            </div>
          </div>
          
        </dd>
     
        <dd className="grid grid-cols-2">
          <span>Integrate with Microsoft Teams for notification(s)</span>
          <span className="flex gap-2 items-center">
            No<ToggleSwitch iconEnable checked={watch("msTeamsNotification")} onChange={(checked) => setValue("msTeamsNotification", checked)} />Yes
          </span>
        </dd>
        <dd className="grid grid-cols-2">
          <span>Integrate with Ticketing tool for Remediation</span>
          <span className="flex gap-2 items-center">
            No<ToggleSwitch iconEnable checked={watch("remediationTicketing")} onChange={(checked) => setValue("remediationTicketing", checked)} />Yes
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
          <dd className="flex gap-2 items-center"> No<ToggleSwitch iconEnable checked={watch("markUndecidedRevoke")} onChange={(checked) => setValue("markUndecidedRevoke", checked)} />Yes </dd>
          <dt> Disable Bulk Action</dt> 
          <dd className="flex gap-2 items-center"> No<ToggleSwitch iconEnable checked={watch("disableBulkAction")} onChange={(checked) => setValue("disableBulkAction", checked)} />Yes </dd>
          <dt>Enforce Comments/Justification on </dt>
          <dd>
            <MultiSelect isSearchable={false} isMulti={false} control={control as unknown as Control<FieldValues>} options={enforceComments} {...register("enforceComments")}/>
            {errors.enforceComments?.message && typeof errors.enforceComments.message === 'string' && (
              <p className="text-red-500">{errors.enforceComments.message}</p>
            )}
          {
         showGenericExpression && 
           <div className="mt-4"> 
            <ExpressionBuilder title="Build Expressions" control={control} setValue={setValue} watch={watch} fieldName={"genericExpression"}/>
            {errors.genericExpression?.message && typeof errors.genericExpression.message === 'string' && (
              <p className="text-red-500">{errors.genericExpression.message}</p>
            )}
          </div>
          }
          </dd>
    </dl>
    <h2 className="font-medium">
    Advanced Setting
    </h2>
    <dl className="px-4 py-8 space-y-4 mb-8 grid grid-cols-2 text-sm">
          <dt> Allow Escalation</dt>
          <dd className="flex gap-2 items-center">
          <input type="text" className="form-input !w-1/3" {...register("allowEscalation")}/><span> days before end of campaign.</span>
          </dd>
      
          <dt> If Certifier is Unavailable, then select user</dt>
          <dd>
           <MultiSelect placeholder="Select User(s)" control={control as unknown as Control<FieldValues>} isAsync loadOptions={loadUsers}  components={{ Option: customOption }}  {...register("certifierUnavailableUsers")}/>
           {errors.certifierUnavailableUsers?.message && typeof errors.certifierUnavailableUsers.message === 'string' && (
           <p className="text-red-500">{errors.certifierUnavailableUsers.message}</p>
          )}
          </dd>
          <dt>Open ticket for Conditional Approval tasks with future termination date</dt>
          <dd className="flex gap-2 items-center"> No<ToggleSwitch iconEnable checked={watch("ticketConditionalApproval")} onChange={(checked) => setValue("ticketConditionalApproval", checked)} />Yes </dd>
          <dt>Enable additional Authentication for certification sign off </dt>
          <dd> 
          <div className="flex gap-2 items-center">No<ToggleSwitch iconEnable checked={watch("authenticationSignOff")} onChange={(checked) => setValue("authenticationSignOff", checked)} />Yes </div>
            
          {watch("authenticationSignOff") &&
            <div className="grid grid-cols-2 gap-2 mt-6">
              <div>
              <span className={`flex items-center ${asterisk}`}>  Generate User Pin</span>
                <input
                  type="text"
                  className="form-input"
                  {...register("generatePin")}
                />
              </div>
              <div>
                <span className={`flex items-center ${asterisk}`}> Verify User Attribute</span>
                <input
                  type="text"
                  className="form-input"
                  {...register("verifyUserAttribute")}
                />
              </div>
            </div>
            }
          </dd>
      <dt>Application Scope </dt>
      <dd className="flex gap-2 items-center">
      <span className={`flex items-center ${!watch("applicationScope") ? ` text-black` : 'text-black/50'}`}> All Active Accounts</span>
       <ToggleSwitch checked={watch("applicationScope")} iconEnable onChange={(checked) => setValue("applicationScope", checked)} />
        <span className={`flex items-center ${watch("applicationScope") ? ` text-black` : 'text-black/50'}`}>All User Accounts</span>
      </dd>

      <dt>Do you want to allow pre-delegate for users</dt>
      <dd className="flex gap-2 items-center"> No<ToggleSwitch iconEnable checked={watch("preDelegate")} onChange={(checked) => setValue("preDelegate", checked)} />Yes </dd>

    </dl> 

    </>
  );
};

export default Step4;

import { useEffect } from "react";
import { useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MultiSelect from "@/components/MultiSelect";
import { customOption, loadApps } from "@/components/MsAsyncData";
import FileDropzone from "@/components/FileDropzone";
import ToggleSwitch from "@/components/ToggleSwitch";
import { asterisk, userGroups, excludeUsers, downArrow} from "@/utils/utils";
import ExpressionBuilder from "@/components/ExpressionBuilder";
import { v4 as uuidv4 } from "uuid";
import {validationSchema} from "./step2Validation";
interface Step2Props {
  formData: any;
  setFormData: (data: any) => void;
  onValidationChange: (isValid: boolean) => void;
}
const defaultExpression= { id: uuidv4(), attribute: null, operator: null, value: "", logicalOp: "AND" };
const Step2: React.FC<Step2Props> = ({ formData, setFormData, onValidationChange }) => {
  const {
    register,
    unregister,
    setValue,
    control,
    watch,
    resetField,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "all", 
    defaultValues: {
      ...formData.step2,
      //userType: "All users",
      specificUserExpression: [defaultExpression],
      genericExpression:[],
      expressionEntitlement:[defaultExpression],
      groupListIsChecked: false,
      customReviewerlist: null,
      reviewerlistIsChecked: false,
    }
  });
  const customReviewerlist = watch("customReviewerlist");

  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  useEffect(() => {
    const subscription = watch((values) => setFormData({...formData, step2:values}));
    return () => subscription.unsubscribe();
  }, [watch, setFormData]);

   // **Reseting**
   const userType = watch("userType");
   const groupListIsChecked = watch("groupListIsChecked");
   const excludeUsersIsChecked = watch("excludeUsersIsChecked");

   useEffect(() => {
    if (userType === "All users") {

      setValue("userGroupList", "", { shouldValidate: false });
      setValue("specificUserExpression", [], { shouldValidate: false });
      setValue('groupListIsChecked', false, { shouldValidate: false });
      
    } else if (userType === "Custom User Group") {
      setValue("specificUserExpression", [], { shouldValidate: false });
    
      if (groupListIsChecked) {
        setValue("userGroupList", "", { shouldValidate: false });
      }
    } else if (userType === "Specific users") {
      setValue("userGroupList", "", { shouldValidate: false });
      setValue('groupListIsChecked', false, { shouldValidate: false });
    }
    if(!groupListIsChecked){
      resetField('importNewUserGroup');
    }
    if (!excludeUsersIsChecked) {
      resetField("excludeUsers");
    }
  }, [userType, groupListIsChecked, excludeUsersIsChecked, resetField, setValue]);

  const selectData = watch("selectData");
   useEffect(() => {
    if (selectData === "All Applications" || selectData === "Select Entitlement") {
      setValue("specificApps", [], { shouldValidate: false });
      setValue("expressionApps", [], { shouldValidate: false });
    }
    if (selectData === "All Applications"){
      setValue("expressionEntitlement", [], { shouldValidate: false });
     }
    if (selectData === "Specific Applications") {   
      setValue("expressionEntitlement", [], { shouldValidate: false });
    }
    if (selectData === "Select Entitlement") {
      setValue("specificApps", [], { shouldValidate: false });
    }
  }, [selectData, setValue]); 

  const reviewer = watch("reviewer");
  const reviewerlistIsChecked = watch("reviewerlistIsChecked");

  useEffect(() => {
    if (reviewer !== "Custom Reviewer") {
      setValue("customReviewerlist", null, { shouldValidate: false });
      resetField("customReviewerlist");
      setValue("reviewerlistIsChecked", false, { shouldValidate: false });
      
    } 
    if (!reviewerlistIsChecked) {
      setValue("customReviewerlist", null, { shouldValidate: false });
    
    }
    if (reviewerlistIsChecked) {
      unregister("genericExpression");
      setValue("genericExpression", [], { shouldValidate: false });
    }
  }, [reviewer, reviewerlistIsChecked, customReviewerlist, resetField, setValue]);
  

  return (
    <div className="py-6">
        <h2 className="text-lg font-bold">Campaign Scope</h2>
          <small className="text-gray-600 block mb-6">
           Name your new campaign and set its ownership and rules.
         </small>

      <div className="text-sm space-y-4 min-w-max lg:w-1/2">

         <div className={`grid grid-cols-[280px_1.5fr] gap-2`}>
          <label className={`pl-2 ${asterisk}`}>Select Users</label>
            <div>
          {["All users", "Specific users", "Custom User Group"].map((option, index, array) => (
            <button
              key={option}
              type="button"
              className={`px-4 relative py-2 mb-3 min-w-16 rounded-md border border-gray-300 ${watch("userType") === option && index > 0 && downArrow} ${
                watch("userType") === option ? "bg-[#15274E] text-white" : ""
              } ${index === 0 && "rounded-r-none"} ${array.length > 2 && index === 1 && "rounded-none border-r-0  border-l-0 "} ${index === array.length-1 && "rounded-l-none"}`}
              onClick={() => setValue("userType", option, { shouldValidate: true })}
            >
              {option}  
            </button>
          ))}

       
              {watch("userType") === "Specific users" &&  <ExpressionBuilder title="Build Expression" control={control} setValue={setValue} watch={watch} fieldName={"specificUserExpression"} /> }

              {watch("userType") === "Custom User Group" &&
      
              <>
                <div className="flex items-center gap-1 mb-2">
                  <span className={`flex items-center ${!watch("groupListIsChecked") ? `${asterisk} !pr-0 text-black` : 'text-black/50'}`}>Select from List</span>
                  <ToggleSwitch
                      iconEnable
                      checked={watch("groupListIsChecked")}
                      onChange={(checked) => {
                        setValue("groupListIsChecked", checked, { shouldValidate: true });
                      }}
                      className="scale-80"
                    />
                  <span className={`flex items-center ${watch("groupListIsChecked") ? `${asterisk} !pr-0 text-black` : 'text-black/50'}`}>Import New User Group</span>
                </div>
            
                {watch("groupListIsChecked") && 
                  <div className="w-[450px]">
                      <FileDropzone name="importNewUserGroup" control={control} />
                  </div>}
                {!watch("groupListIsChecked") && <>
                  <MultiSelect  className="max-w-[420px]" isMulti={false} control={control} options={userGroups} {...register("userGroupList")}/>
                  
                  {errors.userGroupList?.message && typeof errors.userGroupList.message === 'string' && (
                  <p className="text-red-500">{errors.userGroupList.message}</p>
                  )}
                  </>}
              </>
             }
              <div className="">
                <div className="flex items-center gap-1 py-2">
                  <input type="checkbox" {...register('excludeUsersIsChecked')} />  <span className={` ${watch('excludeUsersIsChecked') && asterisk}`}>exclude users from the certification campaign</span>
                </div>
              
                <MultiSelect isDisabled={!watch('excludeUsersIsChecked')} className="max-w-[420px]" isMulti={false} control={control} options={excludeUsers} {...register("excludeUsers")}/>
                  
                  {errors.excludeUsers?.message && typeof errors.excludeUsers.message === 'string' && (
                  <p className="text-red-500">{errors.excludeUsers.message}</p>
                  )}
                
              </div>
          </div>

        </div>

        <div className={`grid grid-cols-[280px_1.5fr] gap-2`}>
          <label className={`pl-2 ${asterisk}`}>Select Data</label>
          <div>
          {["All Applications", "Specific Applications", "Select Entitlement"].map((option, index, array) => (
            <button
              key={option}
              type="button"
              className={`px-4 relative py-2 mb-3 min-w-16 rounded-md border border-gray-300  ${watch("selectData") === option && index > 0 && downArrow} ${
                watch("selectData") === option ? "bg-[#15274E] text-white" : ""
              } ${index === 0 && "rounded-r-none"} ${array.length > 2 && index === 1 && "rounded-none border-r-0  border-l-0 "} ${index === array.length-1 && "rounded-l-none"}`}
              onClick={() => setValue("selectData", option, { shouldValidate: true })}
            >
              {option}  
            
            </button>
          ))}
        

          {watch("selectData") === "Specific Applications" &&
              <div className="grid grid-cols-[300px_1.5fr] gap-2 bg-[#F4F5FA]/60 border-1 border-gray-300 p-2 rounded-md">
                <div>
                <MultiSelect
                className=""
                placeholder="Select Specific App(s)"
                control={control}
                isAsync
                loadOptions={loadApps}
                components={{ Option: customOption }}
                {...register("specificApps")}
              />
              {errors.specificApps?.message && typeof errors.specificApps.message === 'string' && (
            <p className="text-red-500">{errors.specificApps.message}</p>
            )}
            </div>
                <div className="min-w-[300px] bg-white">
                <ExpressionBuilder
                 //title="Build Expression for Apps"
                  control={control}
                  setValue={setValue}
                  watch={watch}
                  fieldName="expressionApps"
                />
                {errors.expressionApps?.message && typeof errors.expressionApps.message === 'string' && (
                  <p className="text-red-500">{errors.expressionApps.message}</p>
                )}
              </div>
            </div>
          }
           {watch("selectData") === "Select Entitlement" && 
              <>
              <ExpressionBuilder
                title="Build Expression for Entitlement"
                control={control}
                setValue={setValue}
                watch={watch}
                fieldName="expressionEntitlement"
              />
              {errors.expressionEntitlement?.message && typeof errors.expressionEntitlement.message === 'string' && (
                <p className="text-red-500">{errors.expressionEntitlement.message}</p>
              )}
            </>
          }
           </div>
        </div>

        <div className={`grid grid-cols-[280px_1.5fr] gap-2`}>
          <label className={`pl-2 ${asterisk}`}>Reviewer</label>
            <div>
              {["User Manager", "Application Owner", "Custom Reviewer"].map((option, index, array) => (
                <button
                  key={option}
                  type="button"
                  className={`px-4 py-2 min-w-16 rounded-md border border-gray-300 ${
                    watch("reviewer") === option ? "bg-[#15274E] text-white " : ""
                  }${index === 0 && "rounded-r-none"} ${array.length > 2 && index === 1 && "rounded-none border-r-0  border-l-0 "} ${index === array.length-1 && "rounded-l-none !px-[16px]"} `}
                  onClick={() => setValue("reviewer", option, { shouldValidate: true })}
                >
                  {option}
                </button>
              ))}
         
              {errors.reviewer?.message && typeof errors.reviewer.message === 'string' && (
                <p className="text-red-500">{errors.reviewer.message}</p>
              )}
           
              { watch("reviewer") === "Custom Reviewer" &&
      
              <div className="">
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
            
                {watch("reviewerlistIsChecked") && 
                  <div className="w-[450px]">
                    <FileDropzone name="customReviewerlist" control={control} />
                  </div>
                }
                {!watch("reviewerlistIsChecked") && 
                     <>
                     <ExpressionBuilder
                       //title="Build Generic Expression"
                       control={control}
                       setValue={setValue}
                       watch={watch}
                       fieldName="genericExpression"
                     />
                     {errors.genericExpression?.message && typeof errors.genericExpression.message === 'string' && (
                       <p className="text-red-500">{errors.genericExpression.message}</p>
                     )}
                   </>
                  }
              </div>

              }
        </div>
        </div>
      
    </div>
  </div>
  );
};

export default Step2;

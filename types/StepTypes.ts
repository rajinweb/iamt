import { JSX } from "react";

export interface StepComponentProps {
    formData: any; // You can replace 'any' with a more specific type if you have a more structured form data type.
    setFormData: React.Dispatch<React.SetStateAction<any>>; // This is the state setter for formData.
    onValidationChange: (isValid: boolean) => void; // A callback to notify if the step data is valid.
  }
  
export interface Step {
  name: string; // The name of the step
  component: (props: StepComponentProps) => JSX.Element; // The component to render for this step, taking formData, setFormData, and validation as props.
}

export interface GenericExpression {
  attribute: { label: string; value: string } | null;
  operator: { label: string; value: string } | null;
  value: string;
}
/***steps1****/
export interface Step1FormData {
    template?: string; // Certification Template name
    ownerUser?: any[];
    ownerGroup?: any[];
    certificationTemplate: string; // Copy from Template
    description: string;
    duration: string;
    ownerType: string;
  }
  
  export interface StepProps {
    formData: FormData;
    setFormData: (data: FormData) => void;
    onValidationChange: (isValid: boolean) => void;
  }
  

  /***Steps2****/
  export interface Step2FormData {
    userType: string;
    specificUserExpression: { attribute: any; operator: any; value: string }[];
    specificApps: string[] | null;
    expressionApps: { attribute: any; operator: any; value: string }[];
    expressionEntitlement: { attribute: any; operator: any; value: string }[];
    groupListIsChecked: boolean;
    userGroupList: string | null;
    importNewUserGroup: File | null;
    excludeUsersIsChecked: boolean;
    excludeUsers: string | null;
    selectData: string;
    campaignType: string;
  
  }
  /***End of Step2 */

  export interface Stage {
    reviewer: string;
    duration: string;
    nextReviewerAction: boolean;
    reviewerlistIsChecked?: boolean;
    genericExpression?: GenericExpression[];
    customReviewerlist?: File | null;
  }
  
  export interface Step3FormData {
    multiStageReview: boolean;
    stages: Stage[];
  }
  
  /***End of Step3 */

  export interface Step4FormData {
    socReminders: { label: string; value: string }[];
    eocReminders: { label: string; value: string }[];
    msTeamsNotification: boolean;
    remediationTicketing: boolean;
    allowDownloadUploadCropNetwork: boolean;
    markUndecidedRevoke: boolean;
    disableBulkAction: boolean;
    enforceComments: string;
    genericExpression?: GenericExpression[];
    allowEscalation?: string;
    certifierUnavailableUsers?: { label: string; value: string }[];
    ticketConditionalApproval: boolean;
    authenticationSignOff: boolean;
    generatePin?: string;
    verifyUserAttribute?: string;
    applicationScope: boolean;
    preDelegate: boolean;
    
    reviewRecurrence?: string;
    duration?: string,
    startDate?: Date | null;
    end?: string;
  }

/***End of Step4 */

// FormData Interface
export interface FormData {
  step1: Step1FormData;
  step2: Step2FormData;
  step3: Step3FormData;
  step4: Step4FormData;
}
  
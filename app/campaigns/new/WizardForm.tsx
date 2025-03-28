  'use client'
  import { BookType, MoveLeft, MoveRight, Send } from "lucide-react";
  import { JSX, useState } from "react";
  import Dialog from "@/components/Dialog";
import { asterisk } from "@/utils/utils";
  interface Step {
    name: string;
    component: (props: { 
      formData: any;
      setFormData: React.Dispatch<React.SetStateAction<any>>;
      onValidationChange: (isValid: boolean) => void;
    }) => JSX.Element;
  }

  interface WizardFormProps {
    steps: Step[];
  }

  const WizardForm: React.FC<WizardFormProps> = ({ steps }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isStepValid, setIsStepValid] = useState(false); 
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [saveAsTemplate, setSaveAsTemplate] = useState(false);
    // Store form data globally
    const [formData, setFormData] = useState({
      step1:{
        certificationName: "",
        description: "",
        template:"",
        duration: "",
        ownerType:"",
        ownerUser: [],
        ownerGroup: [],
        reviewer: "",
      },
      step2:{
        userType:"",
        specificUserExpression:[],
        groupListIsChecked:false,
        userGroupList:"",
        importNewUserGroup:null,
        excludeUsersIsChecked:false,
        excludeUsers:"",
        selectData:"",
        specificApps:[],
        expressionApps:[],
        expressionEntitlement:[],
        reviewer:"",  
        reviewerlistIsChecked:false,
        customReviewerlist:null,
        genericExpression:[]
      },
      step3:{
        multiStageReview: false,    
        reviewer: [],  
        duration: "",
        reviewRecurrence: "",
        startDate: null, 
        end: "",
        stages: [],   
      },
      step4:{
        certifierUnavailableUsers: [],
        ticketConditionalApproval: false,
        authenticationSignOff: false,
        generatePin: "",
        verifyUserAttribute: "",
        applicationScope: false
      }
  });

  const nextStep = () => {
    if (isStepValid && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  const handleSubmit = async () => {
    try {
     // console.log("Submitting form data:", formData); // Log before sending
     setIsDialogOpen(true)
      const response = await fetch("https://run.mocky.io/v3/ecaeebf3-b936-41b0-9d8e-176afc79099c", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Directly send formData without modifications
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseText = await response.text(); //Get the response text

      if (responseText) {
        const jsonData = JSON.parse(responseText); //Try to parse it to json
        // Process jsonData here
        } else {
            console.warn("Empty response received from server.");
        }
     // const result = await response.json();
     // alert("Data submitted successfully. \n" + JSON.parse(responseText)?.message);

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };  


    const StepComponent = steps[currentStep].component;
    return (
      <>
        <div className="max-w-2xl mx-auto flex justify-between items-center mb-6">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center relative">
              <div
                className={`w-8 h-8 flex relative items-center justify-center rounded-full text-white text-sm font-bold
                  ${index  < currentStep ? 'bg-blue-500' : currentStep === index ? "bg-blue-500" : "bg-gray-300"}
                `}
              >
                {index + 1}
              </div>
                <span className={`mt-2 text-sm ${index < currentStep || currentStep === index ? "text-black font-semibold" : "text-gray-500"}`}>
                  {step.name}
                </span>
              {/* Progress Bar */}
              {index < steps.length - 1 && (
              
                  <div className="h-2 w-[100px] bg-gray-300 rounded-full absolute top-3 -right-20">
                    <div
                      className="h-full w-1/2 bg-blue-500 rounded-full transition-all duration-300"
                      style={{
                        width: currentStep >= index + 1 ? "100%" : "0%",                    
                      }}
                    ></div>
                  </div>
    
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="mb-6">
          <StepComponent
          formData={formData}
          setFormData={setFormData}
          onValidationChange={setIsStepValid}
        />
        </div>

  
        <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={`${saveAsTemplate ? 'Save New Template' : 'Data submitted successfully'}`}
        ctaText={`${saveAsTemplate ? 'Save Template' : 'Save'}`}
        onConfirm={() => {
          alert("Confirmed!");
          setIsDialogOpen(false);
          setSaveAsTemplate(false)
        }}
      >
      { !saveAsTemplate && <>
          <p>
          Preparing <strong>New Campaign</strong> in progress...
          </p>
          <p className="py-4 text-sm">
          Save time and streamline your workflow! You can save this campaign creation flow as a template. This allows you to reuse the same setup for future campaigns without starting from scratch. Simply select a saved template, make necessary adjustments, and launch your campaign faster!
          </p>
          <p className="cursor-pointer" onClick={() => {
              setIsDialogOpen(true);
              setSaveAsTemplate(true)
            }}>
          <strong>Save as Template</strong>.
          </p>
        </>
        }
        { saveAsTemplate && <div className="my-6">
        <label className={` ${asterisk}`}>Template Name</label>
      
        <input
          type="text"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>
        }
      </Dialog>


        <div className="flex gap-5 my-8 px-2">
          <button
            className={`rounded px-4 py-2 flex gap-2 bg-blue-500 hover:bg-blue-500/80 text-white ${
              currentStep === 0 ? "opacity-50 cursor-not-allowed" : " "
            }`}
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <MoveLeft /> Previous
          </button>

          {currentStep < steps.length - 1 ? (
            <button
            className={`rounded px-4 p-2 flex gap-2 bg-blue-500 hover:bg-blue-500/80  text-white ${
              isStepValid ? " " : "opacity-50 cursor-not-allowed"
            }`}
            onClick={nextStep}
            disabled={!isStepValid}
          >
            Next <MoveRight />
          </button>
          ) : (
            <div className="flex gap-5">
            {/* <button
            className={`px-4 py-2 rounded cursor-pointer flex gap-2 items-center ${
              isStepValid ? "bg-[#15274E] text-white hover:bg-[#15274E]/80" : "cursor-not-allowed"
            }`}
            disabled={!isStepValid}
            onClick={handleSubmit}  
          >
            <Send size={18} /> Prepare Campaign
          </button> */}
            <button
            className={`px-4 py-2 rounded cursor-pointer flex gap-2 items-center ${
              isStepValid ? "bg-[#8b03c6] text-white hover:bg-[#8b03c6]/80" : "cursor-not-allowed"
            }`}
            disabled={!isStepValid}
            onClick={() => {
              setIsDialogOpen(true)
              setSaveAsTemplate(true)
            }}  
          >
            <BookType size={18} /> Save As Template
          </button>
          </div>
          )}
        </div>
      </>
    );
  };

  export default WizardForm;

  //https://run.mocky.io/v3/ecaeebf3-b936-41b0-9d8e-176afc79099c
  //https://designer.mocky.io/manage/delete/ecaeebf3-b936-41b0-9d8e-176afc79099c/U7fMe6hxTH9ewdGg4UVDpcCfmZfQssekHBVw
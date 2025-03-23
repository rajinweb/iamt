  'use client'
  import { MoveLeft, MoveRight } from "lucide-react";
  import { JSX, useState } from "react";

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
    const [currentStep, setCurrentStep] = useState(0);
    const [isStepValid, setIsStepValid] = useState(false); 
    
    // Store form data globally
    const [formData, setFormData] = useState({
      step1:{
        campaignName: "",
        description: "",
        duration: "",
        owners: [],
        reviewer: "",
      },
      step2:{
        users:"",
        apps:"",
        reviewer:"",  
        reviewerlistIsChecked:false,
        customReviewerlist:[],
        genricExpression:""
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
    console.log("Submitting form data:", formData);
  };


    const StepComponent = steps[currentStep].component;
    return (
      <>
        {/* Step Indicator with Progress Bar */}
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
                        // transition: "width 0.3s ease-in-out",
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

    
        <div className="flex gap-5 my-8 px-2">
          <button
            className={`rounded px-4 py-2 flex gap-2 bg-blue-500 text-white ${
              currentStep === 0 ? "opacity-50 cursor-not-allowed" : " "
            }`}
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <MoveLeft /> Previous
          </button>

          {currentStep < steps.length - 1 ? (
            <button
            className={`rounded px-4 p-2 flex gap-2 bg-blue-500  text-white ${
              isStepValid ? " " : "opacity-50 cursor-not-allowed"
            }`}
            onClick={nextStep}
            disabled={!isStepValid}
          >
            Next <MoveRight />
          </button>
          ) : (
            <button
            className={`px-4 py-2 rounded ${
              isStepValid ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!isStepValid}
            onClick={handleSubmit}  
          >
            Submit
          </button>
          )}
        </div>
      </>
    );
  };

  export default WizardForm;

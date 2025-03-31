// components/WizardSteps.tsx
import { MoveLeft, MoveRight } from "lucide-react";

interface Step {
  name: string;
}

interface WizardStepsProps {
  currentStep: number;
  steps: Step[];
  onPrevStep: () => void;
  onNextStep: () => void;
  isStepValid: boolean;
}

const WizardSteps: React.FC<WizardStepsProps> = ({ currentStep, steps, onPrevStep, onNextStep, isStepValid }) => {
  return (
    <div className="max-w-2xl mx-auto flex justify-between items-center mb-6">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center relative">
          <div
            className={`w-8 h-8 flex relative items-center justify-center rounded-full text-white text-sm font-bold
              ${index < currentStep ? 'bg-blue-500' : currentStep === index ? "bg-blue-500" : "bg-gray-300"}
            `}
          >
            {index + 1}
          </div>
          <span className={`mt-2 text-sm ${index < currentStep || currentStep === index ? "text-black font-semibold" : "text-gray-500"}`}>
            {step.name}
          </span>
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
  );
};

export default WizardSteps;

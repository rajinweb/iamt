// components/WizardForm.tsx
import { useState } from "react";
import WizardSteps from "@/components/WizardSteps";
import SubmitDialog from "@/components/SubmitDialog";
import { useFormData } from "@/hooks/useFormData";
import { Step } from "@/types/StepTypes";
import { BookType, MoveLeft, MoveRight, Send } from "lucide-react";

interface WizardFormProps {
  steps: Step[];
}

const WizardForm: React.FC<WizardFormProps> = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(2);
  const [isStepValid, setIsStepValid] = useState(false);
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const [formData, setFormData] = useFormData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const nextStep = () => {
    if (isStepValid && currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  const handleSubmit = async () => {
    try {
      // Show the loading dialog (optional)
      setIsDialogOpen(true);
  
      // Send the form data to the server (replace with your API URL)
      const response = await fetch("https://run.mocky.io/v3/ecaeebf3-b936-41b0-9d8e-176afc79099c", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the formData directly without modifications
      });
  
      // Check if the response is ok (status code 2xx)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the response as JSON
      const responseText = await response.text(); // Get the raw response text
  
      if (responseText) {
        const jsonData = JSON.parse(responseText); // Try to parse it to JSON
        console.log("Form submission successful:", jsonData);
        // You can process the response here if needed
        // e.g., redirect the user or show a success message
        setIsDialogOpen(false); // Close the dialog after success
        alert("Data submitted successfully!"); // You can show a custom success message here
      } else {
        console.warn("Empty response received from server.");
        alert("Submission failed. No data received.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsDialogOpen(false); // Close dialog on error
      alert("An error occurred while submitting the form. Please try again.");
    }
  };
  
  return (
    <>
      <WizardSteps
        currentStep={currentStep}
        steps={steps}
        onPrevStep={prevStep}
        onNextStep={nextStep}
        isStepValid={isStepValid}
      />
      <div className="mb-6">
        {steps[currentStep].component({ formData, setFormData, onValidationChange: setIsStepValid })}
      </div>
      <SubmitDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        saveAsTemplate={saveAsTemplate}
        setSaveAsTemplate={setSaveAsTemplate}
      />
    <div className="flex gap-5 my-8 px-2">
  {/* Previous Button */}
  <button
    className={`rounded px-4 py-2 flex gap-2 bg-blue-500 hover:bg-blue-500/80 text-white ${
      currentStep === 0 ? "opacity-50 cursor-not-allowed" : ""
    }`}
    onClick={prevStep}
    disabled={currentStep === 0}
  >
    <MoveLeft /> Previous
  </button>

  {/* Next Button or Save As Template Button */}
  {currentStep < steps.length - 1 ? (
    <button
      className={`rounded px-4 p-2 flex gap-2 bg-blue-500 hover:bg-blue-500/80  text-white ${
        isStepValid ? "" : "opacity-50 cursor-not-allowed"
      }`}
      onClick={nextStep}
      disabled={!isStepValid}
    >
      Next <MoveRight />
    </button>
  ) : (
    <div className="flex gap-5">
      <button
        className={`px-4 py-2 rounded cursor-pointer flex gap-2 items-center bg-[#8b03c6] text-white hover:bg-[#8b03c6]/80 ${
          isStepValid ? "" : "opacity-50 cursor-not-allowed"
        }`}
        disabled={!isStepValid}
        onClick={() => {
          setIsDialogOpen(true);
          setSaveAsTemplate(true); // Open the "Save as Template" dialog
        }}
      >
        <BookType size={18} /> Save As Template
      </button>
    </div>
  )}

  {/* Submit Button */}
  {currentStep === steps.length - 1 && (
    <button
      className={`px-4 py-2 rounded cursor-pointer flex gap-2 items-center ${
        isStepValid ? "bg-[#15274E] text-white hover:bg-[#15274E]/80" : "cursor-not-allowed"
      }`}
      disabled={!isStepValid}
      onClick={handleSubmit}  // Call the function to submit the form data
    >
      <Send size={18} /> Prepare Campaign
    </button>
  )}
</div>

    </>
  );
};

export default WizardForm;

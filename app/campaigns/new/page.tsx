'use client';
import React from "react";
import WizardForm from "./WizardForm";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

const CreateCampaign = () => {
  const steps = [
    { name: "Basic Information", component: (props: any)=><Step1 {...props} /> },
    { name: "Campaign Scope", component: (props: any)=><Step2 {...props} />},
    { name: "Approval Workflow",  component: (props: any)=><Step3 {...props} /> },
    { name: "General Settings",  component: (props: any)=><Step4 {...props} />},
  ];
  
  return (<WizardForm steps={steps} />);
};

export default CreateCampaign;

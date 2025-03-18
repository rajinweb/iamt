'use client';
import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

const CreateCampaign = () => {
  const [campaignName, setCampaignName] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");
  const [reviewer, setReviewer] = useState("Application Owner");

  return (
    <>   
    <div className="max-w-2xl mx-auto flex justify-between items-center mb-6">
        {["Basic Information", "Campaign Scope", "Approval Workflow", "General Settings"].map((step, index) => (
          <div key={index} className="flex flex-col items-center relative">
            <div
              className={`w-8 h-8 flex relative items-center justify-center rounded-full text-white text-sm font-bold ${
                index === 0 ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              {index + 1}
            </div>
            {index < 3 &&
                <div className="h-2 w-[100px] bg-gray-300 rounded-full absolute top-3 -right-20">
                  {index === 0 ?  <div className="h-full w-1/2 bg-blue-600 rounded-full"></div> : '' }
                </div>
                }
            <span className={`mt-2 text-sm ${index === 0 ? "text-black font-semibold" : "text-gray-500"}`}>
              {step}
            </span> 
          </div>
        ))}
      </div>

    <div className="max-w-4xl pt-4">
 
        
      <div id="step-1">
        <h2 className="text-lg font-bold mb-4">Create an access review campaign</h2>
        <p className="text-sm text-gray-600 mb-6">
          Name your new campaign and set its ownership and rules.
        </p>

        {/* Campaign Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium ">Campaign Name</label>
          <input
            type="text"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
          />
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label className="block text-sm font-medium ">Duration</label>
          <div className="relative">
            <select
              className="mt-1 w-full px-4 py-2 border border-gray-300  rounded-md focus:ring-blue-500 focus:border-blue-500 appearance-none"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="">Select Duration</option>
              <option value="7 Days">7 Days</option>
              <option value="14 Days">14 Days</option>
              <option value="30 Days">30 Days</option>
            </select>
            <ChevronDown className="absolute top-3 right-4 text-gray-500" size={18} />
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium ">Description</label>
          <textarea
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Owner Lookup */}
        <div className="mb-4">
          <label className="block text-sm font-medium ">Owners</label>
          <div className="relative">
            <input
              type="text"
              className="mt-1 w-full px-4 py-2 border border-gray-300  rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Owner lookup"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
            <Search className="absolute top-3 right-4 text-gray-500" size={18} />
          </div>
        </div>

        {/* Reviewer Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium ">Reviewer</label>
          <div className="flex mt-2">
            {["User Manager", "Application Owner", "Custom Reviewer"].map((option, index) => (
              <button
                key={option}
                className={`px-4 py-2 text-sm rounded-md border border-gray-300 ${
                  reviewer === option ? "bg-[#15274E] text-white" : " "}
                ${index==0 ?' rounded-r-none' : index==1 ? 'rounded-none' : 'rounded-l-none'}
                `}
                onClick={() => setReviewer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

      </div>



      <div id="step-2">
        <h2 className="text-lg font-bold mb-4">Create an access review campaign</h2>
        <p className="text-sm text-gray-600 mb-6">
          Name your new campaign and set its ownership and rules.
        </p>

             
        <div className="mb-4">
            <label className="block text-sm font-medium ">Select user</label>
              <div className="relative">
                <select
                  className="mt-1 w-full px-4 py-2 border border-gray-300  rounded-md focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option value="">Select Duration</option>
                  <option value="7 Days">user -1</option>
                  <option value="14 Days">user -2</option>
                  <option value="30 Days">user -3</option>
                </select>
                <ChevronDown className="absolute top-3 right-4 text-gray-500" size={18} />
              </div>
            </div>

        <div className="mb-4">
            <label className="block text-sm font-medium ">Select Application</label>
              <div className="relative">
                <select
                  className="mt-1 w-full px-4 py-2 border border-gray-300  rounded-md focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option value="">Select Duration</option>
                  <option value="7 Days">Application -1</option>
                  <option value="14 Days">Application -2</option>
                  <option value="30 Days">Application -3</option>
                </select>
                <ChevronDown className="absolute top-3 right-4 text-gray-500" size={18} />
              </div>
            </div>

            {/* Reviewer Selection */}
        <div className="mb-6">
              <label className="block text-sm font-medium ">Reviewer</label>
              <div className="flex mt-2">
                {["User Manager", "Application Owner", "Custom Reviewer"].map((option, index) => (
                  <button
                    key={option}
                    className={`px-4 py-2 text-sm rounded-md border border-gray-300 ${
                      reviewer === option ? "bg-[#15274E] text-white" : " "}
                    ${index==0 ?' rounded-r-none' : index==1 ? 'rounded-none' : 'rounded-l-none'}
                    `}
                    onClick={() => setReviewer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
        </div>


         {/* Description */}
         <div className="mb-4">
          <div className="flex"><label className="block text-sm font-medium ">Upload a custom reviewer list</label> 
   
            <label htmlFor="toggleCheck" className="toggle-check mx-4">
              <input id="toggleCheck" type="checkbox" />
            </label>
 
          <label className="block text-sm font-medium "> Write a generic Expression</label>
          </div>
          <textarea
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>


      </div>

        {/* Buttons */}
        <div className="flex justify-between mt-18">        
          <button className="px-4 py-2 bg-[#15274E] text-white text-sm rounded-md hover:bg-[#15274E]/80">
            Save and Continue
          </button>
        </div>
      
    </div>
  </>
  );
};

export default CreateCampaign;

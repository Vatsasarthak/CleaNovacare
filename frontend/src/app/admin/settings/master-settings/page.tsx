'use client';

import React from 'react';

const InputField = ({ label, required = false, type = "text", defaultValue = "", placeholder = "" }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
      {label}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    <input 
      type={type} 
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all text-sm text-gray-800"
    />
  </div>
);

const FileInput = ({ label }: { label: string }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
      {label}
    </label>
    <div className="flex border border-gray-200 rounded-md overflow-hidden bg-white">
      <button className="px-4 py-2 bg-white border-r border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
        Choose File
      </button>
      <div className="flex-1 px-4 py-2 text-sm text-gray-400">
        No file chosen
      </div>
    </div>
  </div>
);

const SelectField = ({ label, options, defaultValue }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
      {label}
    </label>
    <select 
      defaultValue={defaultValue}
      className="px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all text-sm text-gray-800 bg-white"
    >
      {options.map((opt: string) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default function MasterSettingsPage() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-10">
      
      {/* APPLICATION DETAILS */}
      <div>
        <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-6 pb-4 border-b border-gray-100">
          APPLICATION DETAILS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputField label="Application Name" required defaultValue="CleaNova" />
          <FileInput label="App Logo" />
          <FileInput label="Favicon" />
          <InputField label="Phone Number" required defaultValue="7063447999" />
          <InputField label="Email" required defaultValue="admin@admin.com" />
          <InputField label="Password" required type="password" defaultValue="Password" />
        </div>
      </div>

      {/* FINANCE SETTINGS */}
      <div>
        <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-6 pb-4 border-b border-gray-100">
          FINANCE SETTINGS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <InputField label="Currency Symbol" defaultValue="Rs." />
          <InputField label="Tax Percentage" defaultValue="18" />
          <SelectField 
            label="Financial Year" 
            options={["2024 [ 01/04/2024 to 31/03/2025 ]", "2023 [ 01/04/2023 to 31/03/2024 ]"]} 
          />
          <SelectField 
            label="Currency Alignment" 
            options={["Left", "Right"]} 
          />
        </div>
      </div>

      {/* FIRM ADDRESS */}
      <div>
        <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-6 pb-4 border-b border-gray-100">
          FIRM ADDRESS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <SelectField label="Country" options={["India [IN]", "United States [US]"]} />
          <InputField label="State" defaultValue="West Bengal" />
          <InputField label="City" defaultValue="Berhampore" />
          <InputField label="District" defaultValue="Murshidabad" />
          
          <InputField label="Zip Code" defaultValue="742103" />
          <InputField label="Store Email" defaultValue="store@store.com" />
          <InputField label="Store Tax Number" defaultValue="19AMAPG7970KIZN" />
          <InputField label="Country Code" defaultValue="91" />
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-50">
        <button className="bg-[#3b82f6] hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md transition-colors text-sm shadow-sm">
          Save
        </button>
      </div>

    </div>
  );
}

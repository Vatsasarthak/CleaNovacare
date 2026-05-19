'use client';

import React from 'react';

const InputField = ({ label, required = false, defaultValue = '', placeholder = '' }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
      {label}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    <input 
      type="text" 
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all text-sm text-gray-800"
    />
  </div>
);

export default function MailSettingsPage() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-6 pb-4 border-b border-gray-100">
        Mail Settings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
        <InputField label="Mail Host" required defaultValue="mailpit" />
        <InputField label="Mail Port" required defaultValue="1025" />
        
        <InputField label="Mail Username" required defaultValue="null" />
        <InputField label="Mail Password" required defaultValue="null" />
        
        <InputField label="Mail From Address" required defaultValue="hello@example.com" />
        <InputField label="Mail From Name" required defaultValue="${APP_NAME}" />
      </div>

      <div className="flex items-center gap-3 mb-10">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" defaultChecked />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3b82f6]"></div>
        </label>
        <span className="text-sm font-medium text-gray-600">Enable Password Recovery (Forget Password Section)</span>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-50">
        <button className="bg-[#3b82f6] hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md transition-colors text-sm shadow-sm">
          Save
        </button>
      </div>
    </div>
  );
}

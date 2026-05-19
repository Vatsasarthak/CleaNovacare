'use client';

import React from 'react';

const InputField = ({ label, required = false, type = "text" }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
      {label}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    <input 
      type={type} 
      className="px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all text-sm text-gray-800"
    />
  </div>
);

const Toggle = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3">
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3b82f6]"></div>
    </label>
    <span className="text-sm font-medium text-gray-600">{label}</span>
  </div>
);

const ShortcodeButton = ({ children }: { children: React.ReactNode }) => (
  <button type="button" className="bg-[#8b98ac] hover:bg-[#7a869a] text-white font-medium text-[11px] py-3 rounded-md transition-colors w-full">
    {children}
  </button>
);

const shortcodes = [
  "Name", "Order Date", "Delivery Date", "No Of Products", 
  "Total", "Discount", "Paid Amount", "Status", 
  "Order Number", "Current Time"
];

export default function SmsSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-6 pb-4 border-b border-gray-100">
          Twilio SMS Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <InputField label="Account SID" required />
          <InputField label="Auth Token" required />
          <InputField label="Twilio Number" required />
        </div>

        <div className="flex flex-wrap items-center gap-8 border-t border-gray-50 pt-6">
          <Toggle label="SMS Enabled" />
          <Toggle label="Delivered Status SMS only" />
          <Toggle label="Ready to Deliver Status SMS only" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-6 pb-4 border-b border-gray-100">
          SMS FORMAT
        </h2>

        <div className="space-y-10">
          {/* Create Order Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Create Order</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <textarea 
                  className="w-full h-40 p-4 border border-gray-200 rounded-md outline-none focus:border-[#3b82f6] transition-colors text-sm text-gray-700 resize-none"
                  defaultValue="Hi <name> An Order #<order_number> was created and will be delivered on <delivery_date> Your Order Total is <total>."
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {shortcodes.map(code => (
                  <ShortcodeButton key={code}>{code}</ShortcodeButton>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-10">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Status Change</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <textarea 
                  className="w-full h-40 p-4 border border-gray-200 rounded-md outline-none focus:border-[#3b82f6] transition-colors text-sm text-gray-700 resize-none"
                  defaultValue="Hi <name> Your Order #<order_number> status has been changed to <status> on <current_time>"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {shortcodes.map(code => (
                  <ShortcodeButton key={`status-${code}`}>{code}</ShortcodeButton>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-8 mt-4 border-t border-gray-50">
          <button className="bg-[#3b82f6] hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md transition-colors text-sm shadow-sm">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

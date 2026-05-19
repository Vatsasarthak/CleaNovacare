'use client';

import React from 'react';

export default function FinancialYearPage() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-end mb-4">
        <button className="bg-white text-[#3b82f6] font-semibold px-4 py-2 rounded-md shadow-sm text-sm border border-transparent hover:border-[#3b82f6] transition-colors flex items-center gap-2">
          <span>+</span> Add New Financial Year
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <input 
            type="text" 
            placeholder="Search Here" 
            className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:border-[#3b82f6] transition-colors text-sm"
          />
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f8f9fa] border-b border-gray-100">
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Year</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">End Date</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-700">2024</td>
              <td className="px-6 py-4 text-sm text-gray-700">01/04/2024</td>
              <td className="px-6 py-4 text-sm text-gray-700">31/03/2025</td>
              <td className="px-6 py-4">
                <button className="text-orange-400 text-xs font-bold bg-orange-50 px-3 py-1 rounded-md uppercase tracking-wide hover:bg-orange-100 transition-colors">
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

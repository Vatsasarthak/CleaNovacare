'use client';
import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { serviceCatalog } from '@/lib/laundryData';

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = serviceCatalog.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full h-full flex flex-col p-6">
      <header className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black mb-1 text-secondary">Service List</h1>
          <p className="text-gray-400 font-semibold text-sm">Manage your laundry services and icons.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2.5 rounded-xl border border-gray-200 flex items-center gap-2 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search services..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none bg-transparent font-semibold text-sm w-64 text-secondary" 
            />
          </div>
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-black text-sm shadow-md hover:bg-primary-dark transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Service
          </button>
        </div>
      </header>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100">
                <th className="py-4 pl-6 w-20">Icon</th>
                <th className="py-4 px-4">Service Name</th>
                <th className="py-4 px-4">Assigned Types</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredServices.map((service, index) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index % 20) * 0.02 }}
                  key={service.id} 
                  className="hover:bg-primary/5 transition-colors group text-sm font-semibold text-secondary"
                >
                  <td className="py-3 pl-6">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 group-hover:bg-white group-hover:border-primary/20 transition-all text-gray-500 group-hover:text-primary">
                      <service.icon className="w-5 h-5 stroke-[1.5]" />
                    </div>
                  </td>
                  <td className="py-3 px-4">{service.name}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <span className="bg-primary/10 text-primary text-[10px] px-2 py-1 rounded font-bold">Laundry</span>
                      <span className="bg-accent/10 text-accent text-[10px] px-2 py-1 rounded font-bold">Dry Clean</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-600 border border-green-200 text-xs font-bold px-3 py-1 rounded-full">Active</span>
                  </td>
                  <td className="py-3 pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

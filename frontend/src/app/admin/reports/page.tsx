'use client';
import React, { useState } from 'react';
import { 
  BarChart2, IndianRupee, FileText, Download, Calendar, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('daily');

  // Mock data for display
  const stats = [
    { label: 'Total Sales', value: '₹1,24,500', trend: '+12%', isUp: true },
    { label: 'Total Dues', value: '₹14,200', trend: '-5%', isUp: false },
    { label: 'Orders Delivered', value: '845', trend: '+18%', isUp: true },
    { label: 'New Customers', value: '124', trend: '+2%', isUp: true },
  ];

  return (
    <div className="relative w-full h-full flex flex-col p-6">
      <header className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black mb-1 text-secondary">Analytics & Reports</h1>
          <p className="text-gray-400 font-semibold text-sm">Detailed financial and operational reports.</p>
        </div>
        <div className="flex gap-4">
          <select 
            value={reportType} 
            onChange={(e) => setReportType(e.target.value)}
            className="bg-white px-4 py-2.5 rounded-xl border border-gray-200 outline-none font-semibold text-sm text-secondary shadow-sm focus:border-primary"
          >
            <option value="daily">Daily Sales Report</option>
            <option value="monthly">Monthly Sales Report</option>
            <option value="due">Due Report</option>
            <option value="delivered">Delivered Orders Report</option>
            <option value="pending">Pending Orders Report</option>
            <option value="customer">Customer Report</option>
            <option value="payment">Payment Report</option>
          </select>
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-black text-sm shadow-md hover:bg-primary-dark transition-all flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Excel
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx}
            className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col gap-4"
          >
            <div className="flex justify-between items-start">
              <span className="text-gray-500 font-semibold text-sm">{stat.label}</span>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.isUp ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <h2 className="text-3xl font-black text-secondary">{stat.value}</h2>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-black text-secondary capitalize">{reportType.replace('-', ' ')} Data</h3>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
            <Calendar className="w-4 h-4" /> Date Range: Oct 1 - Oct 31, 2024
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-10">
          <BarChart2 className="w-16 h-16 mb-4 opacity-30" />
          <p className="font-bold text-lg mb-2">Report Generation Area</p>
          <p className="text-sm">Detailed tabular data for "{reportType}" will appear here.</p>
        </div>
      </div>
    </div>
  );
}

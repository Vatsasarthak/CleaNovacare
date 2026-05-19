'use client';
import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, FileText, Download, IndianRupee } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExpensesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock expenses data for demonstration
  const expenses = [
    { id: 'EXP-001', date: '2024-03-15', category: 'Supplies', description: 'Detergent & Softeners', amount: 4500, method: 'UPI', by: 'Admin' },
    { id: 'EXP-002', date: '2024-03-14', category: 'Utility', description: 'Electricity Bill', amount: 12500, method: 'Bank Transfer', by: 'Admin' },
    { id: 'EXP-003', date: '2024-03-12', category: 'Maintenance', description: 'Washing Machine Repair', amount: 2500, method: 'Cash', by: 'Manager' },
    { id: 'EXP-004', date: '2024-03-10', category: 'Marketing', description: 'Local Flyers Print', amount: 1200, method: 'Cash', by: 'Admin' },
  ];

  const filteredExpenses = expenses.filter(e => 
    e.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="relative w-full h-full flex flex-col p-6">
      <header className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black mb-1 text-secondary">Expense Tracker</h1>
          <p className="text-gray-400 font-semibold text-sm">Manage and track your operational expenses.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2.5 rounded-xl border border-gray-200 flex items-center gap-2 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search expenses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none bg-transparent font-semibold text-sm w-64 text-secondary" 
            />
          </div>
          <button className="bg-white text-secondary border border-gray-200 px-5 py-2.5 rounded-xl font-black text-sm shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-black text-sm shadow-md hover:bg-primary-dark transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Expense
          </button>
        </div>
      </header>

      {/* Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-red-500 flex items-center justify-center">
            <IndianRupee className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Total Expenses (This Month)</p>
            <h3 className="text-2xl font-black text-secondary">₹{totalExpenses.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100">
                <th className="py-4 pl-6">Date</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Description</th>
                <th className="py-4 px-4">Payment Method</th>
                <th className="py-4 px-4">Recorded By</th>
                <th className="py-4 px-4 text-right">Amount</th>
                <th className="py-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredExpenses.map((expense, index) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={expense.id} 
                  className="hover:bg-primary/5 transition-colors group text-sm font-semibold text-secondary"
                >
                  <td className="py-4 pl-6 text-gray-500">{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="py-4 px-4">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                      {expense.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 truncate max-w-[200px]">{expense.description}</td>
                  <td className="py-4 px-4 text-gray-500 text-xs font-bold">{expense.method}</td>
                  <td className="py-4 px-4 text-gray-500 text-xs">{expense.by}</td>
                  <td className="py-4 px-4 text-right text-red-500 font-black">₹{expense.amount.toLocaleString()}</td>
                  <td className="py-4 pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filteredExpenses.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
              <FileText className="w-12 h-12 mb-4 opacity-30" />
              <p className="font-bold text-lg">No expenses found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

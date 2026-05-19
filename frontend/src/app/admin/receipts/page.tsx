'use client';
import React, { useState } from 'react';
import { CreditCard, Search, Download, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReceiptsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock receipt data for demonstration
  const receipts = [
    { id: 'REC-1001', orderId: 'ORD-5432', date: '2024-03-15', customer: 'Ravi Kumar', phone: '9876543210', amount: 450, type: 'UPI', note: 'Advance payment' },
    { id: 'REC-1002', orderId: 'ORD-5433', date: '2024-03-15', customer: 'Priya Singh', phone: '8765432109', amount: 1200, type: 'Cash', note: 'Full payment' },
    { id: 'REC-1003', orderId: 'ORD-5434', date: '2024-03-16', customer: 'Amit Sharma', phone: '7654321098', amount: 300, type: 'Card', note: 'Partial payment' },
  ];

  const filteredReceipts = receipts.filter(r => 
    r.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.orderId.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full h-full flex flex-col p-6">
      <header className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black mb-1 text-secondary">Payment Receipts</h1>
          <p className="text-gray-400 font-semibold text-sm">View and download payment history.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2.5 rounded-xl border border-gray-200 flex items-center gap-2 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search receipts..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none bg-transparent font-semibold text-sm w-64 text-secondary" 
            />
          </div>
          <button className="bg-white text-secondary border border-gray-200 px-5 py-2.5 rounded-xl font-black text-sm shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </header>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100">
                <th className="py-4 pl-6">Receipt ID</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4">Order ID</th>
                <th className="py-4 px-4">Customer Details</th>
                <th className="py-4 px-4">Amount</th>
                <th className="py-4 px-4">Method</th>
                <th className="py-4 px-4">Note</th>
                <th className="py-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredReceipts.map((receipt, index) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={receipt.id} 
                  className="hover:bg-primary/5 transition-colors group text-sm font-semibold text-secondary"
                >
                  <td className="py-4 pl-6 text-primary">{receipt.id}</td>
                  <td className="py-4 px-4 text-gray-500">{new Date(receipt.date).toLocaleDateString()}</td>
                  <td className="py-4 px-4 font-bold">{receipt.orderId}</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-0.5">
                      <span>{receipt.customer}</span>
                      <span className="text-[10px] text-gray-400">{receipt.phone}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-black text-green-600">₹{receipt.amount}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-[10px] font-bold rounded-md ${
                      receipt.type === 'UPI' ? 'bg-purple-100 text-purple-600' :
                      receipt.type === 'Cash' ? 'bg-orange-100 text-orange-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {receipt.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-500 max-w-[150px] truncate">{receipt.note}</td>
                  <td className="py-4 pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors border border-gray-100">
                        <Eye className="w-3.5 h-3.5" /> View Receipt
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

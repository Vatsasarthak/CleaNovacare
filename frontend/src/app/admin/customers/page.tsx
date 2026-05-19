'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Users, Mail, Phone, Calendar, Search, Plus, Eye, BookOpen, Edit } from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { motion } from 'framer-motion';
import { Loader } from '@/components/ui/Loader';

import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const q = query(collection(db, 'users'), where('role', '==', 'customer'));
        const querySnapshot = await getDocs(q);
        setCustomers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchCustomers();
  }, [token]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(c => 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone?.includes(searchTerm) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full h-full flex flex-col p-6">
      
      <header className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black mb-1 text-secondary">Customer Directory</h1>
          <p className="text-gray-400 font-semibold text-sm">Manage all registered customers and their ledgers.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2.5 rounded-xl border border-gray-200 flex items-center gap-2 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none bg-transparent font-semibold text-sm w-64 text-secondary" 
            />
          </div>
          <button className="bg-white text-secondary border border-gray-200 px-5 py-2.5 rounded-xl font-black text-sm shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2">
            Export Excel
          </button>
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-black text-sm shadow-md hover:bg-primary-dark transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Customer
          </button>
        </div>
      </header>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto custom-scrollbar">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Loader />
            </div>
          ) : filteredCustomers.length > 0 ? (
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100">
                  <th className="py-4 pl-6">Customer Name</th>
                  <th className="py-4 px-4">Contact</th>
                  <th className="py-4 px-4">Email</th>
                  <th className="py-4 px-4">Address</th>
                  <th className="py-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredCustomers.map((customer, index) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={customer.id} 
                    className="hover:bg-primary/5 transition-colors group text-sm font-semibold text-secondary"
                  >
                    <td className="py-4 pl-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center font-black">
                        {customer.name?.charAt(0).toUpperCase()}
                      </div>
                      {customer.name}
                    </td>
                    <td className="py-4 px-4">{customer.phone || 'N/A'}</td>
                    <td className="py-4 px-4">{customer.email || 'N/A'}</td>
                    <td className="py-4 px-4 truncate max-w-[200px] text-gray-500 font-medium">
                      {customer.address || 'No address provided'}
                    </td>
                    <td className="py-4 pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors border border-gray-100">
                          <Eye className="w-3.5 h-3.5" /> View
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors border border-gray-100">
                          <BookOpen className="w-3.5 h-3.5" /> Ledger
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Users className="w-16 h-16 mb-4 opacity-50" />
              <p className="font-bold text-lg">No customers found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

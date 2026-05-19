'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Truck, Mail, Phone, Calendar, Star } from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { motion } from 'framer-motion';

import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function RidersPage() {
  const [riders, setRiders] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const q = query(collection(db, 'users'), where('role', '==', 'rider'));
        const querySnapshot = await getDocs(q);
        setRiders(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Failed to fetch riders:", error);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchRiders();
  }, [token]);

  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
      
      <header className="mb-8">
        <h1 className="text-4xl font-black mb-2">Rider Management</h1>
        <p className="text-foreground/50 font-bold">View and manage all delivery partners.</p>
      </header>

      <div className="glass p-8 rounded-[40px] shadow-sm border border-white/60 flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-black text-xl">Active Riders ({riders.length})</h3>
          <button className="bg-primary text-white px-4 py-2 rounded-xl font-black text-sm shadow-md hover:bg-primary-dark transition-colors">
            + Add New Rider
          </button>
        </div>

        <div className="flex-1 overflow-auto custom-scrollbar pr-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : riders.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {riders.map((rider, index) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  key={rider.id} 
                  className="bg-white p-6 rounded-3xl shadow-sm border border-foreground/5 hover:border-primary/20 transition-all flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-[24px] flex items-center justify-center font-black text-3xl mb-4 group-hover:scale-110 transition-transform">
                    {rider.name.charAt(0).toUpperCase()}
                  </div>
                  
                  <h4 className="font-black text-xl mb-1">{rider.name}</h4>
                  <div className="flex items-center gap-1 text-orange-500 mb-4">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4" />
                    <span className="text-xs font-black text-foreground ml-1">4.0</span>
                  </div>

                  <div className="w-full space-y-2 text-sm font-bold text-foreground/60 bg-foreground/5 p-4 rounded-2xl">
                    <div className="flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" /> {rider.phone}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs">
                      <Mail className="w-4 h-4" /> {rider.email}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-foreground/40">
              <Truck className="w-16 h-16 mb-4 opacity-50" />
              <p className="font-bold text-lg">No riders found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

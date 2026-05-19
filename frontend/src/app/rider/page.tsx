'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, MapPin, Phone, CheckCircle, Package, Clock, LogOut, Navigation, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'react-hot-toast';

import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const RiderPanel = () => {
  const [tasks, setTasks] = useState<Record<string, any>[]>([]);
  const { token, user, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const q = query(collection(db, 'orders'), where('riderId', '==', user?.id));
        const querySnapshot = await getDocs(q);
        const activeTasks = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter((o: Record<string, any>) => o.status !== 'delivered');
        setTasks(activeTasks);
      } catch (error: unknown) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    if (token && user) fetchTasks();
  }, [token, user]);

  const updateTaskStatus = async (id: string, newStatus: string) => {
    setLoading(true);
    try {
      await updateDoc(doc(db, 'orders', id), {
        status: newStatus,
        lastUpdated: new Date().toISOString()
      });
      toast.success('Task updated successfully');
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      toast.error('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 font-sans selection:bg-primary/20">
      {/* Header */}
      <header className="bg-primary pt-12 pb-8 px-6 rounded-b-[48px] text-white shadow-[0_20px_50px_rgba(0,86,179,0.2)] relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-[80px] -z-10" />
        
        <div className="flex justify-between items-center mb-10 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-[20px] flex items-center justify-center backdrop-blur-md shadow-inner border border-white/20">
              <UserIcon className="w-7 h-7" />
            </div>
            <div>
              <p className="font-black text-2xl tracking-tight">Hi, {user?.name?.split(' ')[0] || 'Rider'}</p>
              <p className="text-white/80 text-sm font-bold mt-1 bg-white/10 w-fit px-3 py-1 rounded-full border border-white/10">Active Now • TR-01-A-1234</p>
            </div>
          </div>
          <button onClick={handleLogout} className="p-4 bg-white/10 hover:bg-white/20 rounded-[20px] transition-colors border border-white/10">
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[32px] border border-white/30 shadow-2xl relative z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent rounded-bl-full" />
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Today's Earnings</p>
              <p className="text-4xl font-black tracking-tighter">₹1,250<span className="text-xl text-white/50">.00</span></p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Distance</p>
              <p className="text-2xl font-black">12.4 <span className="text-sm text-white/70">km</span></p>
            </div>
          </div>
        </div>
      </header>

      {/* Tasks Section */}
      <main className="px-6 -mt-6 relative z-20">
        <div className="flex justify-between items-center mb-8 px-2">
          <h2 className="font-black text-2xl tracking-tight">Active Tasks</h2>
          <span className="bg-primary text-white px-4 py-1.5 rounded-full text-xs font-black shadow-lg shadow-primary/30 border border-white">
            {tasks.length} Remaining
          </span>
        </div>

        <div className="space-y-6">
          <AnimatePresence>
            {tasks.length > 0 ? tasks.map((task, index) => {
              const isPickup = task.status === 'pickup_requested' || task.status === 'rider_assigned';
              const typeLabel = isPickup ? 'Pickup' : 'Delivery';
              
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-[40px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] relative overflow-hidden border border-foreground/5"
                >
                  {/* Task Type Badge */}
                  <div className={`absolute top-0 right-0 px-6 py-3 rounded-bl-[32px] font-black text-[10px] uppercase tracking-[0.2em] shadow-sm ${
                    isPickup ? 'bg-indigo-600 text-white' : 'bg-green-500 text-white'
                  }`}>
                    {typeLabel}
                  </div>

                  <div className="mb-8 pr-20">
                    <p className="text-primary font-black mb-2 tracking-widest text-xs uppercase">#{task.trackingId}</p>
                    <h3 className="text-3xl font-black tracking-tight leading-none mb-2">{task.customerId?.name || 'Customer'}</h3>
                  </div>

                  <div className="space-y-5 mb-10">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 p-2 bg-primary/5 rounded-full text-primary">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <p className="text-base text-foreground/70 font-bold leading-relaxed">{task.pickupDetails?.address || 'Agartala'}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-orange-50 rounded-full text-orange-500">
                        <Clock className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-black text-foreground">
                        {isPickup ? task.pickupDetails?.slot || 'ASAP' : 'By 8:00 PM'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="rounded-2xl py-7 font-black border-2 hover:bg-foreground/5 shadow-sm">
                      <Phone className="w-5 h-5 mr-2" /> Call
                    </Button>
                    <Button className="rounded-2xl py-7 font-black bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20">
                      <Navigation className="w-5 h-5 mr-2" /> Route
                    </Button>
                    <Button 
                      onClick={() => updateTaskStatus(task.id, isPickup ? 'picked_up' : 'delivered')}
                      disabled={loading}
                      className="col-span-2 rounded-[24px] py-8 text-lg font-black bg-green-500 hover:bg-green-600 shadow-xl shadow-green-500/20"
                    >
                      <CheckCircle className="w-6 h-6 mr-3" /> {loading ? 'Updating...' : `Mark ${typeLabel} Complete`}
                    </Button>
                  </div>
                </motion.div>
              );
            }) : (
              <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-foreground/20">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="font-black text-2xl mb-2">All Caught Up!</h3>
                <p className="text-foreground/40 font-bold">No active tasks right now.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-foreground/5 p-6 pb-8 flex justify-around items-center z-50">
        <button className="p-4 bg-primary/10 text-primary rounded-2xl flex flex-col items-center gap-1 group">
          <Package className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
        <button className="p-4 text-foreground/30 hover:text-primary transition-colors flex flex-col items-center gap-1">
          <Navigation className="w-6 h-6" />
        </button>
        <button className="p-4 text-foreground/30 hover:text-primary transition-colors flex flex-col items-center gap-1">
          <Clock className="w-6 h-6" />
        </button>
        <button className="p-4 text-foreground/30 hover:text-primary transition-colors flex flex-col items-center gap-1">
          <UserIcon className="w-6 h-6" />
        </button>
      </nav>
    </div>
  );
};

export default RiderPanel;

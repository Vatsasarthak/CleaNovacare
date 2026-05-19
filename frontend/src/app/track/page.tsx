'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Package, Truck, Sparkles, CheckCircle, Search, MapPin, Phone, User, Clock, AlertCircle } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const TrackContent = () => {
  const searchParams = useSearchParams();
  const trackingIdParam = searchParams.get('id');
  const [trackingId, setTrackingId] = useState(trackingIdParam || '');
  const [order, setOrder] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTracking = async (id: string) => {
    if (!id) return;
    setLoading(true);
    try {
      const q = query(collection(db, 'orders'), where('trackingId', '==', id));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        setOrder(querySnapshot.docs[0].data());
      } else {
        throw new Error('Not found');
      }
    } catch (error) {
      toast.error('Order not found. Please check your Tracking ID.');
      // Fallback for demo
      if (id === 'DEMO123') {
        setOrder({
          trackingId: 'DEMO123',
          status: 'rider_assigned',
          timeline: [
            { status: 'pickup_requested', message: 'Pickup requested', timestamp: new Date() },
            { status: 'pickup_confirmed', message: 'Pickup confirmed', timestamp: new Date() },
            { status: 'rider_assigned', message: 'Rider Debanjan assigned', timestamp: new Date() },
          ],
          pickupDetails: { address: 'Colonel Chowmuhani, Agartala', slot: 'Morning', date: new Date() },
          totalAmount: 345
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (trackingIdParam) fetchTracking(trackingIdParam);
  }, [trackingIdParam]);

  const allStatuses = [
    { id: 'pickup_requested', label: 'Pickup Requested' },
    { id: 'pickup_confirmed', label: 'Pickup Confirmed' },
    { id: 'rider_assigned', label: 'Rider Assigned' },
    { id: 'picked_up', label: 'Clothes Picked Up' },
    { id: 'washing_started', label: 'Cleaning Started' },
    { id: 'ready_for_delivery', label: 'Quality Checked' },
    { id: 'out_for_delivery', label: 'Out for Delivery' },
    { id: 'delivered', label: 'Successfully Delivered' }
  ];

  return (
    <main className="min-h-screen bg-primary/5 pt-32 pb-20 px-6 overflow-hidden">
      <Navbar />

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-black mb-6 tracking-tighter"
          >
            Track Your <span className="text-primary italic">Garments</span>.
          </motion.h1>
          <p className="text-foreground/40 font-bold text-xl mb-12">Enter your Tracking ID to see the real-time status of your order.</p>
          
          <div className="max-w-2xl mx-auto flex gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-foreground/20 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Enter ID (e.g., CLN-XJ829)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="w-full pl-16 pr-6 py-6 rounded-[32px] border-4 border-white glass shadow-xl outline-none font-black text-xl focus:border-primary transition-all"
              />
            </div>
            <Button onClick={() => fetchTracking(trackingId)} size="lg" className="rounded-[32px] px-12 shadow-primary/20">
              Track Now
            </Button>
          </div>
          <p className="mt-4 text-xs font-bold text-foreground/20 uppercase tracking-widest">Tip: Try tracking ID &quot;DEMO123&quot; for a demo view</p>
        </header>

        <AnimatePresence mode="wait">
          {order ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid lg:grid-cols-3 gap-10"
            >
              {/* Timeline View */}
              <div className="lg:col-span-2 glass p-10 md:p-16 rounded-[64px] shadow-2xl border-white/40">
                <div className="flex flex-wrap items-center justify-between gap-8 mb-16">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 mb-2">Current Status</p>
                    <h2 className="text-4xl font-black text-primary capitalize">{order.status.replace('_', ' ')}</h2>
                  </div>
                  <div className="px-8 py-4 bg-primary/5 rounded-3xl border-2 border-primary/10">
                    <p className="text-xs font-bold text-foreground/40 mb-1">Tracking ID</p>
                    <p className="font-black text-xl">#{order.trackingId}</p>
                  </div>
                </div>

                <div className="space-y-12 relative">
                  <div className="absolute top-0 left-8 bottom-0 w-1 bg-primary/5 -z-10" />
                  
                  {allStatuses.map((s, index) => {
                    const isCompleted = order.timeline.some((t: Record<string, any>) => t.status === s.id);
                    const isCurrent = order.status === s.id;
                    const log = order.timeline.find((t: Record<string, any>) => t.status === s.id);

                    return (
                      <motion.div
                        key={s.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-10 items-start group"
                      >
                        <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 border-4 border-white shadow-xl transition-all duration-500 ${
                          isCompleted ? 'bg-primary text-white scale-110' : 'bg-white text-foreground/10'
                        } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}>
                          {isCompleted ? <CheckCircle className="w-8 h-8" /> : <Package className="w-8 h-8" />}
                        </div>
                        <div className="pt-2">
                          <h3 className={`text-2xl font-black transition-colors ${isCompleted ? 'text-foreground' : 'text-foreground/20'}`}>
                            {s.label}
                          </h3>
                          <p className="text-sm font-bold text-foreground/40 mt-1">
                            {log ? new Date(log.timestamp).toLocaleString() : 'Pending'}
                          </p>
                          {isCurrent && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-4 p-4 bg-primary/5 rounded-2xl border border-primary/10 text-primary font-bold text-sm italic"
                            >
                              &quot;Our team is currently working on this stage. Thank you for your patience.&quot;
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-10">
                {/* Rider Card */}
                <div className="glass p-10 rounded-[48px] shadow-xl border-white/40 overflow-hidden relative group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[64px] -z-10 group-hover:scale-150 transition-transform duration-700" />
                  <h3 className="font-black text-2xl mb-8 flex items-center gap-3">
                    <Truck className="w-6 h-6 text-primary" />
                    Delivery Agent
                  </h3>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 bg-primary/10 rounded-[24px] flex items-center justify-center text-primary shadow-inner">
                      <User className="w-10 h-10" />
                    </div>
                    <div>
                      <p className="font-black text-xl">Debanjan Das</p>
                      <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mt-1">ID: CLN-RIDER-004</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Button className="w-full rounded-2xl py-6 font-black text-lg">
                      <Phone className="w-5 h-5 mr-3" /> Call Rider
                    </Button>
                    <p className="text-center text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em]">Contact available from 9 AM - 8 PM</p>
                  </div>
                </div>

                {/* Summary Card */}
                <div className="glass p-10 rounded-[48px] shadow-xl border-white/40">
                  <h3 className="font-black text-2xl mb-8 flex items-center gap-3">
                    <Clock className="w-6 h-6 text-primary" />
                    Order Summary
                  </h3>
                  <div className="space-y-6">
                    <div className="flex justify-between">
                      <span className="font-bold text-foreground/40">Pickup Address</span>
                      <span className="font-bold text-right max-w-[150px] text-sm">{order.pickupDetails.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-foreground/40">Estimated Total</span>
                      <span className="font-black text-xl text-primary">₹{order.totalAmount}.00</span>
                    </div>
                    <hr className="border-foreground/5" />
                    <div className="flex items-center gap-3 p-4 bg-orange-50 text-orange-600 rounded-2xl border border-orange-100">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p className="text-xs font-bold leading-relaxed">Please ensure someone is available at the pickup location during the selected slot.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8">
                <Package className="w-16 h-16 text-primary/20" />
              </div>
              <h2 className="text-3xl font-black text-foreground/20">Waiting for Tracking ID...</h2>
            </div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

const TrackPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-black text-primary animate-pulse text-4xl">CLEANOVA...</div>}>
      <TrackContent />
    </Suspense>
  );
};

export default TrackPage;

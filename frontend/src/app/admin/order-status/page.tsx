'use client';
import React, { useEffect, useState } from 'react';
import { Package, Search, ChevronRight, Clock, MapPin, Loader2, User } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { serviceCatalog } from '@/lib/laundryData';

export default function OrderStatusPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { token } = useAuthStore();

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    try {
      const ordersSnapshot = await getDocs(collection(db, 'orders'));
      setOrders(ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, status: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { 
        status, 
        lastUpdated: new Date().toISOString()
      });
      toast.success(`Moved to ${status}`);
      setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    } catch (error) {
      toast.error("Failed to move order");
    }
  };

  const filteredOrders = orders.filter(o => 
    o.id?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.trackingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customerId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customerPhone?.includes(searchTerm)
  );

  const pendingOrders = filteredOrders.filter(o => !o.status || o.status === 'Pending');
  const processingOrders = filteredOrders.filter(o => o.status === 'Processing');
  const readyOrders = filteredOrders.filter(o => o.status === 'Ready to Deliver');
  const deliveredOrders = filteredOrders.filter(o => o.status === 'Delivered');

  // Helper to render order icons (first 4 items)
  const renderItemIcons = (items: any[]) => {
    if (!items || items.length === 0) return null;
    return items.slice(0, 4).map((item, idx) => {
      const service = serviceCatalog.find(s => s.name === item.name);
      if (service && service.icon) {
        const Icon = service.icon;
        return (
          <div key={idx} className="w-6 h-6 bg-gray-50 rounded flex items-center justify-center text-gray-500 border border-gray-100" title={item.name}>
            <Icon className="w-3 h-3 stroke-[2]" />
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div className="relative w-full h-full flex flex-col p-6 overflow-hidden">
      
      <header className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black mb-1 text-secondary">Kanban Tracking</h1>
          <p className="text-gray-400 font-semibold text-sm">Visual order status pipeline.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2.5 rounded-xl border border-gray-200 flex items-center gap-2 shadow-sm">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none bg-transparent font-semibold text-sm w-64 text-secondary" 
            />
          </div>
        </div>
      </header>

      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden pb-4">
          
          {/* PENDING COLUMN */}
          <div className="flex flex-col h-full bg-gray-50/50 rounded-3xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-white sticky top-0 z-10 flex justify-between items-center">
              <h3 className="font-black text-gray-500 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gray-400 block"></span>
                Pending ({pendingOrders.length})
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {pendingOrders.map((order, idx) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  idx={idx} 
                  renderItemIcons={renderItemIcons}
                  nextStatus="Processing"
                  onMove={(id: string) => handleStatusUpdate(id, 'Processing')}
                  borderColor="border-gray-300"
                />
              ))}
            </div>
          </div>

          {/* PROCESSING COLUMN */}
          <div className="flex flex-col h-full bg-orange-50/30 rounded-3xl border border-orange-100 overflow-hidden">
            <div className="p-4 border-b border-orange-100 bg-white sticky top-0 z-10 flex justify-between items-center">
              <h3 className="font-black text-orange-500 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500 block animate-pulse"></span>
                Processing ({processingOrders.length})
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {processingOrders.map((order, idx) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  idx={idx} 
                  renderItemIcons={renderItemIcons}
                  nextStatus="Ready to Deliver"
                  onMove={(id: string) => handleStatusUpdate(id, 'Ready to Deliver')}
                  borderColor="border-orange-300"
                />
              ))}
            </div>
          </div>

          {/* READY COLUMN */}
          <div className="flex flex-col h-full bg-green-50/30 rounded-3xl border border-green-100 overflow-hidden">
            <div className="p-4 border-b border-green-100 bg-white sticky top-0 z-10 flex justify-between items-center">
              <h3 className="font-black text-green-600 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500 block"></span>
                Ready To Deliver ({readyOrders.length})
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {readyOrders.map((order, idx) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  idx={idx} 
                  renderItemIcons={renderItemIcons}
                  nextStatus="Delivered"
                  onMove={(id: string) => handleStatusUpdate(id, 'Delivered')}
                  borderColor="border-green-300"
                />
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

function OrderCard({ order, idx, renderItemIcons, nextStatus, onMove, borderColor }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      className={`bg-white p-4 rounded-2xl shadow-sm border-l-4 ${borderColor} border-t border-r border-b border-t-gray-100 border-r-gray-100 border-b-gray-100 hover:shadow-md transition-all flex flex-col gap-3 group`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-black text-sm text-secondary flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-primary" />
            {order.customerId?.name || order.customerEmail?.split('@')[0] || 'Customer'}
          </h4>
          <p className="text-[10px] font-bold text-gray-400 mt-0.5 uppercase tracking-widest">
            {order.trackingId || `#${order.id.slice(0,8)}`}
          </p>
          <p className="text-[10px] font-black text-primary mt-0.5">₹{order.totalAmount || order.grossTotal || 0}</p>
        </div>
        <span className="bg-gray-50 text-gray-500 text-[10px] font-bold px-2 py-1 rounded border border-gray-100">
          {order.items?.length || 0} Items
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
        <Clock className="w-3.5 h-3.5" />
        Del: {order.pickupDate || order.deliveryDate || 'N/A'}
      </div>

      <div className="flex items-center gap-1 mt-1">
        {renderItemIcons(order.items)}
        {(order.items?.length || 0) > 4 && (
          <div className="w-6 h-6 bg-gray-50 rounded flex items-center justify-center text-[9px] font-black text-gray-500 border border-gray-100">
            +{order.items.length - 4}
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-gray-50 flex justify-end">
        <button 
          onClick={() => onMove(order.id)}
          className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-primary hover:text-primary-dark transition-colors"
        >
          Move to {nextStatus} <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
}

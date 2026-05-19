'use client';

import React, { useEffect, useState } from 'react';
import { Search, Clock, Loader2, Package, CheckCircle2, Truck, XCircle, MapPin, Calendar } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { motion } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ServiceIcon } from '@/components/ui/ServiceIcon';
import Link from 'next/link';

const COLUMNS = [
  { key: 'Pending',            label: 'Pending Pickup',    dot: 'bg-gray-400',    ring: 'border-gray-200',    bg: 'bg-gray-50/40',    text: 'text-gray-600' },
  { key: 'Processing',        label: 'In Cleaning',       dot: 'bg-orange-500 animate-pulse', ring: 'border-orange-200', bg: 'bg-orange-50/30', text: 'text-orange-600' },
  { key: 'Ready to Deliver',  label: 'Ready to Deliver',  dot: 'bg-green-500',   ring: 'border-green-200',   bg: 'bg-green-50/30',   text: 'text-green-600' },
  { key: 'Delivered',         label: 'Delivered',         dot: 'bg-blue-500',    ring: 'border-blue-200',    bg: 'bg-blue-50/30',    text: 'text-blue-600' },
];

const LEFT_BORDER: Record<string, string> = {
  Pending:           'border-l-gray-300',
  Processing:        'border-l-orange-400',
  'Ready to Deliver':'border-l-green-400',
  Delivered:         'border-l-blue-400',
};

export default function ClientOrderStatusPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.email) fetchOrders();
    else setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchOrders = async () => {
    try {
      const q = query(collection(db, 'orders'), where('customerEmail', '==', user!.email));
      const snap = await getDocs(q);
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error('Failed to fetch orders:', e);
    } finally {
      setLoading(false);
    }
  };

  const filtered = orders.filter(o =>
    (o.trackingId?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (o.status?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return (
    <div className="flex-1 flex justify-center items-center py-20">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );

  if (orders.length === 0) return (
    <div className="max-w-lg mx-auto mt-20 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
        <Package className="w-10 h-10 text-gray-300" />
      </div>
      <h3 className="text-xl font-black text-secondary">No Active Orders</h3>
      <p className="text-gray-400 font-semibold mt-2 text-sm">When you place an order, its live status will appear here in real time.</p>
      <Link href="/dashboard/book" className="inline-flex items-center gap-2 mt-5 bg-primary text-white px-6 py-3 rounded-xl font-black text-sm shadow-md hover:bg-primary/90 transition-all">
        Place Your First Order
      </Link>
    </div>
  );

  return (
    <div className="flex flex-col gap-5 max-w-7xl mx-auto h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-secondary tracking-tight">Order Tracking</h2>
          <p className="text-sm font-semibold text-gray-400 mt-1">{orders.length} total orders</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search tracking ID..." value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-all" />
        </div>
      </div>

      {/* Kanban */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden pb-2">
        {COLUMNS.map(col => {
          const colOrders = filtered.filter(o => (o.status || 'Pending') === col.key);
          return (
            <div key={col.key} className={`flex flex-col rounded-3xl border ${col.ring} ${col.bg} overflow-hidden shadow-sm`}>
              {/* Column header */}
              <div className="p-3.5 border-b border-gray-100 bg-white/80 flex items-center justify-between">
                <div className={`flex items-center gap-2 font-black text-sm ${col.text}`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${col.dot}`} />
                  {col.label}
                </div>
                <span className={`text-xs font-black px-2 py-0.5 rounded-full bg-white border ${col.ring} ${col.text}`}>
                  {colOrders.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar min-h-[120px]">
                {colOrders.length === 0 ? (
                  <div className="flex items-center justify-center py-8 text-gray-300">
                    <p className="text-xs font-bold">No orders here</p>
                  </div>
                ) : colOrders.map((order, idx) => (
                  <OrderCard key={order.id} order={order} idx={idx} leftBorder={LEFT_BORDER[col.key] || 'border-l-gray-300'} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function OrderCard({ order, idx, leftBorder }: { order: any; idx: number; leftBorder: string }) {
  const statusIcon: Record<string, React.ReactNode> = {
    Pending:           <Clock className="w-3.5 h-3.5 text-gray-500" />,
    Processing:        <Package className="w-3.5 h-3.5 text-orange-500" />,
    'Ready to Deliver':<CheckCircle2 className="w-3.5 h-3.5 text-green-500" />,
    Delivered:         <Truck className="w-3.5 h-3.5 text-blue-500" />,
    Cancelled:         <XCircle className="w-3.5 h-3.5 text-red-500" />,
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}
      className={`bg-white rounded-2xl border border-gray-100 border-l-4 ${leftBorder} shadow-sm p-4 hover:shadow-md transition-all`}>

      {/* Tracking ID + status icon */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-black text-primary uppercase tracking-wider">{order.trackingId || `#${order.id.slice(0,8)}`}</p>
        <span>{statusIcon[order.status] ?? statusIcon.Pending}</span>
      </div>

      {/* Service icons */}
      {order.items && order.items.length > 0 && (
        <div className="flex items-center gap-1.5 mb-3">
          {order.items.slice(0, 4).map((item: { name: string }, i: number) => (
            <div key={i} title={item.name} className="w-7 h-7 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center text-gray-500">
              <ServiceIcon name={item.name} className="w-3.5 h-3.5" />
            </div>
          ))}
          {order.items.length > 4 && (
            <span className="text-[10px] font-black text-gray-400">+{order.items.length - 4}</span>
          )}
        </div>
      )}

      {/* Summary */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500">
          <Calendar className="w-3 h-3" />
          Pickup: {order.pickupDate || '—'}
        </div>
        {order.address && (
          <div className="flex items-start gap-1.5 text-[11px] font-semibold text-gray-500">
            <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
            <span className="truncate">{order.address}</span>
          </div>
        )}
        <div className="flex items-center justify-between pt-1 border-t border-gray-50">
          <span className="text-[10px] font-bold text-gray-400">{order.items?.length ?? 0} items</span>
          <span className="font-black text-sm text-primary">₹{order.totalAmount ?? 0}</span>
        </div>
      </div>
    </motion.div>
  );
}

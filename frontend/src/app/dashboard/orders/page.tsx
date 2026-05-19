'use client';
import React, { useEffect, useState } from 'react';
import { Package, Search, Clock, CheckCircle2, Loader2, Truck, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { motion } from 'framer-motion';

const STATUS_CONFIG: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
  Pending:           { color: 'text-gray-600',  bg: 'bg-gray-100',   icon: <Clock className="w-3.5 h-3.5" /> },
  Processing:        { color: 'text-orange-600', bg: 'bg-orange-100', icon: <Package className="w-3.5 h-3.5" /> },
  'Ready to Deliver':{ color: 'text-green-600',  bg: 'bg-green-100',  icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  Delivered:         { color: 'text-blue-600',   bg: 'bg-blue-100',   icon: <Truck className="w-3.5 h-3.5" /> },
  Cancelled:         { color: 'text-red-600',    bg: 'bg-red-100',    icon: <XCircle className="w-3.5 h-3.5" /> },
};

export default function MyOrdersPage() {
  const { user } = useAuthStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user?.email) fetchOrders();
    else setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchOrders = async () => {
    try {
      const q = query(
        collection(db, 'orders'),
        where('customerEmail', '==', user!.email),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      // fallback without orderBy if no composite index
      try {
        const q2 = query(collection(db, 'orders'), where('customerEmail', '==', user!.email));
        const snap2 = await getDocs(q2);
        setOrders(snap2.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) { console.error(e); }
    } finally {
      setLoading(false);
    }
  };

  const filtered = orders.filter(o =>
    o.trackingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto flex flex-col h-full gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black text-secondary tracking-tight">My Orders</h2>
          <p className="text-sm font-semibold text-gray-400 mt-1">{orders.length} total orders</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search orders..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-primary text-sm font-semibold" />
          </div>
          <Link href="/dashboard/book" className="bg-primary text-white px-4 py-2.5 rounded-xl font-black text-sm shadow-sm hover:bg-primary/90 transition-all">
            + New Order
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-12 shadow-sm flex flex-col items-center justify-center text-center">
          <Package className="w-16 h-16 text-gray-200 mb-4" />
          <h3 className="text-xl font-black text-secondary">{orders.length === 0 ? 'No orders yet' : 'No results found'}</h3>
          <p className="text-gray-400 mt-2 font-semibold">
            {orders.length === 0 ? "You haven't placed any laundry orders yet." : 'Try a different search.'}
          </p>
          {orders.length === 0 && (
            <Link href="/dashboard/book" className="mt-6 bg-primary text-white px-6 py-3 rounded-xl font-black text-sm shadow-md hover:bg-primary/90 transition-all">
              Book Your First Service
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order, idx) => {
            const st = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.Pending;
            return (
              <motion.div key={order.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-black ${st.bg} ${st.color}`}>
                      {st.icon} {order.status || 'Pending'}
                    </span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{order.trackingId}</span>
                  </div>
                  <p className="font-black text-secondary text-sm">
                    {order.items?.length ?? 0} item(s) — {order.address}
                  </p>
                  <p className="text-xs font-semibold text-gray-400 mt-1">Pickup: {order.pickupDate || 'Not set'}{order.deliveryDate ? `  •  Delivery: ${order.deliveryDate}` : ''}</p>
                </div>
                <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                  <p className="text-xl font-black text-primary">₹{order.totalAmount ?? 0}</p>
                  <p className="text-xs font-bold text-gray-400">{order.paymentMethod}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

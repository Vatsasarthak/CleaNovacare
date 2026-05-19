'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import {
  ShoppingBag, Clock, CheckCircle2, Truck, Plus, ArrowRight,
  Shirt, Sparkles, Package, TrendingUp
} from 'lucide-react';
import { ServiceIcon } from '@/components/ui/ServiceIcon';

const QUICK_SERVICES = [
  'Shirt', 'Pant', 'Saree', 'Blanket', 'Sofa', 'Shoes',
  'Jeans', 'Kurta Men', 'Jacket', 'Bedsheet', 'Hoodie', 'Towel'
];

const STATUS_META: Record<string, { color: string; bg: string; dot: string }> = {
  Pending:            { color: 'text-gray-600',  bg: 'bg-gray-100',   dot: 'bg-gray-400' },
  Processing:         { color: 'text-orange-600', bg: 'bg-orange-100', dot: 'bg-orange-500' },
  'Ready to Deliver': { color: 'text-green-600',  bg: 'bg-green-100',  dot: 'bg-green-500' },
  Delivered:          { color: 'text-blue-600',   bg: 'bg-blue-100',   dot: 'bg-blue-500' },
};

export default function ClientDashboardPage() {
  const { user } = useAuthStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, spent: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) loadDashboardData();
    else setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadDashboardData = async () => {
    try {
      const q = query(
        collection(db, 'orders'),
        where('customerEmail', '==', user!.email),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      const snap = await getDocs(q);
      const orders = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setRecentOrders(orders);

      // Stats from all orders
      const allQ = query(collection(db, 'orders'), where('customerEmail', '==', user!.email));
      const allSnap = await getDocs(allQ);
      const all = allSnap.docs.map(d => d.data());
      setStats({
        total: all.length,
        pending: all.filter(o => o.status === 'Pending' || o.status === 'Processing').length,
        completed: all.filter(o => o.status === 'Delivered').length,
        spent: all.reduce((s, o) => s + (o.totalAmount || 0), 0),
      });
    } catch {
      // fallback without orderBy
      try {
        const q2 = query(collection(db, 'orders'), where('customerEmail', '==', user!.email));
        const snap2 = await getDocs(q2);
        const orders = snap2.docs.map(d => ({ id: d.id, ...d.data() })).slice(0, 5);
        setRecentOrders(orders);
      } catch { /* silent */ }
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Orders', value: stats.total, icon: ShoppingBag, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'In Progress', value: stats.pending, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-100' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-100' },
    { label: 'Total Spent', value: `₹${stats.spent}`, icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-100' },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">

      {/* Welcome Banner */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-6 text-white flex justify-between items-center shadow-lg shadow-primary/20 overflow-hidden relative">
        <div className="absolute -right-8 -top-8 w-48 h-48 bg-white/5 rounded-full" />
        <div className="absolute -right-2 -bottom-8 w-32 h-32 bg-white/5 rounded-full" />
        <div className="relative z-10">
          <p className="text-white/70 text-sm font-semibold">Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'},</p>
          <h2 className="text-2xl font-black mt-0.5">{user?.name || 'Customer'} 👋</h2>
          <p className="text-white/70 text-sm mt-1">Your laundry is in safe hands with CleaNova.</p>
        </div>
        <Link href="/dashboard/book"
          className="relative z-10 flex items-center gap-2 bg-white text-primary px-5 py-3 rounded-2xl font-black text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
          <Plus className="w-4 h-4" /> Book Now
        </Link>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center shrink-0`}>
              <s.icon className={`w-6 h-6 ${s.color}`} />
            </div>
            <div>
              <p className="text-2xl font-black text-secondary">{loading ? '—' : s.value}</p>
              <p className="text-xs font-bold text-gray-400 mt-0.5">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Quick Book Services */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-black text-secondary text-base">Quick Book</h3>
              <p className="text-xs font-semibold text-gray-400 mt-0.5">Tap any service to book instantly</p>
            </div>
            <Link href="/dashboard/book" className="flex items-center gap-1 text-xs font-black text-primary hover:underline">
              All Services <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {QUICK_SERVICES.map((name, idx) => (
              <Link key={name} href="/dashboard/book">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.03 }}
                  whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-primary/5 hover:border-primary/30 transition-all gap-2 group cursor-pointer shadow-sm">
                  <div className="w-11 h-11 rounded-[14px] bg-white flex items-center justify-center text-gray-500 group-hover:text-primary group-hover:bg-primary/10 transition-all shadow-sm">
                    <ServiceIcon name={name} className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black text-gray-600 group-hover:text-primary text-center leading-tight">{name}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-black text-secondary text-base">Recent Orders</h3>
              <p className="text-xs font-semibold text-gray-400 mt-0.5">Your latest bookings</p>
            </div>
            <Link href="/dashboard/orders" className="flex items-center gap-1 text-xs font-black text-primary hover:underline">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex-1 space-y-3">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-50 rounded-2xl animate-pulse" />
              ))
            ) : recentOrders.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-10 text-center">
                <Package className="w-12 h-12 text-gray-200 mb-3" />
                <p className="font-bold text-gray-400 text-sm">No orders yet</p>
                <Link href="/dashboard/book" className="mt-3 text-xs text-primary font-black hover:underline">
                  Place your first order →
                </Link>
              </div>
            ) : (
              recentOrders.map(order => {
                const m = STATUS_META[order.status] ?? STATUS_META.Pending;
                return (
                  <div key={order.id} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/20 transition-all">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm shrink-0">
                      <Shirt className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-xs text-secondary truncate">{order.trackingId}</p>
                      <p className="text-[10px] text-gray-400 font-semibold mt-0.5">{order.items?.length ?? 0} items • ₹{order.totalAmount}</p>
                    </div>
                    <span className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${m.bg} ${m.color} whitespace-nowrap`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
                      {order.status}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Feature CTAs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Truck, title: 'Track Order', desc: 'See real-time status of your laundry', href: '/dashboard/order-status', color: 'bg-blue-50 text-blue-600', btn: 'Track Now' },
          { icon: Sparkles, title: 'Special Offers', desc: 'Exclusive discounts on premium services', href: '/dashboard/pricing', color: 'bg-orange-50 text-orange-500', btn: 'View Offers' },
          { icon: Package, title: 'Order History', desc: 'Browse all your past orders', href: '/dashboard/orders', color: 'bg-green-50 text-green-600', btn: 'View All' },
        ].map((c, i) => (
          <motion.div key={c.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all group">
            <div className={`w-12 h-12 rounded-2xl ${c.color} flex items-center justify-center shrink-0`}>
              <c.icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-black text-sm text-secondary">{c.title}</h4>
              <p className="text-xs text-gray-400 font-semibold mt-0.5">{c.desc}</p>
              <Link href={c.href} className="inline-flex items-center gap-1 mt-2 text-xs font-black text-primary hover:underline group-hover:gap-2 transition-all">
                {c.btn} <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}

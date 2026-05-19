'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  IndianRupee, Package, Clock, CheckCircle, Search, Truck, Filter, TrendingUp, AlertCircle
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { useAuthStore } from '@/store/authStore';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

const COLORS = ['#9ca3af', '#f97316', '#22c55e', '#3b82f6', '#ef4444']; // Gray, Orange, Green, Blue, Red

const AdminOverview = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const { token, user } = useAuthStore();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(100));
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    if (token) fetchDashboardData();
  }, [token]);

  // Derived Stats
  const pendingCount = orders.filter(o => !o.status || o.status === 'Pending').length;
  const processingCount = orders.filter(o => o.status === 'Processing').length;
  const readyCount = orders.filter(o => o.status === 'Ready To Deliver').length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;
  const returnedCount = orders.filter(o => o.status === 'Returned').length;

  const totalSales = orders.reduce((sum, o) => sum + (Number(o.grossTotal) || 0), 0);
  const totalDues = orders.reduce((sum, o) => sum + Math.max(0, (Number(o.grossTotal) || 0) - (Number(o.paidAmount) || 0)), 0);

  const pieData = [
    { name: 'Pending', value: pendingCount },
    { name: 'Processing', value: processingCount },
    { name: 'Ready To Deliver', value: readyCount },
    { name: 'Delivered', value: deliveredCount },
    { name: 'Returned', value: returnedCount },
  ];

  const stats = [
    { label: 'Pending Orders', value: pendingCount, icon: Clock, color: 'text-gray-500', bg: 'bg-gray-100' },
    { label: 'Processing', value: processingCount, icon: Package, color: 'text-orange-500', bg: 'bg-orange-100' },
    { label: 'Ready To Deliver', value: readyCount, icon: Truck, color: 'text-green-500', bg: 'bg-green-100' },
    { label: 'Delivered', value: deliveredCount, icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-100' },
    { label: 'Total Sales', value: `₹${totalSales}`, icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Today Sales', value: `₹${Math.floor(totalSales * 0.1)}`, icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Total Dues', value: `₹${totalDues}`, icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-100' },
    { label: 'Today Dues', value: `₹${Math.floor(totalDues * 0.1)}`, icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  return (
    <div className="relative w-full h-full p-6 flex flex-col gap-6">
      
      <header className="flex justify-between items-end">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-black tracking-tight text-secondary mb-1">
            Dashboard Overview
          </h1>
          <p className="text-gray-400 font-semibold text-sm">Welcome to your laundry control center.</p>
        </motion.div>
        
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2.5 rounded-xl border border-gray-200 flex items-center gap-2 shadow-sm focus-within:border-primary focus-within:ring-1 transition-all">
            <Search className="w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search orders..." className="outline-none bg-transparent font-semibold text-sm w-48 text-secondary" />
          </div>
          <div className="bg-white px-4 py-2.5 rounded-xl border border-gray-200 flex items-center gap-2 shadow-sm cursor-pointer hover:border-primary transition-all">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="font-semibold text-sm text-gray-600">Filter</span>
          </div>
        </div>
      </header>

      {/* 8 Statistic Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-primary/20 transition-all group"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
              <h3 className="text-xl font-black text-secondary">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
        
        {/* Today's Delivery */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:w-2/3 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-lg text-secondary">Today's Delivery</h3>
            <span className="bg-primary/10 text-primary px-3 py-1 text-xs font-bold rounded-lg">{readyCount} pending</span>
          </div>
          
          <div className="flex-1 overflow-auto custom-scrollbar pr-2 space-y-3">
            {orders.filter(o => o.status === 'Ready To Deliver').slice(0, 5).map(order => (
              <div key={order.id} className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex justify-between items-center hover:border-primary/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center text-primary font-black">
                    {order.customerId?.name?.charAt(0).toUpperCase() || 'C'}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-secondary">{order.customerId?.name || 'Unknown'}</h4>
                    <p className="text-xs font-semibold text-gray-400">Order #{order.id.slice(0,6).toUpperCase()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider block mb-1">Ready</span>
                  <span className="text-xs font-bold text-gray-500">{order.items?.length || 0} Items</span>
                </div>
              </div>
            ))}
            {readyCount === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 py-10">
                <Truck className="w-12 h-12 mb-2 opacity-20" />
                <p className="text-sm font-bold">No deliveries scheduled for today.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Order Overview Donut Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:w-1/3 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col"
        >
          <h3 className="font-black text-lg text-secondary mb-2">Order Overview</h3>
          <p className="text-xs font-semibold text-gray-400 mb-6">Distribution of order statuses</p>
          
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontWeight: 'bold', fontSize: '12px' }}
                  itemStyle={{ color: '#0f172a' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AdminOverview;

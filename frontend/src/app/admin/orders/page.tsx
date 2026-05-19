'use client';
import React, { useEffect, useState } from 'react';
import { Package, Search, Edit, Trash2, Eye, DollarSign } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function OrdersPage() {
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
      toast.success("Status updated!");
      setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (orderId: string) => {
    if (confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteDoc(doc(db, 'orders', orderId));
        toast.success("Order deleted");
        setOrders(orders.filter(o => o.id !== orderId));
      } catch (error) {
        toast.error("Failed to delete order");
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'pending': return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'processing': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'ready to deliver': return 'bg-green-100 text-green-600 border-green-200';
      case 'delivered': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'returned': return 'bg-red-100 text-red-600 border-red-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const filteredOrders = orders.filter(o =>
    o.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.trackingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customerId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customerPhone?.includes(searchTerm)
  );

  return (
    <div className="relative w-full h-full flex flex-col p-6">
      
      <header className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black mb-1 text-secondary">Orders List</h1>
          <p className="text-gray-400 font-semibold text-sm">Manage all laundry orders.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2.5 rounded-xl border border-gray-200 flex items-center gap-2 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
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

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto custom-scrollbar">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredOrders.length > 0 ? (
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100">
                  <th className="py-4 pl-6">Order ID</th>
                  <th className="py-4 px-4">Dates</th>
                  <th className="py-4 px-4">Customer</th>
                  <th className="py-4 px-4">Contact</th>
                  <th className="py-4 px-4">Total Amount</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Payment</th>
                  <th className="py-4 px-4">Created By</th>
                  <th className="py-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredOrders.map((order, index) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    key={order.id} 
                    className="hover:bg-primary/5 transition-colors group text-sm font-semibold text-secondary"
                  >
                    <td className="py-4 pl-6">
                      <p className="text-primary font-black text-xs">{order.trackingId || `#${order.id.slice(0,8).toUpperCase()}`}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">ID: {order.id.slice(0,8)}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs">Pickup: {order.pickupDate || 'N/A'}</span>
                        <span className="text-[10px] text-gray-400">Delivery: {order.deliveryDate || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">{order.customerId?.name || order.customerEmail?.split('@')[0] || 'Unknown'}</td>
                    <td className="py-4 px-4 text-xs">{order.customerPhone || order.customerId?.phone || 'N/A'}</td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-black text-primary">₹{order.totalAmount || order.grossTotal || order.total || 0}</span>
                        <span className="text-[10px] text-gray-400">{order.items?.length || 0} items • {order.paymentMethod || 'COD'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={order.status || 'Pending'}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border outline-none cursor-pointer ${getStatusColor(order.status || 'Pending')}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Ready To Deliver">Ready To Deliver</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Returned">Returned</option>
                      </select>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-xs font-black px-2 py-1 rounded-full ${
                        order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs text-gray-500">{order.customerEmail?.split('@')[0] || 'Customer'}</td>
                    <td className="py-4 pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors" title="Add Payment">
                          <DollarSign className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(order.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-300">
              <Package className="w-16 h-16 mb-4 opacity-50" />
              <p className="font-bold text-lg text-gray-400">No orders found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

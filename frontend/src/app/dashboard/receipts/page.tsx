'use client';

import React, { useEffect, useState } from 'react';
import { Receipt, Search, Loader2, Package, Printer, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';

export default function MyReceiptsPage() {
  const { user } = useAuthStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    if (user?.email) {
      const q = query(collection(db, 'orders'), where('customerEmail', '==', user.email));
      getDocs(q).then(snap => {
        setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      }).finally(() => setLoading(false));
    } else setLoading(false);
  }, [user]);

  const filtered = orders.filter(o =>
    o.trackingId?.toLowerCase().includes(search.toLowerCase())
  );

  const handlePrint = () => window.print();

  if (selected) {
    return (
      <div className="max-w-2xl mx-auto print:max-w-full">
        <div className="flex items-center gap-3 mb-6 print:hidden">
          <button onClick={() => setSelected(null)} className="text-sm font-black text-gray-500 hover:text-primary flex items-center gap-1 transition-colors">
            ← Back to Receipts
          </button>
        </div>

        <div id="receipt" className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 print:shadow-none print:rounded-none print:border-0">
          {/* Receipt Header */}
          <div className="text-center border-b border-dashed border-gray-200 pb-6 mb-6">
            <h2 className="text-2xl font-black text-primary">CleaNova</h2>
            <p className="text-xs text-gray-400 font-semibold mt-1">Premium Laundry &amp; Dry Cleaning</p>
            <p className="text-xs text-gray-400 font-semibold">Agartala, Tripura • +91 98765 43210</p>
          </div>

          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Receipt No</p>
              <p className="font-black text-secondary">{selected.trackingId}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</p>
              <p className="font-black text-secondary">{selected.pickupDate || '—'}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Bill To</p>
            <p className="font-black text-secondary">{selected.customerId?.name || user?.name}</p>
            <p className="text-xs font-semibold text-gray-500">{selected.customerPhone || '—'}</p>
            <p className="text-xs font-semibold text-gray-500 mt-1">{selected.address}</p>
          </div>

          {/* Items Table */}
          <table className="w-full text-sm mb-6">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Service</th>
                <th className="text-center py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Qty</th>
                <th className="text-right py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Rate</th>
                <th className="text-right py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(selected.items || []).map((item: { name: string; qty: number; rate: number; total: number }, idx: number) => (
                <tr key={idx}>
                  <td className="py-2.5 font-semibold text-secondary">{item.name}</td>
                  <td className="py-2.5 text-center font-semibold text-gray-500">{item.qty}</td>
                  <td className="py-2.5 text-right font-semibold text-gray-500">₹{item.rate}</td>
                  <td className="py-2.5 text-right font-black text-secondary">₹{item.total ?? item.rate * item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="border-t border-dashed border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between text-sm font-semibold text-gray-500">
              <span>Subtotal</span><span>₹{selected.subtotal ?? selected.totalAmount}</span>
            </div>
            {selected.addonsTotal > 0 && (
              <div className="flex justify-between text-sm font-semibold text-gray-500">
                <span>Addons</span><span>₹{selected.addonsTotal}</span>
              </div>
            )}
            <div className="flex justify-between font-black text-secondary text-lg pt-2 border-t border-gray-200">
              <span>Total Amount</span><span className="text-primary">₹{selected.totalAmount}</span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 bg-green-50 border border-green-100 rounded-2xl p-3 text-green-700">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <div>
              <p className="text-xs font-black">Payment Method: {selected.paymentMethod}</p>
              <p className="text-[10px] font-semibold">Status: {selected.paymentStatus || 'Pending'}</p>
            </div>
          </div>

          <p className="text-center text-[10px] text-gray-400 font-semibold mt-6">
            Thank you for choosing CleaNova! 💙
          </p>
        </div>

        <div className="flex gap-3 mt-4 print:hidden">
          <button onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-black text-sm hover:bg-primary/90 transition-all shadow-md">
            <Printer className="w-4 h-4" /> Print Receipt
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black text-secondary tracking-tight">Payment Receipts</h2>
          <p className="text-sm font-semibold text-gray-400 mt-1">{orders.length} invoices available</p>
        </div>
        <div className="relative w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search by ID..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-all" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-3xl p-12 shadow-sm flex flex-col items-center text-center">
          <Receipt className="w-14 h-14 text-gray-200 mb-4" />
          <h3 className="text-lg font-black text-secondary">{orders.length === 0 ? 'No receipts yet' : 'Nothing found'}</h3>
          <p className="text-gray-400 mt-2 font-semibold text-sm">Receipts are generated automatically after booking.</p>
          <Link href="/dashboard/book" className="mt-5 bg-primary text-white px-5 py-2.5 rounded-xl font-black text-sm hover:bg-primary/90 transition-all shadow-md">
            Book a Service
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order, idx) => (
            <motion.div key={order.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 flex items-center gap-4 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer"
              onClick={() => setSelected(order)}>
              <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <Receipt className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-black text-secondary text-sm">{order.trackingId}</p>
                  <span className="text-[10px] font-black bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    {order.paymentMethod || 'COD'}
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-400 mt-0.5">
                  {order.items?.length ?? 0} items • Pickup: {order.pickupDate || '—'}
                </p>
              </div>
              <div className="text-right">
                <p className="font-black text-primary text-lg">₹{order.totalAmount}</p>
                <button className="text-xs font-black text-gray-400 hover:text-primary mt-0.5 flex items-center gap-1 transition-colors">
                  <Package className="w-3 h-3" /> View Receipt
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

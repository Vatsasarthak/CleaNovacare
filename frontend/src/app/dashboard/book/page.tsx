'use client';

import React, { useState } from 'react';
import { serviceCatalog, addonsList } from '@/lib/laundryData';
import { Search, Plus, Minus, Trash2, CheckCircle2, Calendar, MapPin, Phone, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  qty: number;
  rate: number;
  type: string;
}

const SERVICE_RATES: Record<string, number> = {
  'Shirt': 60, 'Pant': 60, 'T-Shirt': 50, 'Jeans': 70, 'Suit 2 pcs': 200,
  'Suit 3 pcs': 280, 'Coat': 180, 'Long Coat': 220, 'Jacket': 100, 'Leather Jacket': 250,
  'Sherwani': 350, 'Kurta Men': 80, 'Kurta Women': 90, 'Kurta Heavy': 120,
  'Saree': 120, 'Lehenga': 300, 'Dress': 120, 'Blouse': 60, 'Salwaar': 90,
  'Dupatta': 50, 'Petticoat': 60, 'Skirt': 70, 'Palazzo Pants': 80,
  'Half Pant': 50, 'Shorts': 50, 'Pajama': 50, 'Sweater': 140, 'Hoodie': 120,
  'Sweat Shirt': 100, 'Woolen T-Shirt': 80, 'Vest': 50, 'Waist Coat': 100,
  'Half Jacket': 80, 'Half Coat': 120, 'Riding Jacket': 150, 'Riding Pant': 100,
  'Jacket Hood': 130, 'Dhoti': 60, 'Lungi': 60, 'Tie': 40, 'Underwear': 30,
  'Socks': 20, 'Gloves': 40, 'Mufflers': 60, 'Woolen Cap': 40, 'Cap': 40,
  'Shawl': 80, 'Roomal': 30, 'Apron': 60, 'Pillow': 80, 'Pillow Cover': 40,
  'Sofa': 400, 'Sofa Cover': 200, 'Bedsheet': 100, 'Towel': 40, 'Quilt': 250,
  'Blanket': 200, 'Curtain': 150, 'Carpet': 200, 'Cover': 80, 'Mosquito Net': 120,
  'Teddy Bear': 150, 'Bag': 80, 'Shoes': 120, 'Sandal': 80, 'Mask': 30,
  'Long Sweater Women': 150, 'Due': 0,
  'Delivery & Pickup Charge': 50, 'Express Service': 100, 'Heavy Express Service': 150,
};

export default function ClientBookingPage() {
  const user = useAuthStore(state => state.user);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  // Booking form state
  const [form, setForm] = useState({
    customerName: user?.name || '',
    phone: '',
    address: '',
    pickupDate: '',
    deliveryDate: '',
    notes: '',
  });

  const filteredServices = serviceCatalog.filter(s =>
    s.type === 'service' && s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (service: typeof serviceCatalog[0]) => {
    const existing = cart.find(item => item.id === service.id);
    const rate = SERVICE_RATES[service.name] ?? 100;
    if (existing) {
      setCart(cart.map(item =>
        item.id === service.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...service, qty: 1, rate }]);
    }
  };

  const updateQty = (id: string, newQty: number) => {
    if (newQty < 1) return;
    setCart(cart.map(item => item.id === id ? { ...item, qty: newQty } : item));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.rate * item.qty, 0);
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = addonsList.find(a => a.id === id);
    return sum + (addon?.price || 0);
  }, 0);
  const grossTotal = subtotal + addonsTotal;

  const handleConfirmBooking = async () => {
    if (cart.length === 0) return toast.error('Please select at least one service.');
    if (!form.address.trim()) return toast.error('Please enter your pickup address.');
    if (!form.phone.trim()) return toast.error('Please enter your phone number.');
    if (!form.pickupDate) return toast.error('Please select a pickup date.');

    setIsSubmitting(true);
    try {
      const tid = `CLN-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

      const orderData = {
        trackingId: tid,
        customerId: { id: user?.id || '', name: form.customerName || user?.name || 'Customer', email: user?.email || '' },
        customerEmail: user?.email || '',
        customerPhone: form.phone,
        items: cart.map(item => ({ name: item.name, qty: item.qty, rate: item.rate, total: item.rate * item.qty })),
        addons: selectedAddons.map(id => addonsList.find(a => a.id === id)?.name || id),
        address: form.address,
        pickupDate: form.pickupDate,
        deliveryDate: form.deliveryDate || '',
        notes: form.notes || '',
        subtotal,
        addonsTotal,
        totalAmount: grossTotal,
        paymentMethod,
        paymentStatus: 'pending',
        status: 'Pending',
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'orders'), orderData);
      setTrackingId(tid);
      setBookingSuccess(true);
      toast.success(`Order placed! Tracking ID: ${tid}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingSuccess) {
    return (
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center py-20 text-center gap-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-14 h-14 text-green-500" />
        </motion.div>
        <h2 className="text-2xl font-black text-secondary">Booking Confirmed! 🎉</h2>
        <p className="text-gray-500 font-semibold">Your order has been placed successfully. We will pick up your laundry on the selected date.</p>
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 w-full">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Tracking ID</p>
          <p className="text-2xl font-black text-primary">{trackingId}</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => { setBookingSuccess(false); setCart([]); setForm({ customerName: user?.name || '', phone: '', address: '', pickupDate: '', deliveryDate: '', notes: '' }); }} className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-black text-sm text-gray-600 hover:bg-gray-50 transition-all">
            Book Another
          </button>
          <button onClick={() => router.push('/dashboard/order-status')} className="px-6 py-3 bg-primary text-white rounded-xl font-black text-sm hover:bg-primary/90 transition-all shadow-md">
            Track My Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-180px)] gap-6 max-w-7xl mx-auto">

      {/* LEFT — SERVICE GRID */}
      <div className="w-full lg:w-3/5 flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-semibold shadow-sm"
          />
        </div>

        <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-5 shadow-sm overflow-hidden flex flex-col">
          <h2 className="text-base font-black text-secondary mb-4">Select Services <span className="font-normal text-gray-400 text-xs">({cart.length} selected)</span></h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 overflow-y-auto custom-scrollbar pr-1 pb-2 max-h-[55vh]">
            {filteredServices.map((service, idx) => {
              const isSelected = cart.some(item => item.id === service.id);
              return (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.008 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  key={service.id}
                  onClick={() => addToCart(service)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 gap-2 border shadow-sm hover:shadow-md ${
                    isSelected ? 'bg-primary/5 border-primary' : 'bg-white border-gray-100 hover:border-primary/30 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center transition-all duration-200 ${
                    isSelected ? 'bg-primary text-white shadow-md shadow-primary/30' : 'bg-gray-50 text-gray-500 group-hover:bg-primary/10'
                  }`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-black text-center leading-tight ${isSelected ? 'text-primary' : 'text-gray-600'}`}>
                    {service.name}
                  </span>
                  <span className={`text-[9px] font-bold ${isSelected ? 'text-primary/70' : 'text-gray-400'}`}>
                    ₹{SERVICE_RATES[service.name] ?? 100}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT — ORDER FORM */}
      <div className="w-full lg:w-2/5 flex flex-col gap-4">

        {/* Cart */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
          <h2 className="text-base font-black text-secondary mb-3">Order Summary</h2>
          <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
            <AnimatePresence>
              {cart.length === 0 ? (
                <p className="text-center text-gray-400 text-sm py-6 font-semibold">Select services from the left ←</p>
              ) : (
                cart.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center justify-between gap-3 p-2.5 bg-gray-50 rounded-xl border border-gray-100"
                  >
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-xs truncate">{item.name}</p>
                      <p className="text-[10px] text-gray-400">₹{item.rate}/pc</p>
                    </div>
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-1 py-0.5">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-primary">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center font-black text-xs">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-primary">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="font-black text-xs text-secondary w-12 text-right">₹{item.rate * item.qty}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Addons */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Addons</p>
            <div className="flex flex-wrap gap-1.5">
              {addonsList.map(addon => {
                const sel = selectedAddons.includes(addon.id);
                return (
                  <button key={addon.id} onClick={() => sel ? setSelectedAddons(selectedAddons.filter(x => x !== addon.id)) : setSelectedAddons([...selectedAddons, addon.id])}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${sel ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200 hover:border-primary/40'}`}>
                    {addon.name} +₹{addon.price}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Totals */}
          <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
            <div className="flex justify-between text-xs font-semibold text-gray-500"><span>Subtotal</span><span>₹{subtotal}</span></div>
            {addonsTotal > 0 && <div className="flex justify-between text-xs font-semibold text-gray-500"><span>Addons</span><span>+₹{addonsTotal}</span></div>}
            <div className="flex justify-between text-sm font-black text-secondary pt-1 border-t border-gray-100">
              <span>Total</span><span className="text-primary">₹{grossTotal}</span>
            </div>
          </div>
        </div>

        {/* Customer Details Form */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-3">
          <h2 className="text-base font-black text-secondary">Pickup Details</h2>

          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Your full name *" value={form.customerName}
              onChange={e => setForm({ ...form, customerName: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-all" />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="tel" placeholder="Phone number *" value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-all" />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <textarea placeholder="Pickup address (house no, street, area) *" value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
              rows={2}
              className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-all resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Pickup Date *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="date" value={form.pickupDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setForm({ ...form, pickupDate: e.target.value })}
                  className="w-full pl-9 pr-2 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-all" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Delivery Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="date" value={form.deliveryDate}
                  min={form.pickupDate || new Date().toISOString().split('T')[0]}
                  onChange={e => setForm({ ...form, deliveryDate: e.target.value })}
                  className="w-full pl-9 pr-2 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-all" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Payment Method</label>
            <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold outline-none focus:border-primary">
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Pay on Pickup">Pay on Pickup</option>
              <option value="Online">Pay Online</option>
            </select>
          </div>

          <textarea placeholder="Special instructions (optional)" value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            rows={2}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-all resize-none" />

          <button
            onClick={handleConfirmBooking}
            disabled={isSubmitting || cart.length === 0}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl font-black text-sm hover:bg-primary/90 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
            {isSubmitting ? 'Placing Order...' : `Confirm & Book ₹${grossTotal}`}
          </button>
        </div>

      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { serviceCatalog, addonsList } from '@/lib/laundryData';
import { 
  Search, Plus, Minus, Trash2, Printer, Save, Check, UserPlus 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  const handlePrint = () => {
    window.print();
  };

  const filteredServices = serviceCatalog.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (service: any) => {
    const existing = cart.find(item => item.id === service.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === service.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...service, qty: 1, rate: 100, color: 'Any' }]);
    }
  };

  const updateCartItem = (id: string, field: string, value: any) => {
    setCart(cart.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.rate * item.qty), 0);
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = addonsList.find(a => a.id === id);
    return sum + (addon?.price || 0);
  }, 0);
  const taxableAmount = subtotal + addonsTotal - discount;
  const tax = taxableAmount * 0.18;
  const grossTotal = taxableAmount + tax;

  return (
    <>
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-100px)] gap-6 p-6">
      
      {/* LEFT PANE - SERVICES GRID */}
      <div className="w-full lg:w-3/5 flex flex-col gap-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search services..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-semibold shadow-sm"
          />
        </div>

        <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm overflow-hidden flex flex-col">
          <h2 className="text-lg font-black text-secondary mb-4">All Services</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 overflow-y-auto custom-scrollbar pr-2 pb-4">
            {filteredServices.map((service, idx) => {
              const isSelected = cart.some(item => item.id === service.id);
              
              return (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.01 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  key={service.id}
                  onClick={() => addToCart(service)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 gap-3 group border shadow-sm hover:shadow-md ${
                    isSelected 
                      ? 'bg-primary/5 border-primary shadow-primary/10' 
                      : 'bg-white border-gray-100 hover:border-primary/30 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-[18px] flex items-center justify-center transition-all duration-300 ${
                    isSelected 
                      ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                      : 'bg-gray-50 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary group-hover:shadow-inner'
                  }`}>
                    <service.icon className="w-7 h-7 stroke-[1.5]" />
                  </div>
                  <span className={`text-[11px] font-black text-center leading-tight transition-colors ${
                    isSelected ? 'text-primary' : 'text-gray-600 group-hover:text-primary'
                  }`}>
                    {service.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT PANE - BILLING DESK */}
      <div className="w-full lg:w-2/5 flex flex-col gap-6">
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col h-full">
          
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-black text-secondary">New Order</h2>
              <p className="text-xs font-bold text-gray-400 mt-1">Order #ORD-{Math.floor(Math.random() * 10000)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-600">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Customer Selection */}
          <div className="flex gap-2 mb-6">
            <div className="flex-1">
              <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all">
                <option value="">Select Customer...</option>
                <option value="1">John Doe (9876543210)</option>
              </select>
            </div>
            <button className="bg-primary/10 hover:bg-primary text-primary hover:text-white p-3 rounded-xl transition-all border border-primary/20">
              <UserPlus className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Table */}
          <div className="flex-1 overflow-auto mb-6 bg-gray-50 rounded-2xl border border-gray-100 p-2">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <ShoppingCartIcon className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-sm font-bold">No items selected.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {cart.map(item => (
                  <div key={item.id} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-primary/5 text-primary rounded-lg flex items-center justify-center">
                        <item.icon className="w-5 h-5 stroke-[1.5]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm truncate">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <input 
                            type="number" 
                            value={item.rate}
                            onChange={(e) => updateCartItem(item.id, 'rate', Number(e.target.value))}
                            className="w-16 text-xs border border-gray-200 rounded p-1 font-semibold outline-none focus:border-primary"
                          />
                          <span className="text-xs font-bold text-gray-400">/ pc</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
                      <button onClick={() => updateCartItem(item.id, 'qty', Math.max(1, item.qty - 1))} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-primary">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-bold text-sm">{item.qty}</span>
                      <button onClick={() => updateCartItem(item.id, 'qty', item.qty + 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-primary">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right w-16">
                      <p className="font-black text-sm text-secondary">₹{item.rate * item.qty}</p>
                    </div>

                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Addons */}
          <div className="mb-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Addons</p>
            <div className="flex flex-wrap gap-2">
              {addonsList.map(addon => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    onClick={() => {
                      if (isSelected) setSelectedAddons(selectedAddons.filter(id => id !== addon.id));
                      else setSelectedAddons([...selectedAddons, addon.id]);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      isSelected 
                        ? 'bg-primary text-white border-primary shadow-md' 
                        : 'bg-white text-gray-600 border-gray-200 hover:border-primary/40'
                    }`}
                  >
                    {addon.name} (+₹{addon.price})
                  </button>
                )
              })}
            </div>
          </div>

          {/* Billing Summary */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-2 mb-6">
            <div className="flex justify-between text-sm font-semibold text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            {addonsTotal > 0 && (
              <div className="flex justify-between text-sm font-semibold text-gray-600">
                <span>Addons Total</span>
                <span>+ ₹{addonsTotal.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-semibold text-gray-600 items-center">
              <span>Discount</span>
              <div className="flex items-center gap-1">
                <span className="text-xs">- ₹</span>
                <input 
                  type="number" 
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-16 text-right bg-white border border-gray-200 rounded px-2 py-1 outline-none focus:border-primary text-xs"
                />
              </div>
            </div>
            <div className="flex justify-between text-sm font-semibold text-gray-600">
              <span>Tax (18%)</span>
              <span>+ ₹{tax.toFixed(2)}</span>
            </div>
            <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between items-center">
              <span className="text-lg font-black text-secondary">Gross Total</span>
              <span className="text-2xl font-black text-primary">₹{grossTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment & Actions */}
          <div className="space-y-4 mt-auto">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Payment Method</label>
                <select 
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-primary"
                >
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Amount Paid</label>
                <input 
                  type="number" 
                  defaultValue={grossTotal.toFixed(2)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-primary text-secondary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 bg-secondary text-white py-4 rounded-xl font-black text-sm hover:bg-secondary/90 transition-all shadow-md">
                <Printer className="w-4 h-4" /> Print Tags
              </button>
              <button onClick={handlePrint} className="flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-black text-sm hover:bg-primary-dark transition-all shadow-md">
                <Check className="w-4 h-4" /> Save & Print
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>

      {/* PRINT-ONLY RECEIPT LAYOUT */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * { visibility: hidden; }
          #printable-receipt, #printable-receipt * { visibility: visible; }
          #printable-receipt { position: absolute; left: 0; top: 0; width: 300px; padding: 10px; font-family: monospace; }
        }
      `}} />
      <div id="printable-receipt" className="hidden print:block w-[300px] text-black">
        <div className="flex flex-col items-center border-b border-black pb-4 mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="CleaNova Logo" className="w-16 h-16 object-contain mb-2 grayscale" />
          <h2 className="text-xl font-black text-center uppercase">CleaNova DryClean</h2>
          <p className="text-xs text-center">Ramnagar Road No. 8, Agartala</p>
          <p className="text-xs text-center">+91 98765 43210</p>
        </div>
        
        <div className="mb-4 text-xs">
          <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
          <p><strong>Order:</strong> #ORD-{Math.floor(Math.random() * 10000)}</p>
          <p><strong>Customer:</strong> John Doe (9876543210)</p>
        </div>

        <table className="w-full text-xs mb-4">
          <thead className="border-y border-black font-bold">
            <tr>
              <th className="text-left py-1">Item</th>
              <th className="text-center py-1">Qty</th>
              <th className="text-right py-1">Amt</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={idx}>
                <td className="py-1 truncate max-w-[120px]">{item.name}</td>
                <td className="text-center py-1">{item.qty}</td>
                <td className="text-right py-1">₹{item.rate * item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-xs space-y-1 mb-4 border-b border-black pb-4">
          <div className="flex justify-between"><span>Subtotal:</span><span>₹{subtotal.toFixed(2)}</span></div>
          {addonsTotal > 0 && <div className="flex justify-between"><span>Addons:</span><span>₹{addonsTotal.toFixed(2)}</span></div>}
          {discount > 0 && <div className="flex justify-between"><span>Discount:</span><span>-₹{discount.toFixed(2)}</span></div>}
          <div className="flex justify-between"><span>Tax (18%):</span><span>₹{tax.toFixed(2)}</span></div>
          <div className="flex justify-between font-black text-sm mt-2 pt-2 border-t border-dashed border-black">
            <span>TOTAL:</span><span>₹{grossTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-center border border-black p-2 mb-4">
          <p className="text-xs font-bold mb-1">SCAN TO TRACK ORDER</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://cleanova-96192.web.app/track" alt="QR Code" className="w-20 h-20 mx-auto" />
        </div>

        <p className="text-[10px] text-center font-bold">Thank you for choosing CleaNova!</p>
      </div>
    </>
  );
}

// Simple fallback icon component
function ShoppingCartIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="21" r="1"/>
      <circle cx="19" cy="21" r="1"/>
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
    </svg>
  );
}

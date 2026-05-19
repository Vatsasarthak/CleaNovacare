'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Tag, Zap, Filter } from 'lucide-react';
import { ServiceIcon } from '@/components/ui/ServiceIcon';

interface PriceItem { name: string; price: number; category: string }

const ALL_SERVICES: PriceItem[] = [
  // Garments
  { name: 'Shirt', price: 60, category: 'Garments' },
  { name: 'T-Shirt', price: 50, category: 'Garments' },
  { name: 'Pant', price: 60, category: 'Garments' },
  { name: 'Jeans', price: 70, category: 'Garments' },
  { name: 'Kurta Men', price: 80, category: 'Garments' },
  { name: 'Kurta Women', price: 90, category: 'Garments' },
  { name: 'Kurta Heavy', price: 120, category: 'Garments' },
  { name: 'Saree', price: 120, category: 'Garments' },
  { name: 'Salwaar', price: 90, category: 'Garments' },
  { name: 'Blouse', price: 60, category: 'Garments' },
  { name: 'Dupatta', price: 50, category: 'Garments' },
  { name: 'Lehenga', price: 300, category: 'Garments' },
  { name: 'Dress', price: 120, category: 'Garments' },
  { name: 'Petticoat', price: 60, category: 'Garments' },
  { name: 'Skirt', price: 70, category: 'Garments' },
  { name: 'Pajama', price: 50, category: 'Garments' },
  { name: 'Half Pant', price: 50, category: 'Garments' },
  { name: 'Palazzo Pants', price: 80, category: 'Garments' },
  { name: 'Vest', price: 50, category: 'Garments' },
  { name: 'Underwear', price: 30, category: 'Garments' },
  { name: 'Socks', price: 20, category: 'Garments' },
  { name: 'Dhoti', price: 60, category: 'Garments' },
  { name: 'Lungi', price: 60, category: 'Garments' },
  // Jackets & Coats
  { name: 'Jacket', price: 100, category: 'Jackets & Coats' },
  { name: 'Half Jacket', price: 80, category: 'Jackets & Coats' },
  { name: 'Jacket Hood', price: 130, category: 'Jackets & Coats' },
  { name: 'Coat', price: 180, category: 'Jackets & Coats' },
  { name: 'Long Coat', price: 220, category: 'Jackets & Coats' },
  { name: 'Half Coat', price: 120, category: 'Jackets & Coats' },
  { name: 'Leather Jacket', price: 250, category: 'Jackets & Coats' },
  { name: 'Riding Jacket', price: 150, category: 'Jackets & Coats' },
  { name: 'Waist Coat', price: 100, category: 'Jackets & Coats' },
  { name: 'Sherwani', price: 350, category: 'Jackets & Coats' },
  // Suits & Formals
  { name: 'Suit 2 pcs', price: 200, category: 'Suits & Formals' },
  { name: 'Suit 3 pcs', price: 280, category: 'Suits & Formals' },
  // Winterwear
  { name: 'Sweater', price: 140, category: 'Winterwear' },
  { name: 'Long Sweater Women', price: 150, category: 'Winterwear' },
  { name: 'Hoodie', price: 120, category: 'Winterwear' },
  { name: 'Sweat Shirt', price: 100, category: 'Winterwear' },
  { name: 'Woolen T-Shirt', price: 80, category: 'Winterwear' },
  { name: 'Woolen Cap', price: 40, category: 'Winterwear' },
  { name: 'Mufflers', price: 60, category: 'Winterwear' },
  { name: 'Gloves', price: 40, category: 'Winterwear' },
  { name: 'Shawl', price: 80, category: 'Winterwear' },
  // Accessories
  { name: 'Tie', price: 40, category: 'Accessories' },
  { name: 'Cap', price: 40, category: 'Accessories' },
  { name: 'Bag', price: 80, category: 'Accessories' },
  { name: 'Apron', price: 60, category: 'Accessories' },
  { name: 'Mask', price: 30, category: 'Accessories' },
  { name: 'Roomal', price: 30, category: 'Accessories' },
  // Footwear
  { name: 'Shoes', price: 120, category: 'Footwear' },
  { name: 'Sandal', price: 80, category: 'Footwear' },
  // Household
  { name: 'Sofa', price: 400, category: 'Household' },
  { name: 'Sofa Cover', price: 200, category: 'Household' },
  { name: 'Pillow', price: 80, category: 'Household' },
  { name: 'Pillow Cover', price: 40, category: 'Household' },
  { name: 'Bedsheet', price: 100, category: 'Household' },
  { name: 'Towel', price: 40, category: 'Household' },
  { name: 'Blanket', price: 200, category: 'Household' },
  { name: 'Quilt', price: 250, category: 'Household' },
  { name: 'Curtain', price: 150, category: 'Household' },
  { name: 'Carpet', price: 200, category: 'Household' },
  { name: 'Mosquito Net', price: 120, category: 'Household' },
  { name: 'Cover', price: 80, category: 'Household' },
  // Others
  { name: 'Riding Pant', price: 100, category: 'Others' },
  { name: 'Teddy Bear', price: 150, category: 'Others' },
  { name: 'Express Service', price: 100, category: 'Others' },
  { name: 'Heavy Express Service', price: 150, category: 'Others' },
];

const CATEGORIES = ['All', ...Array.from(new Set(ALL_SERVICES.map(s => s.category)))];

const OFFERS = [
  { name: 'Wash & Fold Bundle', desc: '5 kg or more', regular: 250, offer: 199, save: 20 },
  { name: 'Express Same Day', desc: 'Ready in 6 hours', regular: 200, offer: 149, save: 25 },
  { name: 'Sofa Deep Clean', desc: 'Per seat', regular: 499, offer: 399, save: 20 },
  { name: 'Dry Clean Suit', desc: 'Full 2-piece suit', regular: 350, offer: 299, save: 15 },
];

export default function PricingPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = ALL_SERVICES.filter(s =>
    (category === 'All' || s.category === category) &&
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-secondary tracking-tight">Pricing &amp; Offers</h2>
          <p className="text-sm font-semibold text-gray-400 mt-1">Transparent pricing — no hidden charges</p>
        </div>
        <Link href="/dashboard/book" className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-black text-sm shadow-sm hover:bg-primary/90 transition-all self-start sm:self-auto">
          <Tag className="w-4 h-4" /> Book a Service
        </Link>
      </div>

      {/* Active Offers */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-black text-secondary text-sm">Special Offers</h3>
            <p className="text-[10px] font-semibold text-gray-400">Limited time deals</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {OFFERS.map((offer, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="relative overflow-hidden rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-4">
              <span className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                Save {offer.save}%
              </span>
              <p className="font-black text-secondary text-sm">{offer.name}</p>
              <p className="text-[10px] text-gray-400 font-semibold mb-3">{offer.desc}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-black text-primary">₹{offer.offer}</span>
                <span className="text-xs font-bold text-gray-400 line-through">₹{offer.regular}</span>
              </div>
              <Link href="/dashboard/book"
                className="mt-3 block text-center bg-primary text-white text-xs font-black py-2 rounded-xl hover:bg-primary/90 transition-all">
                Book Now
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Catalog */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search services..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-all" />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-all bg-white">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map((item, idx) => (
            <motion.div key={item.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.008 }}>
              <Link href="/dashboard/book">
                <div className="flex flex-col items-center p-3 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-primary/5 hover:border-primary/30 transition-all gap-2 group cursor-pointer shadow-sm hover:shadow-md">
                  <div className="w-12 h-12 rounded-[14px] bg-white flex items-center justify-center text-gray-500 group-hover:text-primary group-hover:bg-primary/10 transition-all shadow-sm">
                    <ServiceIcon name={item.name} className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black text-gray-600 group-hover:text-primary text-center leading-tight">{item.name}</span>
                  <span className="text-[10px] font-black text-primary">₹{item.price}</span>
                </div>
              </Link>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-10 text-center text-gray-400 font-semibold">
              No services found for &quot;{search}&quot;
            </div>
          )}
        </div>

        <p className="text-center text-[10px] text-gray-400 font-semibold mt-5">
          Prices are per piece unless specified. Final price may vary based on fabric and condition. GST applicable.
        </p>
      </div>

    </div>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ServiceIcon } from '@/components/ui/ServiceIcon';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const CATEGORY_SERVICES = [
  { category: 'Daily Wear', color: 'bg-blue-50 border-blue-100', dot: 'bg-blue-500', items: ['Shirt', 'T-Shirt', 'Pant', 'Jeans', 'Kurta Men', 'Kurta Women', 'Blouse', 'Saree'] },
  { category: 'Premium & Formals', color: 'bg-purple-50 border-purple-100', dot: 'bg-purple-500', items: ['Suit 2 pcs', 'Coat', 'Sherwani', 'Jacket', 'Blazer', 'Long Coat', 'Waist Coat', 'Tie'] },
  { category: 'Winterwear', color: 'bg-orange-50 border-orange-100', dot: 'bg-orange-500', items: ['Sweater', 'Hoodie', 'Sweat Shirt', 'Mufflers', 'Gloves', 'Woolen Cap', 'Shawl', 'Blanket'] },
  { category: 'Household & Linen', color: 'bg-green-50 border-green-100', dot: 'bg-green-500', items: ['Bedsheet', 'Towel', 'Curtain', 'Pillow', 'Quilt', 'Sofa', 'Carpet', 'Mosquito Net'] },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-[#f8f9fb] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,60,151,0.04),transparent_60%)]" />

      <div className="max-w-7xl mx-auto relative">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest bg-primary/5 border border-primary/15 px-4 py-2 rounded-full mb-4">
            What We Clean
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-secondary tracking-tight mb-4">
            We Clean <span className="text-primary italic">Everything</span> You Wear
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-base text-gray-500 font-semibold max-w-xl mx-auto">
            From everyday shirts to premium sherwanis — 70+ garment types handled by expert care professionals.
          </motion.p>
        </div>

        {/* Category Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CATEGORY_SERVICES.map((cat, catIdx) => (
            <motion.div key={cat.category}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: catIdx * 0.1 }}
              className={`bg-white rounded-3xl border ${cat.color} shadow-sm p-6`}>
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-2.5 h-2.5 rounded-full ${cat.dot}`} />
                <h3 className="font-black text-secondary text-sm uppercase tracking-widest">{cat.category}</h3>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {cat.items.map(name => (
                  <Link key={name} href="/dashboard/book">
                    <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                      className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-primary/5 hover:border-primary/20 transition-all group cursor-pointer">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-500 group-hover:text-primary shadow-sm transition-all">
                        <ServiceIcon name={name} className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] font-black text-gray-600 group-hover:text-primary text-center leading-tight">{name}</span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mt-8 text-center">
          <Link href="/dashboard/book"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 hover:-translate-y-0.5 transition-all">
            View All 70+ Services &amp; Book Now <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

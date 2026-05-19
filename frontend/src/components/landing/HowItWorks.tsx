'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Package, Sparkles, Truck } from 'lucide-react';
import Link from 'next/link';

const STEPS = [
  {
    step: '01',
    icon: Smartphone,
    title: 'Schedule a Pickup',
    desc: 'Open the app or website, select your services, enter your address, and choose a pickup time — takes under 60 seconds.',
    color: 'bg-blue-50 text-primary border-blue-100',
  },
  {
    step: '02',
    icon: Package,
    title: 'We Collect Your Clothes',
    desc: 'Our trained rider arrives at your door at the scheduled time and picks up your laundry in a sealed bag.',
    color: 'bg-orange-50 text-orange-500 border-orange-100',
  },
  {
    step: '03',
    icon: Sparkles,
    title: 'Expert Cleaning & Care',
    desc: 'Your garments are sorted, cleaned with premium eco-friendly products, dried, pressed, and quality-checked by experts.',
    color: 'bg-purple-50 text-purple-500 border-purple-100',
  },
  {
    step: '04',
    icon: Truck,
    title: 'Delivered to Your Door',
    desc: 'Fresh, clean, and neatly packed clothes are delivered back to you on your selected date — no waiting.',
    color: 'bg-green-50 text-green-500 border-green-100',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-white relative">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest bg-primary/5 border border-primary/15 px-4 py-2 rounded-full mb-4">
            Simple Process
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-secondary tracking-tight mb-4">
            How <span className="text-primary italic">CleaNova</span> Works
          </motion.h2>
          <p className="text-base text-gray-500 font-semibold max-w-xl mx-auto">
            From booking to delivery — a seamless 4-step experience designed around your convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div className="absolute top-14 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 hidden lg:block" />

          {STEPS.map((s, i) => (
            <motion.div key={s.step}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}
              className="flex flex-col items-center text-center relative">
              <div className={`w-28 h-28 rounded-3xl border-2 flex items-center justify-center mb-6 shadow-sm ${s.color} relative z-10 bg-white`}>
                <s.icon className="w-10 h-10" />
                <span className="absolute -top-3 -right-3 w-7 h-7 bg-secondary text-white text-xs font-black rounded-full flex items-center justify-center shadow">
                  {s.step}
                </span>
              </div>
              <h3 className="font-black text-secondary text-base mb-2">{s.title}</h3>
              <p className="text-sm text-gray-400 font-semibold leading-relaxed max-w-[220px] mx-auto">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="mt-14 bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-primary/20">
          <div>
            <h3 className="text-xl font-black text-white mb-1">Ready to try CleaNova?</h3>
            <p className="text-white/70 font-semibold text-sm">Schedule your first pickup today — free delivery on first order!</p>
          </div>
          <Link href="/dashboard/book"
            className="flex items-center gap-2 bg-white text-primary px-8 py-3.5 rounded-2xl font-black text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all shrink-0">
            Book Now — It&apos;s Free ✨
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar, LogIn, Star, Truck, Zap, ShieldCheck, HeadphonesIcon,
  CheckCircle2, ArrowRight
} from 'lucide-react';

const AVATARS = ['A', 'R', 'S', 'P', 'K'];

const FLOAT_CARDS = [
  { icon: Truck,         label: 'Free Pickup',       desc: 'Doorstep collection',    color: 'text-primary',   bg: 'bg-primary/10',  pos: 'top-8 -left-8' },
  { icon: Zap,           label: 'Express Service',    desc: 'Ready in 24 hours',      color: 'text-orange-500', bg: 'bg-orange-100', pos: 'top-1/3 -right-6' },
  { icon: ShieldCheck,   label: 'Premium Quality',    desc: '100% safe & hygienic',   color: 'text-green-500',  bg: 'bg-green-100',  pos: 'bottom-1/3 -left-6' },
  { icon: HeadphonesIcon,label: '24/7 Support',       desc: 'Always here for you',    color: 'text-purple-500', bg: 'bg-purple-100', pos: 'bottom-8 -right-6' },
];

const FEATURES = [
  { icon: Truck,         title: 'Free Pickup & Delivery', desc: 'Scheduled at your doorstep',  color: 'text-primary',    bg: 'bg-primary/5' },
  { icon: Zap,           title: 'Express Service',         desc: 'Cleaned in 24 hours',          color: 'text-orange-500', bg: 'bg-orange-50' },
  { icon: ShieldCheck,   title: 'Premium Quality',         desc: 'Expert garment care',           color: 'text-green-600',  bg: 'bg-green-50' },
  { icon: HeadphonesIcon,title: '24/7 Support',            desc: 'Help whenever you need',        color: 'text-purple-600', bg: 'bg-purple-50' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">

      {/* Subtle background shapes */}
      <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-bl from-[#f0f5ff] to-transparent -z-0" />
      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-[80px] -z-0 pointer-events-none" />
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute bottom-20 left-10 w-48 h-48 bg-orange-400/10 rounded-full blur-[60px] -z-0 pointer-events-none" />
      {/* Orange accent circle top-left */}
      <div className="absolute -top-8 -left-8 w-40 h-40 bg-orange-400/10 rounded-full blur-xl -z-0" />

      {/* Nav spacer */}
      <div className="h-20" />

      {/* ─── MAIN HERO ─────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-0">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center min-h-[calc(100vh-160px)]">

          {/* ── LEFT: Text + CTAs ── */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col justify-center py-12 lg:py-16">

            {/* Label */}
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 self-start bg-primary/5 border border-primary/20 text-primary text-[11px] font-black px-4 py-2 rounded-full mb-7 uppercase tracking-[0.2em]">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Agartala&apos;s #1 Premium Laundry
            </motion.div>

            {/* Headline */}
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.7 }}
              className="text-[2.8rem] sm:text-6xl lg:text-[4.2rem] font-black text-secondary leading-[1.05] tracking-tight mb-6">
              Clean Clothes,{' '}
              <span className="text-orange-500 italic">On Time.</span>
              <br />
              Every Time.
            </motion.h1>

            {/* Subheading */}
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
              className="text-lg text-gray-500 font-semibold leading-relaxed mb-8 max-w-[480px]">
              CleaNova makes laundry, dry cleaning, and pickup delivery simple — fast doorstep service with expert fabric care.
            </motion.p>

            {/* Checklist */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
              {['Free pickup & delivery', 'Same-day express', 'Eco-friendly cleaning'].map(t => (
                <div key={t} className="flex items-center gap-2 text-sm font-bold text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {t}
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}
              className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/dashboard/book"
                className="flex items-center justify-center gap-2.5 bg-primary text-white px-8 py-4 rounded-2xl font-black text-base shadow-xl shadow-primary/25 hover:bg-primary/90 hover:-translate-y-0.5 active:translate-y-0 transition-all">
                <Calendar className="w-5 h-5" />
                Schedule Pickup
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/login"
                className="flex items-center justify-center gap-2.5 bg-white text-secondary border-2 border-gray-200 px-8 py-4 rounded-2xl font-black text-base hover:border-primary/30 hover:text-primary hover:bg-primary/5 hover:-translate-y-0.5 transition-all shadow-sm">
                <LogIn className="w-5 h-5" />
                Login / Sign Up
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.52 }}
              className="flex items-center gap-4 pt-8 border-t border-gray-100">
              <div className="flex -space-x-3">
                {AVATARS.map((l, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary border-2 border-white flex items-center justify-center font-black text-white text-xs shadow-sm">
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />)}
                  <span className="text-secondary font-black text-sm ml-1">4.9/5</span>
                </div>
                <p className="text-xs font-semibold text-gray-400">Trusted by 5,000+ customers in Agartala</p>
              </div>
            </motion.div>

          </motion.div>

          {/* ── RIGHT: Lifestyle Image + Float Cards ── */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.9, ease: 'easeOut' }}
            className="relative hidden lg:flex items-end justify-center pb-0">

            {/* Decorative circle behind image */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[420px] h-[420px] bg-gradient-to-br from-primary/8 to-blue-100/50 rounded-full" />
            </div>

            {/* Lifestyle photo */}
            <div className="relative w-[380px] xl:w-[420px] aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl shadow-primary/15 border-4 border-white z-10">
              <Image
                src="/hero-lifestyle.png"
                alt="Happy CleaNova customer with fresh laundry"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Soft gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white/30 to-transparent" />
              {/* Orange brand accent strip */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 to-primary" />
            </div>

            {/* FLOAT CARD: Free Pickup */}
            <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute top-12 -left-6 z-20 bg-white rounded-2xl shadow-xl border border-gray-100 p-3.5 flex items-center gap-3 min-w-[180px]">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-black text-secondary text-sm leading-tight">Free Pickup</p>
                <p className="text-[10px] font-semibold text-gray-400">Doorstep collection</p>
              </div>
            </motion.div>

            {/* FLOAT CARD: Express */}
            <motion.div animate={{ y: [5, -5, 5] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="absolute top-1/3 -right-8 z-20 bg-white rounded-2xl shadow-xl border border-gray-100 p-3.5 flex items-center gap-3 min-w-[180px]">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="font-black text-secondary text-sm leading-tight">Express Service</p>
                <p className="text-[10px] font-semibold text-gray-400">Ready in 24 hrs</p>
              </div>
            </motion.div>

            {/* FLOAT CARD: Premium Quality */}
            <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
              className="absolute bottom-1/3 -left-8 z-20 bg-white rounded-2xl shadow-xl border border-gray-100 p-3.5 flex items-center gap-3 min-w-[180px]">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="font-black text-secondary text-sm leading-tight">Premium Quality</p>
                <p className="text-[10px] font-semibold text-gray-400">100% safe & hygienic</p>
              </div>
            </motion.div>

            {/* FLOAT BADGE: Rating */}
            <motion.div animate={{ y: [4, -4, 4] }} transition={{ duration: 3.8, repeat: Infinity, delay: 1.5 }}
              className="absolute bottom-12 -right-6 z-20 bg-orange-400 rounded-2xl shadow-xl px-4 py-3 text-white">
              <p className="font-black text-2xl leading-none">4.9 ★</p>
              <p className="text-[10px] font-bold text-white/80 mt-0.5">Customer Rating</p>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* ─── FEATURE STRIP ───────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 mt-4 lg:-mt-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }}
          className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 p-2">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 + i * 0.08 }}
                className="flex items-center gap-4 px-6 py-5 group hover:bg-gray-50/70 rounded-2xl transition-all cursor-default">
                <div className={`w-12 h-12 rounded-2xl ${f.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <div>
                  <p className="font-black text-secondary text-sm leading-tight">{f.title}</p>
                  <p className="text-[11px] font-semibold text-gray-400 mt-0.5">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}

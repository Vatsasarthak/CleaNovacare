'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  { name: 'Priya Sharma', role: 'Working Professional', rating: 5, text: 'CleaNova completely changed how I handle my laundry. The pickup is always on time, and my clothes come back perfectly clean and pressed. Absolutely love this service!' },
  { name: 'Rahul Das', role: 'College Student', rating: 5, text: 'Super affordable and fast! I used the express service for my interview suit and it was ready in less than 12 hours. The quality was impeccable. Highly recommend!' },
  { name: 'Sunita Deb', role: 'Homemaker', rating: 5, text: 'Finally a laundry service in Agartala that actually takes care of delicate sarees properly. They cleaned my Banarasi without any damage. Very impressed.' },
  { name: 'Amit Chakma', role: 'Business Owner', rating: 5, text: 'I use CleaNova for all my formal wear — suits, sherwanis, everything. The dry cleaning quality is professional grade. My go-to for important meetings.' },
  { name: 'Meena Roy', role: 'Teacher', rating: 5, text: 'The app is so easy to use! Booked a pickup, got a notification, and my laundry was delivered next day. Everything was packaged so neatly. Great experience!' },
  { name: 'Ranjit Tripura', role: 'IT Professional', rating: 5, text: 'Outstanding service quality. They clean my gym clothes, office shirts and even my kids\' uniforms. Everything comes back fresh every single time.' },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 bg-[#f8f9fb] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,60,151,0.04),transparent_60%)]" />

      <div className="max-w-7xl mx-auto relative">

        <div className="text-center mb-14">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest bg-primary/5 border border-primary/15 px-4 py-2 rounded-full mb-4">
            Customer Love
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-secondary tracking-tight mb-4">
            5,000+ Happy{' '}
            <span className="text-primary italic">Customers</span>
          </motion.h2>
          <p className="text-base text-gray-500 font-semibold max-w-xl mx-auto">
            Real feedback from real customers across Agartala who trust CleaNova with their precious garments.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />)}
            <span className="font-black text-secondary ml-2">4.9 out of 5</span>
            <span className="text-gray-400 font-semibold text-sm">(2,400+ reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <motion.div key={r.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col">
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="text-gray-600 font-semibold text-sm leading-relaxed flex-1 mb-5">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center font-black text-primary text-sm shrink-0">
                  {r.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-secondary text-sm">{r.name}</p>
                  <p className="text-[10px] font-semibold text-gray-400">{r.role}</p>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-orange-400 text-orange-400" />)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

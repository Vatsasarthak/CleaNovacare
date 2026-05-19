'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const pricingOffers = [
  { service: 'Laundry & Dry Clean (Shirt)', regular: 180, offer: 60, save: '66%' },
  { service: 'Steam Press (Shirt/Pant)', regular: 20, offer: 15, save: '25%' },
  { service: 'Kids Regular Wear', regular: 65, offer: 50, save: '23%' },
  { service: 'Blanket (Double)', regular: 550, offer: 440, save: '20%' },
  { service: 'Quilt (Single)', regular: 275, offer: 220, save: '20%' },
  { service: 'Soft Toy', regular: 150, offer: 120, save: '20%' },
];


const Pricing = () => {
  return (
    <section id="pricing" className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6"
          >
            <Zap className="w-4 h-4 fill-primary" />
            SPECIAL LAUNCH OFFER
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
            Exclusive Quotation <br />
            <span className="text-primary italic">Limited Time Only</span>
          </h2>
          <p className="text-foreground/40 font-bold max-w-2xl mx-auto text-lg">
            Get premium fabric care at unbeatable prices. Check our special launch offers below.
          </p>
        </div>

        <div className="glass rounded-[48px] border-white/40 shadow-2xl overflow-hidden bg-white/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-10 py-8 font-black text-lg uppercase tracking-widest">Service</th>
                  <th className="px-10 py-8 font-black text-lg uppercase tracking-widest text-center">Regular Price</th>
                  <th className="px-10 py-8 font-black text-lg uppercase tracking-widest text-center">Offer Price</th>
                  <th className="px-10 py-8 font-black text-lg uppercase tracking-widest text-center">Save Up To</th>
                  <th className="px-10 py-8 font-black text-lg uppercase tracking-widest text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5">
                {pricingOffers.map((offer, index) => (
                  <motion.tr
                    key={offer.service}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01, backgroundColor: 'rgba(var(--primary), 0.02)' }}
                    className="hover:bg-primary/5 transition-all group"
                  >
                    <td className="px-10 py-10">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                          <Check className="w-6 h-6" />
                        </div>
                        <span className="font-black text-2xl text-foreground tracking-tight">{offer.service}</span>
                      </div>
                    </td>
                    <td className="px-10 py-10 text-center">
                      <span className="text-foreground/20 font-bold text-xl line-through">₹{offer.regular}</span>
                    </td>
                    <td className="px-10 py-10 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-primary font-black text-4xl mb-1">₹{offer.offer}</span>
                        <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest">Limited Offer</span>
                      </div>
                    </td>
                    <td className="px-10 py-10 text-center">
                      <motion.span 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="px-6 py-3 rounded-2xl bg-green-500 text-white font-black text-xs shadow-lg shadow-green-200 inline-block"
                      >
                        SAVE {offer.save}
                      </motion.span>
                    </td>
                    <td className="px-10 py-10 text-center">
                      <Link href="/book">
                        <Button size="lg" className="rounded-2xl px-10 h-16 shadow-xl shadow-primary/20 font-black group overflow-hidden relative">
                          <span className="relative z-10">Book Now</span>
                          <motion.div 
                            className="absolute top-0 left-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                          />
                        </Button>
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-primary/5 p-8 text-center border-t border-primary/10">
            <p className="text-foreground/40 font-bold text-sm italic">
              *T&C Apply. Prices are indicative and may vary depending on fabric type and stains.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

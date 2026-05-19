'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

const LINKS = {
  Services: ['Laundry', 'Dry Cleaning', 'Steam Iron', 'Shoe Cleaning', 'Sofa Cleaning', 'Express Service'],
  Company: ['About Us', 'How it Works', 'Pricing', 'Blog', 'Careers', 'Contact'],
  Support: ['FAQ', 'Track Order', 'Refund Policy', 'Privacy Policy', 'Terms of Service'],
};

export default function Footer() {
  return (
    <footer className="bg-secondary text-white/80">
      {/* CTA Banner */}
      <div className="bg-primary px-6 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black text-white">Start Your First Order Today</h3>
            <p className="text-white/70 font-semibold mt-1">Free pickup &amp; delivery on your first order. No credit card required.</p>
          </div>
          <Link href="/dashboard/book"
            className="flex items-center gap-2 bg-white text-primary px-8 py-3.5 rounded-2xl font-black text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all shrink-0">
            Book a Pickup — Free ✨
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="relative w-36 h-14 mb-5">
              <Image src="/logo.png" alt="CleaNova" fill className="object-contain object-left" />
            </div>
            <p className="text-sm font-semibold text-white/50 leading-relaxed mb-5 max-w-xs">
              Agartala&apos;s most trusted laundry and dry cleaning platform. Professional fabric care, delivered to your door.
            </p>
            <div className="space-y-2">
              <a href="tel:+919876543210" className="flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors">
                <Phone className="w-4 h-4" /> +91 98765 43210
              </a>
              <a href="mailto:hello@cleanovacare.com" className="flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors">
                <Mail className="w-4 h-4" /> hello@cleanovacare.com
              </a>
              <div className="flex items-start gap-2 text-sm font-semibold text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" /> Ramnagar Road No. 8, Agartala, Tripura - 799002
              </div>
            </div>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: Instagram, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Youtube, href: '#' },
              ].map((s, i) => (
                <a key={i} href={s.href} className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([cat, links]) => (
            <div key={cat}>
              <h4 className="font-black text-white text-sm uppercase tracking-widest mb-4">{cat}</h4>
              <ul className="space-y-2">
                {links.map(l => (
                  <li key={l}>
                    <Link href="#" className="text-sm font-semibold text-white/50 hover:text-white transition-colors">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-semibold text-white/40">© 2025 CleaNova. All rights reserved. Made with ❤️ in Agartala.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs font-semibold text-white/40 hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="text-xs font-semibold text-white/40 hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="text-xs font-semibold text-white/40 hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

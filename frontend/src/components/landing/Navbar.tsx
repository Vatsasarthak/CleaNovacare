'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, LogIn, LogOut, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { name: 'Services',    href: '/#services' },
  { name: 'How It Works',href: '/#how-it-works' },
  { name: 'Pricing',     href: '/dashboard/pricing' },
  { name: 'Track Order', href: '/dashboard/order-status' },
  { name: 'Offers',      href: '/dashboard/pricing' },
  { name: 'About Us',    href: '/#testimonials' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => { logout(); window.location.href = '/'; };

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-100' : 'bg-white/80 backdrop-blur-md'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18 py-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative w-12 h-12">
              <Image src="/logo.png" alt="CleaNova" fill className="object-contain" priority />
            </div>
            <div className="hidden sm:block">
              <p className="font-black text-secondary text-base leading-tight">CleaNova</p>
              <p className="text-[9px] font-bold text-primary uppercase tracking-widest">Dryclean</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link key={link.name} href={link.href}
                className="px-3.5 py-2 text-sm font-bold text-gray-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+919876543210"
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-600 hover:text-primary transition-colors rounded-xl hover:bg-gray-50">
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </a>
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <Link href={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="flex items-center gap-2 bg-primary/5 border border-primary/20 text-primary px-4 py-2 rounded-xl text-sm font-black hover:bg-primary/10 transition-all">
                  Dashboard
                </Link>
                <button onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-500 px-3 py-2 rounded-xl text-sm font-black hover:bg-red-100 transition-all">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link href="/login"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-black text-gray-700 border border-gray-200 rounded-xl hover:border-primary/30 hover:text-primary transition-all">
                  <LogIn className="w-4 h-4" /> Login
                </Link>
                <Link href="/dashboard/book"
                  className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-black shadow-md shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 transition-all">
                  Book Pickup
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {NAV_LINKS.map(link => (
                <Link key={link.name} href={link.href} onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold text-gray-600 hover:bg-primary/5 hover:text-primary transition-all">
                  {link.name} <ChevronDown className="w-3.5 h-3.5 -rotate-90 opacity-40" />
                </Link>
              ))}
              <div className="flex gap-3 pt-3 border-t border-gray-50">
                <Link href="/login" onClick={() => setMobileOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-700 py-3 rounded-2xl text-sm font-black">
                  <LogIn className="w-4 h-4" /> Login
                </Link>
                <Link href="/dashboard/book" onClick={() => setMobileOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-2xl text-sm font-black shadow-md shadow-primary/20">
                  Book Pickup
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Home, CalendarPlus, Package, ListOrdered, Tag, Receipt,
  UserCircle, LogOut, Menu, X, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { motion, AnimatePresence } from 'framer-motion';

const MENU = [
  { name: 'Dashboard',       icon: Home,         href: '/dashboard',              exact: true },
  { name: 'Book Service',    icon: CalendarPlus,  href: '/dashboard/book' },
  { name: 'My Orders',       icon: Package,       href: '/dashboard/orders' },
  { name: 'Order Status',    icon: ListOrdered,   href: '/dashboard/order-status' },
  { name: 'Pricing',         icon: Tag,           href: '/dashboard/pricing' },
  { name: 'Receipts',        icon: Receipt,       href: '/dashboard/receipts' },
  { name: 'Profile',         icon: UserCircle,    href: '/dashboard/profile' },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 flex items-center justify-between border-b border-gray-50">
        <Link href="/dashboard" className="relative w-36 h-14 flex items-center" onClick={onClose}>
          <Image src="/logo.png" alt="CleaNova" fill className="object-contain object-left" priority />
        </Link>
        {onClose && (
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 lg:hidden">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 mb-2">Menu</p>
        <div className="space-y-0.5">
          {MENU.map(item => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link key={item.name} href={item.href} onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-200 group',
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/25'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-secondary'
                )}>
                <item.icon className={cn('w-[18px] h-[18px] shrink-0', isActive ? 'stroke-2' : 'stroke-[1.5]')} />
                <span className="font-bold text-sm flex-1">{item.name}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User + Logout */}
      <div className="p-4 border-t border-gray-50 space-y-2">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-gray-50 border border-gray-100">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <UserCircle className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-secondary truncate">{user?.name || 'Customer'}</p>
            <p className="text-[10px] font-semibold text-gray-400 truncate">{user?.email || ''}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-2xl text-red-500 hover:bg-red-50 transition-all group">
          <LogOut className="w-[18px] h-[18px] stroke-[1.5] group-hover:scale-110 transition-transform" />
          <span className="font-bold text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}

const ClientSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-[260px] bg-white h-screen border-r border-gray-100 flex-col shadow-[2px_0_16px_rgba(0,0,0,0.03)] z-20 shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile hamburger */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 shadow-sm"
        onClick={() => setMobileOpen(true)}>
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)} />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 h-full w-[260px] bg-white z-50 shadow-2xl flex flex-col">
              <SidebarContent onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ClientSidebar;

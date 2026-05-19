'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Search, Bell, UserCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const ClientHeader = () => {
  const pathname = usePathname();
  const user = useAuthStore(state => state.user);

  const getTitle = () => {
    if (pathname === '/dashboard') return 'Client Dashboard';
    if (pathname.includes('/book')) return 'Book New Service';
    if (pathname.includes('/order-status')) return 'My Order Status';
    if (pathname.includes('/orders')) return 'My Orders';
    if (pathname.includes('/pricing')) return 'Pricing & Offers';
    if (pathname.includes('/receipts')) return 'Payment Receipts';
    if (pathname.includes('/profile')) return 'My Profile';
    
    const parts = pathname.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1] || 'Dashboard';
    return lastPart.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <div className="bg-primary text-white flex flex-col pt-4 px-8 pb-8">
      <div className="flex items-center justify-between mb-8">
        <button className="p-1 hover:bg-white/10 rounded transition-colors lg:hidden">
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden lg:block"></div> {/* Spacer for desktop */}
        
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors relative">
            <Search className="w-5 h-5 stroke-[1.5]" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors relative">
            <Bell className="w-5 h-5 stroke-[1.5]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-primary"></span>
          </button>
          <div className="flex items-center gap-3 pl-2 border-l border-white/20">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold leading-none">{user?.name || 'Customer'}</p>
              <p className="text-[10px] text-white/60 mt-0.5 font-medium">{user?.email || ''}</p>
            </div>
            <button className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors">
              <UserCircle className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </div>
      
      <div>
        <h1 className="text-3xl font-black tracking-tight">{getTitle()}</h1>
        <p className="text-white/70 text-sm mt-1 font-semibold">Manage your laundry services effortlessly.</p>
      </div>
    </div>
  );
};

export default ClientHeader;

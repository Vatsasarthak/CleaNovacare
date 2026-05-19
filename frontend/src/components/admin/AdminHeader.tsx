'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Plus, Tag, User } from 'lucide-react';

const AdminHeader = () => {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname.includes('/financial-year')) return 'Financial Year';
    if (pathname.includes('/mail-settings')) return 'Mail Settings';
    if (pathname.includes('/sms-settings')) return 'SMS Settings';
    if (pathname.includes('/master-settings')) return 'Master Settings';
    if (pathname === '/admin') return 'Dashboard';
    
    const parts = pathname.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1] || 'Dashboard';
    return lastPart.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <div className="bg-[#3b82f6] text-white flex flex-col pt-4 px-8 pb-8">
      <div className="flex items-center justify-between mb-8">
        <button className="p-1 hover:bg-white/10 rounded transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
            <Plus className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
            <Tag className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div>
        <h1 className="text-2xl font-semibold tracking-wide">{getTitle()}</h1>
      </div>
    </div>
  );
};

export default AdminHeader;

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Tag, 
  Package, 
  ListOrdered, 
  FileText, 
  User, 
  CreditCard, 
  BarChart2, 
  Settings,
  ChevronDown,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';

const menuItems = [
  { name: 'Dashboard', icon: Home, href: '/admin' },
  { name: 'Pos', icon: Tag, href: '/admin/pos' },
  { name: 'Orders', icon: Package, href: '/admin/orders' },
  { name: 'Order Status Screen', icon: ListOrdered, href: '/admin/order-status' },
  { name: 'Expense', icon: FileText, href: '/admin/expenses' },
  { name: 'Customers', icon: User, href: '/admin/customers' },
  { 
    name: 'Services', 
    icon: Tag, 
    href: '#', 
    hasDropdown: true,
    subItems: [
      { name: 'Service List', href: '/admin/services' },
      { name: 'Service Type', href: '/admin/service-types' },
      { name: 'Addons', href: '/admin/addons' },
    ]
  },
  { name: 'Payment Receipt', icon: CreditCard, href: '/admin/receipts' },
  { name: 'Reports', icon: BarChart2, href: '/admin/reports' },
  { 
    name: 'Tools', 
    icon: Settings, 
    href: '#', 
    hasDropdown: true,
    subItems: [
      { name: 'Financial Year', href: '/admin/settings/financial-year' },
      { name: 'Translations', href: '/admin/settings/translations' },
      { name: 'Mail Settings', href: '/admin/settings/mail-settings' },
      { name: 'Master Settings', href: '/admin/settings/master-settings' },
      { name: 'File Tools', href: '/admin/settings/file-tools' },
      { name: 'SMS Settings', href: '/admin/settings/sms-settings' },
      { name: 'Staff', href: '/admin/settings/staff' },
    ]
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const [openDropdown, setOpenDropdown] = useState<string | null>('Tools'); // Default open Tools for matching screenshot

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <aside className="w-72 bg-white border-r border-gray-100 h-screen sticky top-0 flex flex-col pt-8 pb-6 shadow-sm overflow-y-auto">
      <div className="flex items-center justify-center mb-8 px-6 pt-4">
        <Link href="/" className="relative w-32 h-32 block">
          <Image 
            src="/logo.png" 
            alt="CleaNova Logo" 
            fill
            className="object-contain"
            priority
          />
        </Link>
      </div>

      <nav className="flex-1 space-y-1.5 px-4">
        {menuItems.map((item) => {
          const isActiveSub = item.subItems?.some(sub => pathname.includes(sub.href));
          const isActive = pathname === item.href || isActiveSub;
          
          return (
            <div key={item.name}>
              {item.hasDropdown ? (
                <div
                  onClick={() => toggleDropdown(item.name)}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-200',
                    isActive ? 'bg-[#3b82f6] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium text-[15px]">{item.name}</span>
                  </div>
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", openDropdown === item.name ? "rotate-180" : "")} />
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200',
                    isActive ? 'bg-[#3b82f6] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-[15px]">{item.name}</span>
                </Link>
              )}

              {/* SubItems */}
              <AnimatePresence>
                {item.hasDropdown && openDropdown === item.name && item.subItems && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="py-2 pl-12 pr-4 space-y-1 flex flex-col">
                      {item.subItems.map((subItem) => {
                        const isSubActive = pathname === subItem.href;
                        return (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={cn(
                              'py-2 px-3 rounded-md text-[14px] transition-colors',
                              isSubActive 
                                ? 'text-black font-semibold' 
                                : 'text-gray-500 hover:text-gray-900'
                            )}
                          >
                            {subItem.name}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      <div className="px-4 mt-8">
        <button 
          onClick={logout}
          className="flex items-center gap-4 px-4 py-3 w-full text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-[15px]">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

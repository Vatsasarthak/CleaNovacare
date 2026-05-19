'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Shirt, History, User, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const MobileNav = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Services', href: '/#services', icon: Shirt },
    { name: 'Book', href: '/book', icon: PlusCircle, primary: true },
    { name: 'Track', href: '/track', icon: History },
    { name: 'Account', href: '/dashboard', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-6 pb-6 pt-2 bg-gradient-to-t from-white via-white to-transparent pointer-events-none">
      <div className="bg-white/80 backdrop-blur-2xl border border-foreground/5 shadow-[0_-8px_40px_rgba(0,0,0,0.08)] rounded-[32px] flex items-center justify-around p-2 pointer-events-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href.startsWith('/#') && pathname === '/');
          
          if (item.primary) {
            return (
              <Link key={item.name} href={item.href} className="relative -top-8">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl shadow-primary/40 border-4 border-white"
                >
                  <item.icon className="w-8 h-8" />
                </motion.div>
              </Link>
            );
          }

          return (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex flex-col items-center gap-1 p-3 rounded-2xl transition-all"
            >
              <item.icon className={cn(
                "w-6 h-6 transition-colors duration-300",
                isActive ? "text-primary" : "text-foreground/30"
              )} />
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest transition-colors duration-300",
                isActive ? "text-primary" : "text-foreground/20"
              )}>
                {item.name}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="mobileNavActive"
                  className="w-1 h-1 bg-primary rounded-full mt-1" 
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;

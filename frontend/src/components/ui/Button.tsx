'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    
    const variants = {
      primary: 'bg-primary text-white hover:shadow-[0_20px_50px_rgba(0,86,179,0.3)] shadow-lg shadow-primary/20 border border-white/10',
      secondary: 'bg-secondary text-white hover:shadow-secondary/30 shadow-lg shadow-secondary/20',
      outline: 'border-2 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary',
      ghost: 'text-primary hover:bg-primary/5',
      glass: 'glass text-primary hover:bg-white/40 border-white/50'
    };
    
    const sizes = {
      sm: 'px-5 py-2.5 text-xs font-bold uppercase tracking-widest',
      md: 'px-8 py-4 text-sm font-black uppercase tracking-widest',
      lg: 'px-10 py-5 text-lg font-black tracking-tight',
      icon: 'p-3'
    };

    return (
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="relative group w-fit"
      >
        <button
          className={cn(
            'inline-flex items-center justify-center rounded-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden',
            variants[variant],
            sizes[size],
            className
          )}
          ref={ref}
          {...props}
        >
          {/* Shine Effect */}
          <div className="absolute inset-0 w-full h-full -z-10 group-hover:bg-white/10 transition-colors" />
          <motion.div 
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
          />
          {props.children}
        </button>
      </motion.div>
    );
  }
);
Button.displayName = 'Button';

export { Button };

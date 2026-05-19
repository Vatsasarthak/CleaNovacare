'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[200px] w-full bg-white/50 backdrop-blur-sm rounded-3xl">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Spinning Gradient Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-accent opacity-80 shadow-lg shadow-primary/20"
        />
        
        {/* Inner Pulsing Circle */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-2 rounded-full bg-primary/5"
        />

        {/* Hanger Icon (SVG representation mimicking the logo) */}
        <div className="relative z-10 text-primary">
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 4a2 2 0 1 0-2 2v2M4.46 16.5l7.54-6.32 7.54 6.32" />
            <path d="M4.5 16.5L4 20h16l-.5-3.5" />
          </svg>
          
          {/* Sparkles */}
          <motion.div
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute -top-2 -right-2 text-accent"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z" />
            </svg>
          </motion.div>
          <motion.div
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="absolute top-2 -right-4 text-primary w-2 h-2"
          >
            <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z" />
            </svg>
          </motion.div>
        </div>
      </div>
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="mt-6 font-black text-sm text-secondary uppercase tracking-widest"
      >
        CleaNova System...
      </motion.p>
    </div>
  );
};

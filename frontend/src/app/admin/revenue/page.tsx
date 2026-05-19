'use client';
import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { BarChart3 } from 'lucide-react';

export default function RevenuePage() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6">
        <BarChart3 className="w-12 h-12 text-primary" />
      </div>
      <h1 className="text-3xl font-black mb-4">Revenue Analytics</h1>
      <p className="text-foreground/50 max-w-md">Detailed financial reports and revenue breakdown will be available here soon.</p>
    </div>
  );
}

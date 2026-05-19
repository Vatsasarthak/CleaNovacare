'use client';
import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6">
        <Settings className="w-12 h-12 text-primary" />
      </div>
      <h1 className="text-3xl font-black mb-4">System Settings</h1>
      <p className="text-foreground/50 max-w-md">Configure your laundry business settings, pricing, and operating hours here.</p>
    </div>
  );
}

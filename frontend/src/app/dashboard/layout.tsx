'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import ClientSidebar from '@/components/dashboard/ClientSidebar';
import ClientHeader from '@/components/dashboard/ClientHeader';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Give zustand-persist a tick to rehydrate from localStorage
    const timer = setTimeout(() => {
      if (!isAuthenticated || !user) {
        router.replace('/login');
      } else if (user.role !== 'customer') {
        // Admins should not be in client dashboard
        if (user.role === 'admin') router.replace('/admin');
        else if (user.role === 'rider') router.replace('/rider');
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f6f9]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-sm font-bold text-gray-400">Verifying session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-[#f4f6f9] min-h-screen font-sans overflow-hidden text-gray-800">
      <ClientSidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <ClientHeader />
        <div className="flex-1 overflow-y-auto p-5 lg:p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}

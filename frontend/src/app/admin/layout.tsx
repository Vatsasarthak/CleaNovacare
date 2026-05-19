import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-[#f8f9fa] min-h-screen font-sans overflow-hidden text-gray-800">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <AdminHeader />
        <div className="flex-1 overflow-y-auto p-8 bg-[#f8f9fa]">
          {children}
        </div>
      </main>
    </div>
  );
}

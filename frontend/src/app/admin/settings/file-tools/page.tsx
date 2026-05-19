'use client';
import React from 'react';
import { Files } from 'lucide-react';

export default function FileToolsPage() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6">
        <Files className="w-12 h-12 text-primary" />
      </div>
      <h1 className="text-3xl font-black mb-4">File Tools</h1>
      <p className="text-foreground/50 max-w-md">The file management and bulk export tools are currently under development.</p>
    </div>
  );
}

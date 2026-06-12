import React from 'react';
import { Search, ShieldAlert, ChevronRight } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-8 sticky top-0 z-10 w-full">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative flex items-center w-full h-10 rounded-lg bg-surface-highlight border border-border px-3 overflow-hidden">
          <Search className="w-4 h-4 text-text-secondary mr-2" />
          <input 
            type="text" 
            placeholder="Search companies, roles, topics..." 
            className="w-full h-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6 ml-4">
        
        {/* Verify Banner */}
        <div className="hidden md:flex items-center gap-3 bg-surface-highlight border border-border px-4 py-2 rounded-lg cursor-pointer hover:border-primary transition-colors">
          <div className="bg-primary/20 p-1.5 rounded text-primary">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-text-primary text-sm font-medium leading-none mb-1">Verify with TIET Email</span>
            <span className="text-text-secondary text-xs leading-none">Access exclusive discussions & PYQs</span>
          </div>
          <ChevronRight className="w-4 h-4 text-text-secondary ml-2" />
        </div>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-lg cursor-pointer hover:bg-primary-hover transition-colors">
          A
        </div>
      </div>
    </header>
  );
}

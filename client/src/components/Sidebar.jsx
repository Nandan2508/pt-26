import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  Calculator, 
  Calendar, 
  MessageSquare, 
  BookOpen, 
  CheckCircle 
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Placement Updates', path: '/placement-updates', icon: Briefcase },
  { name: 'Eligibility Simulator', path: '/eligibility-simulator', icon: Calculator },
  { name: 'Placement Calendar', path: '/placement-calendar', icon: Calendar },
  { name: 'Discussion Hub', path: '/discussion', icon: MessageSquare },
  { name: 'PYQ Repository', path: '/resources', icon: BookOpen },
];

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-background border-r border-border flex flex-col fixed left-0 top-0">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-danger flex items-center justify-center font-bold text-white text-lg">
            ti
          </div>
          <div className="flex flex-col">
            <span className="text-text-primary font-semibold text-sm leading-tight">Thapar Placement Tracker</span>
            <span className="text-text-secondary text-xs">(Unofficial)</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary text-white" 
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-highlight"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Verify Card */}
      <div className="p-4 m-4 rounded-xl border border-border bg-surface-highlight flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 p-1.5 rounded-md">
            <CheckCircle className="w-4 h-4 text-primary" />
          </div>
          <span className="text-text-primary font-medium text-sm">Thaparian? Verify Now</span>
        </div>
        <p className="text-text-secondary text-xs">
          Only TIET students can access discussions & post content.
        </p>
        <button className="w-full py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors">
          Verify with TIET Email
        </button>
      </div>
    </div>
  );
}

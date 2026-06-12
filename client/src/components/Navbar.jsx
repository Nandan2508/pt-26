import React from 'react';
import { Search, ShieldAlert, ChevronRight, LogOut, User as UserIcon, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar({ toggleSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/dashboard');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 w-full">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-2 -ml-2 text-text-secondary hover:text-text-primary hover:bg-surface-highlight rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Search Bar */}
        <div className="hidden sm:flex relative items-center w-full h-10 rounded-lg bg-surface-highlight border border-border px-3 overflow-hidden">
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
        
        {/*!user && (
          <div className="hidden md:flex items-center gap-3 bg-surface-highlight border border-border px-4 py-2 rounded-lg hover:border-primary transition-colors">
            <div className="bg-primary/20 p-1.5 rounded text-primary">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-text-primary text-sm font-medium leading-none mb-1">Verify with TIET Email</span>
              <span className="text-text-secondary text-xs leading-none">Access exclusive discussions & PYQs</span>
            </div>
            <ChevronRight className="w-4 h-4 text-text-secondary ml-2" />
          </div>
        )*/}

        {user ? (
          <div className="flex items-center gap-4">
            {user.role === 'admin' && (
              <Link to="/admin" className="text-sm font-medium text-primary hover:underline">
                Admin Panel
              </Link>
            )}
            <div className="flex items-center gap-3 bg-surface-highlight border border-border pl-2 pr-4 py-1.5 rounded-full">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm">
                {getInitials(user.name)}
              </div>
              <span className="text-sm font-medium text-white max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
              <button 
                onClick={handleLogout}
                className="ml-2 text-text-secondary hover:text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {/* 
            <Link to="/login" className="text-sm font-medium text-text-primary hover:text-primary transition-colors">
              Log in
            </Link>
            <Link to="/register" className="text-sm font-medium bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors">
              Sign up
            </Link>
            */}
          </div>
        )}
      </div>
    </header>
  );
}

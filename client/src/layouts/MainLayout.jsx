import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-background text-text-primary font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden relative">
        <Navbar />
        <main className="flex-1 p-8 overflow-y-auto min-h-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

import React from 'react';
import { 
  Home,
  RefreshCcw, 
  Activity, 
  Users, 
  Settings,
  Search,
  ScanLine
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active }) => (
  <div className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all ${
    active ? 'bg-primary text-black' : 'text-text-secondary hover:bg-surface'
  }`}>
    {icon}
    <span className="font-medium">{label}</span>
  </div>
);

import { ConnectButton } from './components/ConnectButton';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-background tapestry-bg">
      {/* Sidebar - Desktop Only for now */}
      <aside className="w-64 border-r border-border p-6 flex-col gap-8 hidden md:flex">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <ScanLine className="text-black" size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight">Beam</span>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <SidebarItem icon={<Home size={20} />} label="Home" active />
          <SidebarItem icon={<Activity size={20} />} label="Activity" />
          <SidebarItem icon={<Users size={20} />} label="Recipients" />
          <SidebarItem icon={<RefreshCcw size={20} />} label="Swap" />
        </nav>

        <div className="flex flex-col gap-2 mt-auto">
          <SidebarItem icon={<Settings size={20} />} label="Settings" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Top bar */}
        <header className="h-20 px-8 flex items-center justify-between border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-20">
          <div className="relative w-96 hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input 
              type="text" 
              placeholder="Search transactions or names..."
              className="w-full bg-surface/30 border border-border rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all focus:bg-surface/50"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-sm font-bold text-text-secondary hover:text-white transition-colors">
              Help
            </button>
            <ConnectButton />
          </div>
        </header>

        <div className="px-4 py-6 sm:px-8 sm:py-8 max-w-5xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Nav - Visible on small screens */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-surface/90 backdrop-blur-xl border-t border-border flex items-center justify-around px-4 z-50">
        <Home className="text-primary" size={24} />
        <Activity className="text-text-secondary" size={24} />
        <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center -translate-y-4 shadow-2xl shadow-primary/20">
          <ScanLine className="text-black" size={28} />
        </div>
        <Users className="text-text-secondary" size={24} />
        <Settings className="text-text-secondary" size={24} />
      </nav>
    </div>
  );
};

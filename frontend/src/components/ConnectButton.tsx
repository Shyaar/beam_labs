import React from 'react';
import { Wallet, LogOut, ChevronDown } from 'lucide-react';
import { useUser } from '../context/UserContext';

export const ConnectButton: React.FC = () => {
  const { isConnected, setIsConnected, clearProfile } = useUser();

  // Mock data for the simulator
  const mockAddress = "beam...x82";

  if (!isConnected) {
    return (
      <button 
        onClick={() => setIsConnected(true)}
        className="btn-primary flex items-center gap-2"
      >
        <Wallet size={18} />
        Connect Wallet
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 bg-surface border border-border rounded-full p-1 pl-4 pr-1 group">
      <div className="flex flex-col text-left mr-2 hidden sm:flex">
        <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest leading-none">Connected</span>
        <span className="text-sm font-bold leading-tight">{mockAddress}</span>
      </div>
      
      <div className="flex items-center gap-1">
        <button 
          className="w-10 h-10 rounded-full bg-surface-hover border border-border flex items-center justify-center hover:bg-border transition-colors transition-transform active:scale-95"
          title="Wallet Settings"
        >
          <ChevronDown size={18} />
        </button>
        <button 
          className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center hover:bg-red-500/20 transition-colors transition-transform active:scale-95"
          onClick={() => clearProfile()}
          title="Disconnect Simulator"
        >
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
};

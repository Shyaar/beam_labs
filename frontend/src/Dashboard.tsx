import React, { useState } from 'react';
import { 
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  ScanLine,
  Plus,
  ArrowUp,
  ArrowDown,
  Banknote,
  ArrowUpRight,
  ArrowDownLeft,
  LayoutGrid,
  Image as ImageIcon,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from './context/UserContext';
import { NFTCard } from './components/dashboard/NFTCard';

interface AccountCardProps {
  name: string;
  balance: string;
  symbol: string;
  usdValue: string;
  icon: React.ReactNode;
}

const AccountCard: React.FC<AccountCardProps> = ({ name, balance, symbol, usdValue, icon }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    className="wise-card flex flex-col gap-6 w-full lg:min-w-[280px]"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-border">
          {icon}
        </div>
        <span className="font-semibold">{name}</span>
      </div>
      <MoreHorizontal className="text-text-secondary cursor-pointer" size={20} />
    </div>
    <div className="flex flex-col gap-1">
      <div className="text-3xl font-bold tracking-tight">
        {balance} <span className="text-xl font-medium text-text-secondary">{symbol}</span>
      </div>
      <div className="text-sm text-text-secondary">{usdValue} USD</div>
    </div>
  </motion.div>
);

interface ActivityItemProps {
  name: string;
  date: string;
  amount: string;
  type: 'send' | 'receive';
  status: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ name, date, amount, type, status }) => (
  <div className="flex items-center justify-between py-4 hover:bg-surface/30 px-4 rounded-2xl transition-colors cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
        type === 'send' ? 'bg-orange-500/10 text-orange-500' : 'bg-green-500/10 text-green-500'
      }`}>
        {type === 'send' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
      </div>
      <div>
        <div className="font-semibold text-white group-hover:text-primary transition-colors">{name}</div>
        <div className="text-xs text-text-secondary">{date} • {status}</div>
      </div>
    </div>
    <div className="text-right">
      <div className={`font-bold ${type === 'send' ? 'text-white' : 'text-primary'}`}>
        {type === 'send' ? '-' : '+'}{amount}
      </div>
      <div className="text-xs text-text-secondary">SOL</div>
    </div>
  </div>
);

type TabType = 'tokens' | 'nfts' | 'recent';

interface DashboardProps {
  onBeam?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onBeam }) => {
  const { profile } = useUser();
  const [activeTab, setActiveTab] = useState<TabType>('tokens');
  const firstName = profile?.username.split(' ')[0] || 'User';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-8 pb-32 md:pb-8"
    >
      {/* Welcome Header */}
      <div className="flex flex-col gap-2">
        <motion.h1 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-4xl font-bold tracking-tight"
        >
          Good morning, {firstName}.
        </motion.h1>
        <p className="text-text-secondary">Your Solana balances are looking healthy today.</p>
      </div>

      {/* Core Solflare-style Balance Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden bg-surface border border-border rounded-[2.5rem] p-8 shadow-2xl"
      >
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center text-center gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-text-secondary font-bold uppercase tracking-widest text-[10px]">Total Balance</span>
            <h2 className="text-5xl font-extrabold tracking-tight text-white">$7,495.12</h2>
            <div className="flex items-center justify-center gap-2 text-primary font-bold text-sm">
              <TrendingUp size={16} />
              +2.45% today
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 w-full max-w-sm">
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                <ArrowDown size={24} />
              </div>
              <span className="text-xs font-bold text-text-secondary group-hover:text-white transition-colors">Deposit</span>
            </div>
            
            <div 
              onClick={onBeam}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-xl shadow-primary/20 hover:scale-110 active:scale-95 transition-all outline outline-4 outline-primary/20">
                <ScanLine className="text-black" size={24} strokeWidth={3} />
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-tighter">Beam</span>
            </div>

            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-surface-hover border border-border flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <Banknote size={24} />
              </div>
              <span className="text-xs font-bold text-text-secondary group-hover:text-white transition-colors">Withdraw</span>
            </div>

            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-surface-hover border border-border flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowUp size={24} />
              </div>
              <span className="text-xs font-bold text-text-secondary group-hover:text-white transition-colors">Send</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Solflare-style Full-Width Tab Control */}
      <div className="border-b border-border w-full">
        <div className="flex items-center w-full">
          {[
            { id: 'tokens', label: 'Tokens', icon: <LayoutGrid size={16} /> },
            { id: 'nfts', label: 'NFTs', icon: <ImageIcon size={16} /> },
            { id: 'recent', label: 'Recent', icon: <History size={16} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`relative flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === tab.id ? 'text-primary' : 'text-text-secondary hover:text-white'
              }`}
            >
              <span className="relative z-10">{tab.icon}</span>
              <span className="relative z-10">{tab.label}</span>
              
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_-4px_10px_rgba(159,232,112,0.3)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tabbed Content Area */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'tokens' && (
            <motion.div
              key="tokens"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <AccountCard 
                name="Solana" 
                balance="42.68" 
                symbol="SOL" 
                usdValue="6,245.12" 
                icon={<div className="w-6 h-6 bg-solana rounded-full" />} 
              />
              <AccountCard 
                name="USD Coin" 
                balance="1,250.00" 
                symbol="USDC" 
                usdValue="1,250.00" 
                icon={<div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">S</div>} 
              />
              <div className="wise-card border-dashed border-2 bg-transparent flex flex-col items-center justify-center gap-3 text-text-secondary hover:text-white hover:border-white transition-colors cursor-pointer min-h-[160px]">
                <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center">
                  <Plus size={20} />
                </div>
                <span className="font-semibold">Add currency</span>
              </div>
            </motion.div>
          )}

          {activeTab === 'nfts' && (
            <motion.div
              key="nfts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <NFTCard name="Beam Pass #001" collection="Beam Exclusives" image="bg-gradient-to-br from-primary to-green-900" floorPrice="5.5" />
              <NFTCard name="Solar Flare" collection="Hyperion" image="bg-gradient-to-br from-orange-400 to-red-600" floorPrice="12.2" />
              <NFTCard name="Cyber Monk" collection="Neon Nights" image="bg-gradient-to-br from-blue-500 to-purple-600" floorPrice="4.8" />
              <NFTCard name="Glimmer #42" collection="Luminous" image="bg-gradient-to-br from-teal-400 to-blue-800" floorPrice="8.9" />
            </motion.div>
          )}

          {activeTab === 'recent' && (
            <motion.div
              key="recent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="wise-card p-2 flex flex-col"
            >
              <ActivityItem name="Abhishek (Superteam)" date="21 Apr" amount="2.50" type="receive" status="Confirmed" />
              <ActivityItem name="Conference Merchant" date="20 Apr" amount="0.15" type="send" status="Confirmed" />
              <ActivityItem name="Solana Name Service" date="19 Apr" amount="0.05" type="send" status="Confirmed" />
              <ActivityItem name="Raydium Swap" date="18 Apr" amount="12.00" type="send" status="Confirmed" />
              <ActivityItem name="Jupiter Swap" date="17 Apr" amount="4.20" type="receive" status="Confirmed" />
              <div className="mt-4 pt-4 border-t border-border px-4 pb-2 text-center text-sm font-semibold text-primary cursor-pointer hover:underline">
                View in Explorer
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

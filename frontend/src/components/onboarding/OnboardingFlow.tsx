import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Wallet, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  ScanLine
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

const AVATARS = [
  { id: '1', color: 'bg-orange-500', icon: '🦊' },
  { id: '2', color: 'bg-green-500', icon: '🧠' },
  { id: '3', color: 'bg-blue-500', icon: '💎' },
  { id: '4', color: 'bg-purple-500', icon: '👾' },
  { id: '5', color: 'bg-pink-500', icon: '🍭' },
  { id: '6', color: 'bg-yellow-500', icon: '⚡' },
];

const WALLETS = [
  { id: 'solflare', name: 'Solflare', color: 'bg-white text-black' },
  { id: 'phantom', name: 'Phantom', color: 'bg-[#AB9FF2] text-white' },
  { id: 'ledger', name: 'Ledger', color: 'bg-black text-white' },
];

export const OnboardingFlow: React.FC = () => {
  const { isConnected, setIsConnected, setProfile } = useUser();
  
  const [step, setStep] = useState(isConnected ? 2 : 1);
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);

  const handleConnect = (walletId: string) => {
    // Simulator Mode Trigger
    console.log(`Connecting with ${walletId}...`);
    setIsConnected(true);
    setStep(2);
  };

  const handleFinish = () => {
    if (!username.trim()) return;
    setProfile({
      username: username.trim(),
      avatar: selectedAvatar.id
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center p-6 tapestry-bg">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex flex-col items-center text-center gap-8"
            >
              <div className="w-20 h-20 bg-primary rounded-[2rem] flex items-center justify-center shadow-2xl">
                <ScanLine className="text-black" size={40} />
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="text-3xl font-extrabold tracking-tight">Choice of wallet</h2>
                <p className="text-text-secondary font-medium">Select a wallet to continue your Beam experience.</p>
              </div>
              
              <div className="flex flex-col gap-3 w-full">
                {WALLETS.map((wallet) => (
                  <button 
                    key={wallet.id}
                    onClick={() => handleConnect(wallet.id)}
                    className={`w-full py-5 text-lg font-bold flex items-center justify-between px-8 rounded-3xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl ${wallet.color}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 flex items-center justify-center">
                        <Wallet size={24} />
                      </div>
                      {wallet.name}
                    </div>
                    <ChevronRight size={20} />
                  </button>
                ))}
              </div>
              
              <p className="text-xs text-text-secondary max-w-[240px]">
                In Simulator Mode, selecting any wallet will instantly advance you to the identity setup.
              </p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-8"
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-extrabold tracking-tight">Create your ID</h2>
                <p className="text-text-secondary font-medium">This is how people will see you when Beaming.</p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-widest px-1">Your Username</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. solana_king"
                      className="w-full bg-surface border border-border rounded-2xl py-4 pl-12 pr-4 text-lg font-semibold focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-widest px-1">Choose an Avatar</label>
                  <div className="grid grid-cols-3 gap-4">
                    {AVATARS.map((avatar) => (
                      <button
                        key={avatar.id}
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`aspect-square rounded-3xl flex items-center justify-center text-3xl transition-all relative ${
                          selectedAvatar.id === avatar.id 
                            ? 'ring-4 ring-primary ring-offset-4 ring-offset-background scale-95 shadow-2xl' 
                            : 'hover:scale-105 bg-surface border border-border'
                        } ${avatar.color}`}
                      >
                        {avatar.icon}
                        {selectedAvatar.id === avatar.id && (
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-black border-4 border-background">
                            <Check size={16} strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button 
                  onClick={() => setStep(1)}
                  className="w-14 h-14 rounded-2xl border border-border flex items-center justify-center text-text-secondary hover:text-white hover:bg-surface transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  disabled={!username.trim()}
                  onClick={handleFinish}
                  className="flex-1 btn-primary py-4 text-lg flex items-center justify-center gap-2 shadow-xl shadow-primary/20 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                >
                  Enter the Dapp
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

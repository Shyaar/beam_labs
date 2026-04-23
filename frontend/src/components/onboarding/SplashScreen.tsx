import React from 'react';
import { motion } from 'framer-motion';
import { ScanLine } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center p-8 overflow-hidden"
    >
      {/* Decorative Circles */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 2, opacity: 0.1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        className="absolute w-64 h-64 border-2 border-black rounded-full"
      />
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.5, opacity: 0.05 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
        className="absolute w-96 h-96 border border-black rounded-full"
      />

      {/* Main Logo */}
      <div className="relative group">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
          className="w-24 h-24 bg-black rounded-[2rem] flex items-center justify-center shadow-2xl relative z-10"
        >
          <ScanLine className="text-primary" size={48} strokeWidth={2.5} />
        </motion.div>
        
        {/* Glow behind logo */}
        <div className="absolute inset-x-0 bottom-0 top-0 bg-black/20 blur-2xl rounded-full scale-150 animate-pulse" />
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex flex-col items-center"
      >
        <h1 className="text-4xl font-extrabold text-black tracking-tighter">Beam</h1>
        <p className="text-black/60 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">Solana Proximity</p>
      </motion.div>

      {/* Loading Bar */}
      <div className="absolute bottom-16 w-32 h-1 bg-black/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 2.5, ease: "linear" }}
          className="w-full h-full bg-black"
        />
      </div>
    </motion.div>
  );
};
